import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderService } from '../../../core/services/order.service';
import { Injectable } from '@angular/core';
import { orderActions } from './order.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { IOrderAggregateCart } from '../../../core/models/order.interface';
import { Store } from '@ngrx/store';
import { orderFeatureKey } from './order.reducers';
import { IOrderListFilterSortPaginateAggregateState, IOrderState } from './orderState.interface';
import {
    selectorOrderListFilterSortPaginateAggregateState,
    selectorTrackingOrder
} from './order.selectors';
import { Router } from '@angular/router';
import { OrderStatus } from '../../../core/types/order-status.enum';
import { IAuthState } from '../../../auth/state/authState.interface';
import { authFeatureKey } from '../../../auth/state/auth.reducers';
import { selectorUserId } from '../../../auth/state/auth.selectors';
import { ProductService } from '../../../core/services/product.service';

@Injectable({ providedIn: 'root' })
export class OrderEffects {
    constructor(
        private actions$: Actions,
        private _orderService: OrderService,
        private _productService: ProductService,
        private _store: Store,
        private _router: Router
    ) {}

    continueOrderingProcessEffect = createEffect(
        () =>
            this.actions$.pipe(
                ofType(orderActions.continueCurrentTrackingOrderProcess),
                tap((_) => {
                    let currentTrackingOrder: Partial<IOrderAggregateCart>;
                    let tempSubscription = this._store
                        .select((state) =>
                            selectorTrackingOrder(state as { [orderFeatureKey]: IOrderState })
                        )
                        .pipe(tap((trackingOrder) => (currentTrackingOrder = trackingOrder!)))
                        .subscribe();
                    tempSubscription.unsubscribe();
                    switch (currentTrackingOrder!.orderStatus) {
                        case OrderStatus.createdDraft:
                            this._router.navigate(['/shopping/order-process/customer-info']);
                            break;
                        case OrderStatus.customerInfoConfirmed:
                            this._router.navigate(['/shopping/order-process/payment-methods']);
                            break;
                        case OrderStatus.checkouted:
                            this._router.navigate(['/shopping/order-process/notify-customer']);
                            break;
                    }
                })
            ),
        { dispatch: false }
    );

    beginTrackingOrderEffect = createEffect(
        () =>
            this.actions$.pipe(
                ofType(orderActions.beginTrackingOrder),
                tap((action) => {
                    this._orderService.updateTrackingOrderInStorage(action.trackingOrder);
                })
            ),
        { dispatch: false }
    );

    clearTrackingOrderEffect = createEffect(
        () =>
            this.actions$.pipe(
                ofType(orderActions.clearTrackingOrder),
                tap((_) => {
                    this._orderService.clearTrackingOrderInStorage();
                })
            ),
        { dispatch: false }
    );

    loadTrackingOrderFromStorageEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(orderActions.loadTrackingOrderFromStorage),
            switchMap(() => {
                let loadedTrackingOrder = this._orderService.loadTrackingOrderFromStorage();
                return of(
                    orderActions.loadTrackingOrderFromStorageDone({
                        loadedTrackingOrder: loadedTrackingOrder
                    })
                );
            })
        )
    );

    loadAddressFromStorageEffect = createEffect(
        () =>
            this.actions$.pipe(
                ofType(orderActions.loadAddressFromStorage),
                tap((_) => {
                    this._orderService.loadAddressFromStorage();
                })
            ),
        { dispatch: false }
    );

    customerOrderInfoConfirmedEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(orderActions.customerOrderInfoConfirmed),
            switchMap((action) => {
                return this._orderService
                    .confirmOrderCustomerInfo(action.customerOrderInfoConfirmedRequest)
                    .pipe(
                        tap((orderAggregateCart) => console.log(orderAggregateCart)),
                        map((orderAggregateCart) =>
                            orderActions.customerOrderInfoConfirmedSuccess({
                                trackingOrder: orderAggregateCart
                            })
                        ),
                        catchError((error) =>
                            of(orderActions.customerOrderInfoConfirmedFailed({ error }))
                        )
                    );
            })
        )
    );

    customerOrderInfoConfirmedSuccessEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(orderActions.customerOrderInfoConfirmedSuccess),
            tap((action) => {
                this._orderService.updateTrackingOrderInStorage(action.trackingOrder);
            }),
            switchMap((_) => {
                return of(orderActions.continueCurrentTrackingOrderProcess());
            })
        )
    );

    pickPaymentMethodCODEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(orderActions.pickPaymentMethodCOD),
            switchMap(() => {
                let currentTrackingOrder!: IOrderAggregateCart;
                let currentTrackingOrderSub = this._store
                    .select((state) =>
                        selectorTrackingOrder(state as { [orderFeatureKey]: IOrderState })
                    )
                    .pipe(tap((trackingOrder) => (currentTrackingOrder = trackingOrder!)))
                    .subscribe();
                currentTrackingOrderSub.unsubscribe();

                if (currentTrackingOrder === null || currentTrackingOrder === undefined) {
                    alert('There is an error. Please try again later');
                    return of(
                        orderActions.pickPaymentMethodCODFailed({
                            error: 'currentTrackingOrder is null'
                        })
                    );
                }

                return this._orderService.pickPaymentMethodCOD(currentTrackingOrder)!.pipe(
                    map((orderAggregateCart) =>
                        orderActions.pickPaymentMethodCODSuccess({
                            trackingOrder: orderAggregateCart
                        })
                    ),
                    catchError((error) => of(orderActions.pickPaymentMethodCODFailed({ error })))
                );
            })
        )
    );

    pickPaymentMethodCODSuccessEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(orderActions.pickPaymentMethodCODSuccess),
            tap((action) => {
                this._orderService.updateTrackingOrderInStorage(action.trackingOrder);
            }),
            switchMap((_) => {
                return of(orderActions.continueCurrentTrackingOrderProcess());
            })
        )
    );

    pickPaymentMethodEWalletEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(orderActions.pickPaymentMethodEWallet),
            switchMap(() => {
                let currentTrackingOrder!: IOrderAggregateCart;
                let currentTrackingOrderSub = this._store
                    .select((state) =>
                        selectorTrackingOrder(state as { [orderFeatureKey]: IOrderState })
                    )
                    .pipe(tap((trackingOrder) => (currentTrackingOrder = trackingOrder!)))
                    .subscribe();
                currentTrackingOrderSub.unsubscribe();

                if (currentTrackingOrder === null || currentTrackingOrder === undefined) {
                    alert('There is an error with current tracking order. Please try again later');
                    return of(
                        orderActions.pickPaymentMethodEWalletFailed({
                            error: 'currentTrackingOrder is null'
                        })
                    );
                }

                let currUserId: string | null = null;
                let userIdSub = this._store
                    .select((state) => selectorUserId(state as { [authFeatureKey]: IAuthState }))
                    .pipe(tap((userId) => (currUserId = userId)))
                    .subscribe();
                userIdSub.unsubscribe();
                if (currUserId === null || currUserId === undefined || currUserId === '') {
                    alert('There is an error with currUserId. Please try again later');
                    return of(
                        orderActions.pickPaymentMethodEWalletFailed({
                            error: 'currUserId is null || undefined'
                        })
                    );
                }
                return this._orderService
                    .pickPaymentMethodEWallet(currentTrackingOrder, currUserId)!
                    .pipe(
                        tap((paymentResponse) => {
                            if (paymentResponse === null || paymentResponse === undefined) {
                                this._store.dispatch(
                                    orderActions.pickPaymentMethodEWalletFailed({
                                        error: 'paymentResponse is null || undefined'
                                    })
                                );
                            }
                            if (
                                paymentResponse.payUrl === null ||
                                paymentResponse.payUrl === undefined ||
                                paymentResponse.payUrl === ''
                            ) {
                                this._store.dispatch(
                                    orderActions.pickPaymentMethodEWalletFailed({
                                        error: 'paymentResponse.payUrl is null || undefined | string.empty'
                                    })
                                );
                            }
                            window.location.href = paymentResponse.payUrl;
                        }),
                        map((_) => orderActions.pickPaymentMethodEWalletSuccess()),
                        catchError((error) =>
                            of(orderActions.pickPaymentMethodEWalletFailed({ error }))
                        )
                    );
            })
        )
    );

    pickPaymentMethodCreditCardEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(orderActions.pickPaymentMethodCreditCard),
            switchMap(() => {
                let currentTrackingOrder!: IOrderAggregateCart;
                let currentTrackingOrderSub = this._store
                    .select((state) =>
                        selectorTrackingOrder(state as { [orderFeatureKey]: IOrderState })
                    )
                    .pipe(tap((trackingOrder) => (currentTrackingOrder = trackingOrder!)))
                    .subscribe();
                currentTrackingOrderSub.unsubscribe();

                if (currentTrackingOrder === null || currentTrackingOrder === undefined) {
                    alert('There is an error with current tracking order. Please try again later');
                    return of(
                        orderActions.pickPaymentMethodCreditCardFailed({
                            error: 'currentTrackingOrder is null'
                        })
                    );
                }

                let currUserId: string | null = null;
                let userIdSub = this._store
                    .select((state) => selectorUserId(state as { [authFeatureKey]: IAuthState }))
                    .pipe(tap((userId) => (currUserId = userId)))
                    .subscribe();
                userIdSub.unsubscribe();
                if (currUserId === null || currUserId === undefined || currUserId === '') {
                    alert('There is an error with currUserId. Please try again later');
                    return of(
                        orderActions.pickPaymentMethodCreditCardFailed({
                            error: 'currUserId is null || undefined'
                        })
                    );
                }
                return this._orderService
                    .pickPaymentMethodCreditCard(currentTrackingOrder, currUserId)!
                    .pipe(
                        tap((paymentResponse) => {
                            if (paymentResponse === null || paymentResponse === undefined) {
                                this._store.dispatch(
                                    orderActions.pickPaymentMethodCreditCardFailed({
                                        error: 'paymentResponse is null || undefined'
                                    })
                                );
                            }
                            if (
                                paymentResponse.payUrl === null ||
                                paymentResponse.payUrl === undefined ||
                                paymentResponse.payUrl === ''
                            ) {
                                this._store.dispatch(
                                    orderActions.pickPaymentMethodCreditCardFailed({
                                        error: 'paymentResponse.payUrl is null || undefined | string.empty'
                                    })
                                );
                            }
                            window.location.href = paymentResponse.payUrl;
                        }),
                        map((_) => orderActions.pickPaymentMethodCreditCardSuccess()),
                        catchError((error) =>
                            of(orderActions.pickPaymentMethodCreditCardFailed({ error }))
                        )
                    );
            })
        )
    );

    loadOrderFilteredSortedPaginatedListOfUserEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(orderActions.loadOrderFitlerdSortedPaginatedListOfUser),
            switchMap((_) => {
                //instead of multiple selector for one scalar value => make a big obj => only have to subscribe one to get value
                let orderListFilterSortPaginateAggregateState: IOrderListFilterSortPaginateAggregateState | null =
                    null;
                let userId!: string;
                let orderListFilterSortPaginateAggregateStateSubscription = this._store
                    .select((state) =>
                        selectorOrderListFilterSortPaginateAggregateState(
                            state as { [orderFeatureKey]: IOrderState }
                        )
                    )
                    .pipe(
                        tap(
                            (orderFilterSortPaginatedWrapper) =>
                                (orderListFilterSortPaginateAggregateState =
                                    orderFilterSortPaginatedWrapper)
                        )
                    )
                    .subscribe();
                orderListFilterSortPaginateAggregateStateSubscription.unsubscribe();

                let userIdSubscription = this._store
                    .select((state) => selectorUserId(state as { [authFeatureKey]: IAuthState }))
                    .pipe(tap((userIdValue) => (userId = userIdValue)))
                    .subscribe();
                userIdSubscription.unsubscribe();
                return this._orderService
                    .loadOrderFitlerdSortedPaginatedListOfUser(
                        orderListFilterSortPaginateAggregateState!.orderListFilterOrderStatus,
                        orderListFilterSortPaginateAggregateState!.orderListFilterPaymentMethod,
                        orderListFilterSortPaginateAggregateState!.orderListPageNum,
                        orderListFilterSortPaginateAggregateState!.orderListPageSize,
                        orderListFilterSortPaginateAggregateState!.orderListSortBy,
                        orderListFilterSortPaginateAggregateState!.orderListSortType,
                        userId
                    )
                    .pipe(
                        tap((returnedResult) =>
                            console.log('OrderFitlerdSortedPaginatedList', returnedResult)
                        ),
                        map((returnedResult) =>
                            orderActions.loadOrderFitlerdSortedPaginatedListOfUserSuccess({
                                orderAggregateCartFilteredSortedPaginatedList:
                                    returnedResult.orderAggregateCartViewModels,
                                totalOrdersAfterOnlyFilteredCount: returnedResult.totalOrdersCount
                            })
                        ),
                        catchError((error) =>
                            of(orderActions.loadOrderFitlerdSortedPaginatedListOfUserFailed({ error }))
                        )
                    );
            })
        )
    );

    //add more actions can trigger this effect
    filterSortPaginateChangedEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(
                orderActions.filterOrderStatusBy,
                orderActions.filterOrderSortBy,
                orderActions.filterOrderSortType,
                orderActions.numberPerPageSelected,
                orderActions.paymentMethodSelectedOrDeselect,
                orderActions.selectPageNumber
            ),
            switchMap((_) => {
                return of(orderActions.loadOrderFitlerdSortedPaginatedListOfUser());
            })
        )
    );

    //for reordering
    loadProductsWithBusinessKeysEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(orderActions.loadProductsWithBusinessKeys),
            switchMap((action) =>
                this._productService.getProductsWithBusinessKeys(action.productBusinessKeys).pipe(
                    map((products) =>
                        orderActions.loadProductsWithBusinessKeysSuccessfull({ products })
                    ),
                    catchError((err) =>
                        of(orderActions.loadProductsWithBusinessKeysFailed({ error: err }))
                    )
                )
            )
        )
    );

    productForReorderAddedToCartEffect = createEffect(
        () =>
            this.actions$.pipe(
                ofType(orderActions.allProductsForReorderAddedToCart),
                tap((action) => {
                    this._router.navigate(['/shopping/cart']);
                })
            ),
        { dispatch: false }
    );
}
