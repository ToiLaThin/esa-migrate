import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderApproveService } from '../../../core/services/order-approve.service';
import { orderManagementActions } from './order.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
    providedIn: 'root'
})
export class OrderManagementEffect {
    constructor(
        private actions$: Actions,
        private _orderApproveService: OrderApproveService,
        private _notificationService: NzNotificationService
    ) {}

    clearAllApprovedOrdersEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(orderManagementActions.clearAllApprovedOrders),
            map(() => orderManagementActions.reloadOrdersToApprove())
        )
    );

    confirmApprovedOrdersEffect = createEffect(() => {
        return this.actions$.pipe(
            ofType(orderManagementActions.confirmApprovedOrders),
            switchMap((action) =>
                this._orderApproveService.confirmApprovedOrders(action.approvedOrders)!.pipe(
                    map(() => orderManagementActions.confirmApprovedOrdersSuccess()),
                    tap(() =>
                        this._notificationService.create(
                            'success',
                            'Orders have been confirmed successfully',
                            ''
                        )
                    ),
                    catchError((error) => {
                        this._notificationService.create(
                            'error',
                            'An error occurred while confirming orders',
                            ''
                        );
                        console.log(error);
                        return of(
                            orderManagementActions.confirmApprovedOrdersFailed({ error: error })
                        );
                    })
                )
            )
        );
    });
    loadOrderToApproveEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(orderManagementActions.reloadOrdersToApprove),
            switchMap(() =>
                this._orderApproveService.getBatchOrderApprove().pipe(
                    map(
                        (orderItemsAndStockAggregate) =>
                            orderManagementActions.ordersToApproveLoaded({
                                loadedOrderItemsAndStock: orderItemsAndStockAggregate
                            }),

                        catchError((error) => {
                            this._notificationService.create(
                                'error',
                                'An error occurred while loading orders',
                                ''
                            );
                            console.log(error);
                            return of(
                                orderManagementActions.ordersToApproveLoadFailed({ error: error })
                            );
                        })
                    ),
                    tap(() =>
                        this._notificationService.create(
                            'success',
                            'Orders have been loaded successfully',
                            ''
                        )
                    )
                )
            )
        )
    );
}
