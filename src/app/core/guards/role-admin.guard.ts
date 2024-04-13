import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectorUserRole } from "../../auth/state/auth.selectors";
import { authFeatureKey } from "../../auth/state/auth.reducers";
import { IAuthState } from "../../auth/state/authState.interface";

@Injectable({
    providedIn: 'root'
})
export class RoleAdminGuard implements CanActivate {
    constructor(private _route: ActivatedRouteSnapshot, private _store: Store) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        let role!: string;
        let tempSub = this._store.select(state => selectorUserRole(state as {[authFeatureKey]: IAuthState})).subscribe((userRole) => {
            role = userRole;
        });
        tempSub.unsubscribe();
        if (role === 'admin') {
            return true;
        }
        return false;
    }

}