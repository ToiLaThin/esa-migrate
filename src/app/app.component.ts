import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { cartActions } from './shopping/state/cart/cart.actions';
import { orderActions } from './shopping/state/order/order.actions';
import { authActions } from './auth/state/auth.actions';

@Component({
    selector: 'esa-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'esa-migrate';

    constructor(private _store: Store) {

        // or we can use interval rxjs operator 
        // in auth.effects.ts startCheckSessionEffect

        // setInterval(() => {
        //     console.log('checking session');
        //     this._store.dispatch(authActions.checkSession());
        // }, env.loginCheckInterval);
        this._store.dispatch(authActions.bootstrapAuth());
        this._store.dispatch(cartActions.loadCartItemsFromStorage());
        this._store.dispatch(orderActions.loadTrackingOrderFromStorage());
    }
}
