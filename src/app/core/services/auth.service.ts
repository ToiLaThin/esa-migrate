import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthStatus } from '../types/auth-status.enum';
import { environment as env } from '../../../environments/environment.development';
import { UserManager, User, UserManagerSettings, WebStorageStateStore } from 'oidc-client';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Store } from '@ngrx/store';
import { authActions } from '../../auth/state/auth.actions';
import { selectorCurrentUser } from '../../auth/state/auth.selectors';
import { IAuthState } from '../../auth/state/authState.interface';
import { authFeatureKey } from '../../auth/state/auth.reducers';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _userManager: UserManager;
    private get idpSettings(): UserManagerSettings {
        return {
            authority: `${env.BASEURL}/Auth/IdentityServer/`,
            metadataUrl: `${env.BASEURL}/Auth/IdentityServer/.well-known/openid-configuration`,
            client_id: env.CLIENTID,
            redirect_uri: `${env.CLIENTROOT}/auth/signin-oidc`,
            post_logout_redirect_uri: `${env.CLIENTROOT}/auth/signout-oidc`,
            scope: 'openid profile MyApi.Scope User.Info',
            response_type: 'code',
            userStore: new WebStorageStateStore({ store: localStorage })
        };
    }

    constructor(private _notificationService: NzNotificationService, private _store: Store) {
        this._userManager = new UserManager(this.idpSettings);
        // this.checkLoginStatus(); if we f5, the store does not have currUser, so it gurantee we always logout, so we must use bootstrapAuth, then this checkLoginStatus will be called only in checkSession each interval
        //this._store.dispatch(authActions.checkSession()); if use this then even if we logged in, it will only display after 5 seconds
    }

    //this method is used when we refresh the page, no user in store
    //so if we have user in local storage, we must get it and dispatch loginSuccessfull
    bootstrapAuth() {
        this._userManager.getUser().then((user: User | null) => {
            if (!user) {
                this._notificationService.info('user from state is null or not logged in', '');
                return;
            }
            if (user.expired) {
                this._notificationService.info('Your session has expired. Please login again.', '');
                this._store.dispatch(authActions.logoutAttempted());
            }
            this._store.dispatch(authActions.loginSuccessfull({ returnedUser: user }));
        });
    }

    checkLoginStatus() {
        let currUser: User | null;
        const userSubscription = this._store
            .select((state) => selectorCurrentUser(state as { [authFeatureKey]: IAuthState }))
            .subscribe((user: User | null) => {
                currUser = user;
            });
        userSubscription.unsubscribe(); //since checkLoginStatus is called many times

        //promise
        this._userManager.getUser().then((user: User | null) => {
            if (!user) {
                console.log('user from state is null or not logged in'); //could create no sesion action and dispatch
                return;
            }
            if (currUser === user) {
                this._store.dispatch(authActions.sessionValid());
                console.log('user is not changed');
                return;
            }
            if (!currUser) {
                this._store.dispatch(authActions.logoutAttempted());
                console.log('user is null');
                return;
            }
            if (currUser.expired) {
                this._notificationService.info('Your session has expired. Please login again.', '');
                this._store.dispatch(authActions.logoutAttempted());
                return;
            }
            //user is changed and not null and not expired (but the expired in field is different so we must fix it)
            console.log(user);
            console.log(currUser);
            console.log('user is changed and not null and not expired');
            this._store.dispatch(authActions.userUpdated({ updatedUser: currUser }));
        });
    }

    login() {
        return this._userManager.signinRedirect();
    }

    finishLogin(): Promise<User> {
        return this._userManager.signinRedirectCallback().then((user: User) => {
            this._notificationService.success('Login successfully', `This is the user: ${user}`);
            this._store.dispatch(authActions.loginSuccessfull({ returnedUser: user }));
            return user!;
        });
    }

    logout() {
        return this._userManager.signoutRedirect();
    }

    finishLogout() {
        return this._userManager.signoutRedirectCallback().then(() => {
            this._userManager.removeUser();
            //necessary to remove the user (oidc.sub) from the local storage to avoid the user to be logged in again when checking session)
            this._notificationService.success('Logout successfully', '');
            this._store.dispatch(authActions.logoutSuccessfull());
        });
    }
}
