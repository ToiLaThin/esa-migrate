import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    GuardResult,
    MaybeAsync,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { authFeatureKey } from '../../auth/state/auth.reducers';
import { selectorAuthStatus } from '../../auth/state/auth.selectors';
import { IAuthState } from '../../auth/state/authState.interface';
import { AuthStatus } from '../types/auth-status.enum';

@Injectable({
    providedIn: 'root'
})
export class AuthenticatedRequiredGuard implements CanActivate {
    constructor(private _router: Router, private _store: Store) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): MaybeAsync<GuardResult> {
        let authStatus!: AuthStatus;
        let tempSub = this._store
            .select((state) => selectorAuthStatus(state as { [authFeatureKey]: IAuthState }))
            .subscribe((currentAuthStatus) => {
                authStatus = currentAuthStatus;
            });
        tempSub.unsubscribe();
        if (authStatus !== AuthStatus.Authenticated) {
            this._router.navigateByUrl('/auth/unauthorized', { replaceUrl: true });
        }
        return false;
    }
}
