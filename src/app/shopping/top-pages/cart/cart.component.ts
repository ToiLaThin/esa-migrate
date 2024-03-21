import { Component, OnInit } from '@angular/core';
import { ICartItem } from '../../../core/models/cart-item.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectorItemsInCart } from '../../state/cart/cart.selectors';
import { cartFeatureKey } from '../../state/cart/cart.reducers';
import { ICartState } from '../../state/cart/cartState.interface';
import { cartActions } from '../../state/cart/cart.actions';

@Component({
    selector: 'esa-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    cartItems$!: Observable<ICartItem[]>;

    constructor(private _store: Store) {}

    ngOnInit(): void {
        this.cartItems$ = this._store.select((state) =>
            selectorItemsInCart(state as { [cartFeatureKey]: ICartState })
        );
    }

    clearCart() {
        this._store.dispatch(cartActions.cartClear());
    }
}
