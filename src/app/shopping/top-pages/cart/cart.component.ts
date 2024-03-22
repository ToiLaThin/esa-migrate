import { Component, OnInit } from '@angular/core';
import { ICartItem } from '../../../core/models/cart-item.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
    selectorDiscountAmountSale,
    selectorItemsInCart,
    selectorSubItemsAfterSalePrice,
    selectorSubItemsPrice
} from '../../state/cart/cart.selectors';
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
    subItemsPrice$!: Observable<number>;
    subItemsAfterSalePrice$!: Observable<number>;
    discountAmountSale$!: Observable<number>;
    constructor(private _store: Store) {}

    ngOnInit(): void {
        this.cartItems$ = this._store.select((state) =>
            selectorItemsInCart(state as { [cartFeatureKey]: ICartState })
        );
        this.subItemsPrice$ = this._store.select((state) =>
            selectorSubItemsPrice(state as { [cartFeatureKey]: ICartState })
        );
        this.subItemsAfterSalePrice$ = this._store.select((state) =>
            selectorSubItemsAfterSalePrice(state as { [cartFeatureKey]: ICartState })
        );
        this.discountAmountSale$ = this._store.select((state) =>
            selectorDiscountAmountSale(state as { [cartFeatureKey]: ICartState })
        );
    }

    clearCart() {
        this._store.dispatch(cartActions.cartClear());
    }

    removeCartItemFromCart(idxItemInCart: number) {
        console.log('removeCartItemFromCart', idxItemInCart);
        this._store.dispatch(cartActions.removeCartItem({ idxItemInCart: idxItemInCart }));
    }

    changeCartItemQuantity(indexInCart: number, event: Event) {
        let quantity = (event.target as HTMLInputElement).valueAsNumber;
        this._store.dispatch(
            cartActions.changeCartItemQuantity({
                idxItemInCart: indexInCart,
                newQuantity: quantity
            })
        );
    }
}
