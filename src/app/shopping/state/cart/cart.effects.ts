import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../../../core/services/cart.service';
import { cartActions } from './cart.actions';
import { of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ICartItem } from '../../../core/models/cart-item.interface';
import { selectorItemsInCart } from './cart.selectors';
import { cartFeatureKey } from './cart.reducers';
import { ICartState } from './cartState.interface';

@Injectable({ providedIn: 'root' })
export class CartEffects {
    constructor(
        private actions$: Actions,
        private _store: Store,
        private _cartService: CartService
    ) {}

    loadCartItemsFromStorage = createEffect(() => 
        this.actions$.pipe(
            ofType(cartActions.loadCartItemsFromStorage),
            switchMap(_ => {
                let loadedCartItemsFrStorage = this._cartService.loadCartItemsFromStorage();
                return of(cartActions.loadCartItemsFromStorageDone({loadedCartItems: loadedCartItemsFrStorage}))
            }
        )
    ));

    upsertCartItemEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(cartActions.cartItemUpsert),
            switchMap((_) => {
                let afterUpsertItemsInCart: ICartItem[] | null = null;
                let afterUpsertItemsInCartSubscription = this._store
                    .select((state) =>
                        selectorItemsInCart(state as { [cartFeatureKey]: ICartState })
                    )
                    .pipe(tap((itemsInCart) => {
                        afterUpsertItemsInCart = itemsInCart;
                        this._cartService.updateCartItemsInStorage(afterUpsertItemsInCart);
                    }))
                    .subscribe();
                afterUpsertItemsInCartSubscription.unsubscribe();
                return of(cartActions.cartItemUpsertSuccessful())
            })
        )
    );

    clearCartItems = createEffect(() => 
        this.actions$.pipe(
            ofType(cartActions.cartClear),
            switchMap(_ => {
                this._cartService.clearCartInStorage();
                return of(cartActions.cartClearDone());
            }
        )
    ));
}
