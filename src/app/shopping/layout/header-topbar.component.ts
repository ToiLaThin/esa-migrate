import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStatus } from '../../core/types/auth-status.enum';
import { AuthService } from '../../core/services/auth.service';
import { Store } from '@ngrx/store';
import {
    selectorAuthStatus,
    selectorUserName,
    selectorUserRole
} from '../../auth/state/auth.selectors';
import { authFeatureKey } from '../../auth/state/auth.reducers';
import { IAuthState } from '../../auth/state/authState.interface';
import { authActions } from '../../auth/state/auth.actions';
import { selectorItemsInCartCount } from '../state/cart/cart.selectors';
import { cartFeatureKey } from '../state/cart/cart.reducers';
import { ICartState } from '../state/cart/cartState.interface';
import { IOrderAggregateCart } from '../../core/models/order.interface';
import { selectorTrackingOrder } from '../state/order/order.selectors';
import { IOrderState } from '../state/order/orderState.interface';
import { orderFeatureKey } from '../state/order/order.reducers';
import { orderActions } from '../state/order/order.actions';

@Component({
    selector: 'esa-shopping-header-topbar',
    templateUrl: './header-topbar.component.html'
})
export class HeaderTopbarComponent implements OnInit {
    userName$!: Observable<string>;
    userRole$!: Observable<string>;
    authStatus$!: Observable<AuthStatus>;
    itemsInCartCount$!: Observable<number>;

    trackingOrder$!: Observable<IOrderAggregateCart | null>;
    get AuthStatus() {
        return AuthStatus;
    } //for template to use enum
    constructor(private _store: Store) {}

    ngOnInit(): void {
        this.userName$ = this._store.select((state) =>
            selectorUserName(state as { [authFeatureKey]: IAuthState })
        );
        this.userRole$ = this._store.select((state) =>
            selectorUserRole(state as { [authFeatureKey]: IAuthState })
        );
        this.authStatus$ = this._store.select((state) =>
            selectorAuthStatus(state as { [authFeatureKey]: IAuthState })
        );
        this.itemsInCartCount$ = this._store.select((state) =>
            selectorItemsInCartCount(state as { [cartFeatureKey]: ICartState })
        );
        this.trackingOrder$ = this._store.select((state) =>
            selectorTrackingOrder(state as { [orderFeatureKey]: IOrderState })
        );
    }

    login() {
        this._store.dispatch(authActions.loginAttempted());
    }

    logout() {
        this._store.dispatch(authActions.logoutAttempted());
    }

    continueOrderingProcess() {
        this._store.dispatch(orderActions.continueCurrentTrackingOrderProcess());
    }
}
