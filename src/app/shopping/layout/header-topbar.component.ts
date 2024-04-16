import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, take, takeUntil, tap } from 'rxjs';
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
import { ColorSvgNames } from '../../share-components/svg-definitions/color-svg-names.enum';
import { Router } from '@angular/router';
import { currencyDatas } from '../../core/ui-models/currency-data';
import { Currency } from '../../core/types/currency.enum';
import { selectorCurrencySelected } from '../../management/state/management/management.selectors';
import { managementFeatureKey } from '../../management/state/management/management.reducers';
import { IManagementState } from '../../management/state/management/managementState.interface';
import { managementActions } from '../../management/state/management/management.actions';

@Component({
    selector: 'esa-shopping-header-topbar',
    templateUrl: './header-topbar.component.html'
})
export class HeaderTopbarComponent implements OnInit, OnDestroy {
    userName$!: Observable<string>;
    userRole$!: Observable<string>;
    authStatus$!: Observable<AuthStatus>;
    itemsInCartCount$!: Observable<number>;

    trackingOrder$!: Observable<IOrderAggregateCart | null>;
    currencyDatas = currencyDatas;

    destroy$: Subject<void> = new Subject<void>(); //for unsubscribing
    selectedCurrency!: Currency;
    get AuthStatus() {
        return AuthStatus;
    } //for template to use enum

    get ColorSvgNames() {
        return ColorSvgNames;
    }
    constructor(private _store: Store, private _router: Router) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

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
        this._store
            .select((state) =>
                selectorCurrencySelected(state as { [managementFeatureKey]: IManagementState })
            )
            .pipe(
                tap((currency) => (this.selectedCurrency = currency)),
                takeUntil(this.destroy$)
            )
            .subscribe();
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

    navigateToOrderList() {
        console.log('navigateToOrderList');
        this._router.navigate(['/shopping/order-list']);
    }

    changeCurrency(clickedCurrency: Currency) {
        console.log('currenCurrency', this.selectedCurrency);
        console.log('changeCurrency', clickedCurrency);
        if (this.selectedCurrency !== clickedCurrency) {
            this._store.dispatch(
                managementActions.changeCurrency({ newCurrency: clickedCurrency })
            );
        }
    }
}
