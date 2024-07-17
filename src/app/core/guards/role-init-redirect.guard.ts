import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { authFeatureKey } from "../../auth/state/auth.reducers";
import { selectorAuthStatus, selectorUserName, selectorUserRole } from "../../auth/state/auth.selectors";
import { IAuthState } from "../../auth/state/authState.interface";
import { AuthStatus } from "../types/auth-status.enum";

@Injectable({
    providedIn: 'root'
})
//this to redirect admin to dashboard management, not the shopping page
export class RoleInitRedirectGuard implements CanActivate {
    constructor(private _router: Router, private _store: Store) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        // let roles!: string[];
        // let authStatus!: AuthStatus;
        // let tempSub = this._store.select(state => selectorAuthStatus(state as {[authFeatureKey]: IAuthState})).subscribe((status) => {
        //     authStatus = status;
        // });
        // tempSub.unsubscribe();
        // tempSub = this._store.select(state => selectorUserRole(state as {[authFeatureKey]: IAuthState})).subscribe((userRoles) => {
        //     roles = userRoles;
        // });
        // tempSub.unsubscribe();
        // if (authStatus === AuthStatus.Authenticated && roles.includes('admin')) {
        //     this._router.navigateByUrl('/management', { replaceUrl: true });
        //     return false;
        // }
        let userName!: string | undefined;
        let tempSub = this._store.select(state => selectorUserName(state as {[authFeatureKey]: IAuthState})).subscribe((uName) => {
            userName = uName;
            console.log(userName);
        });
        tempSub.unsubscribe();
        if (userName === 'thinh') {
            this._router.navigateByUrl('/management', { replaceUrl: true });
            return false;
        }
        return true;
    }

}