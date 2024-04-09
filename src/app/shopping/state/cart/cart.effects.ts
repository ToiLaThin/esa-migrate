import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../../../core/services/cart.service';
import { cartActions } from './cart.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ICartItem } from '../../../core/models/cart-item.interface';
import { selectorItemsInCart } from './cart.selectors';
import { cartFeatureKey } from './cart.reducers';
import { ICartState } from './cartState.interface';
import { CouponService } from '../../../core/services/coupon.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { orderActions } from '../order/order.actions';

@Injectable({ providedIn: 'root' })
export class CartEffects {
    constructor(
        private actions$: Actions,
        private _store: Store,
        private _cartService: CartService,
        private _couponService: CouponService,
        private _notificationService: NzNotificationService,
        private _router: Router
    ) {}

    loadCartItemsFromStorage = createEffect(() =>
        this.actions$.pipe(
            ofType(cartActions.loadCartItemsFromStorage),
            switchMap((_) => {
                let loadedCartItemsFrStorage = this._cartService.loadCartItemsFromStorage();
                return of(
                    cartActions.loadCartItemsFromStorageDone({
                        loadedCartItems: loadedCartItemsFrStorage
                    })
                );
            })
        )
    );

    changeCartItemEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(
                cartActions.cartItemUpsert,
                cartActions.removeCartItem,
                cartActions.changeCartItemQuantity
            ),
            switchMap((_) => {
                let afterRemoveUpsertItemsInCart: ICartItem[] | null = null;
                let afterRemoveUpsertItemsInCartSubscription = this._store
                    .select((state) =>
                        selectorItemsInCart(state as { [cartFeatureKey]: ICartState })
                    )
                    .pipe(
                        tap((itemsInCart) => {
                            afterRemoveUpsertItemsInCart = itemsInCart;
                            this._cartService.updateCartItemsInStorage(
                                afterRemoveUpsertItemsInCart
                            );
                        })
                    )
                    .subscribe();
                afterRemoveUpsertItemsInCartSubscription.unsubscribe();
                return of(cartActions.cartItemUpsertRemoveChangeQuantityClearSuccessful());
            })
        )
    );

    clearCartItems = createEffect(() =>
        this.actions$.pipe(
            ofType(cartActions.cartClear),
            switchMap((_) => {
                this._cartService.clearCartInStorage();
                return of(cartActions.cartItemUpsertRemoveChangeQuantityClearSuccessful());
            })
        )
    );

    loadAllCouponsEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(cartActions.loadAllCoupons),
            switchMap((_) =>
                this._couponService
                    .getAllCoupons()
                    .pipe(map((allCoupons) => cartActions.loadCouponsDone({ coupons: allCoupons })))
            )
        )
    );

    loadAllActiveCouponsNotUsedByUserEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(cartActions.loadActiveCouponsNotUsedByUser),
            switchMap((_) =>
                this._couponService
                    .getAllActiveCouponsNotUsedByUser()
                    .pipe(
                        map((allCoupons) =>
                            cartActions.loadActiveCouponsNotUsedByUserDone({ coupons: allCoupons })
                        )
                    )
            )
        )
    );

    confirmCartEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(cartActions.confirmCart),
            switchMap((action) =>
                this._cartService.confirmCart(action.cartConfirmRequest).pipe(
                    tap((orderAggregateCart) => {
                        console.log('orderAggregateCart', orderAggregateCart);
                        this._store.dispatch(
                            orderActions.beginTrackingOrder({ trackingOrder: orderAggregateCart })
                        );
                    }),
                    map((_) => cartActions.confirmCartSuccess()),
                    catchError((error) => of(cartActions.confirmCartFailure({ error })))
                )
            )
        )
    );

    //effect dispatch multiple actions
    confirmCartSuccessEffect = createEffect(
        () =>
            this.actions$.pipe(
                ofType(cartActions.confirmCartSuccess),
                switchMap((_) => of(cartActions.cartClear(), cartActions.removeCouponApplied())),
                tap((_) => {
                    this._notificationService.create('success', 'Order confirmed', '');
                    this._router.navigate(['/shopping/order-process/']);
                })
            ),
        { dispatch: true }
    );
}
