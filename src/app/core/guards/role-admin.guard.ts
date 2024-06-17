import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectorUserRole } from "../../auth/state/auth.selectors";
import { authFeatureKey } from "../../auth/state/auth.reducers";
import { IAuthState } from "../../auth/state/authState.interface";

@Injectable({
    providedIn: 'root'
})
export class RoleAdminGuard implements CanActivate {
    // constructor(private _route: ActivatedRouteSnapshot, private _store: Store) { //null injector for ActivatedRouteSnapshot
    constructor(private _router: Router, private _store: Store) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        let roles!: string[];
        let tempSub = this._store.select(state => selectorUserRole(state as {[authFeatureKey]: IAuthState})).subscribe((userRoles) => {
            roles = userRoles;
        });
        tempSub.unsubscribe();
        if (roles.includes('admin')) {
            return true;
        }
        //roles is a list of string
        this._router.navigateByUrl('/auth/unauthorized', { replaceUrl: true });
        return false;
    }

}