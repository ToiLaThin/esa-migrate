import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderService } from '../../../core/services/order.service';
import { Injectable } from '@angular/core';
import { orderActions } from './order.actions';
import { map, of, switchMap, tap } from 'rxjs';
import { IOrderAggregateCart } from '../../../core/models/order.interface';
import { Store } from '@ngrx/store';
import { orderFeatureKey } from './order.reducers';
import { IOrderState } from './orderState.interface';
import { selectorTrackingOrder } from './order.selectors';
import { Router } from '@angular/router';
import { OrderStatus } from '../../../core/types/order-status.enum';

@Injectable({ providedIn: 'root' })
export class OrderEffects {
    constructor(
        private actions$: Actions,
        private _orderService: OrderService,
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
                            this._router.navigate(['/shopping/notify-customer']);
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
}
