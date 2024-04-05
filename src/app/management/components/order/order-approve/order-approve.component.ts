import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { orderManagementActions } from '../../../state/order/order.actions';
import {
    IItemStock,
    IOrderApprovedAggregate,
    IOrderItems
} from '../../../../core/models/order-approve.model';
import { orderManagementFeatureKey } from '../../../state/order/order.reducers';
import {
    selectorItemStockLookUp,
    selectorOrdersApprovedAggregate,
    selectorOrdersApprovedTypeIOrderItem,
    selectorOrdersToApprove
} from '../../../state/order/order.selectors';
import { IOrderManagementState } from '../../../state/order/orderManagementState,interface';

@Component({
    selector: 'esa-management-order-approve',
    templateUrl: './order-approve.component.html',
    styleUrls: ['./order-approve.component.scss']
})
export class OrderApproveManagementComponent implements OnInit, OnDestroy {
    displayModeItems: 'table' | 'list' = 'table';
    displayModeOrders: 'table' | 'kanban' = 'kanban';
    itemStockLookUp$!: Observable<IItemStock[]>;

    ordersApprovedTypeIOrderItem$!: Observable<IOrderItems[]>;
    ordersApproved$!: Observable<IOrderApprovedAggregate[]>;
    ordersApprovedSubscription!: Subscription;
    ordersApproved!: IOrderApprovedAggregate[];
    ordersToApprove$!: Observable<IOrderItems[]>;

    constructor(private _store: Store) {
        this._store.dispatch(orderManagementActions.reloadOrdersToApprove());
    }

    ngOnDestroy(): void {
        this.ordersApprovedSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.itemStockLookUp$ = this._store.select((state) =>
            selectorItemStockLookUp(state as { [orderManagementFeatureKey]: IOrderManagementState })
        );
        this.ordersToApprove$ = this._store.select((state) =>
            selectorOrdersToApprove(state as { [orderManagementFeatureKey]: IOrderManagementState })
        );
        this.ordersApprovedTypeIOrderItem$ = this._store.select((state) =>
            selectorOrdersApprovedTypeIOrderItem(
                state as { [orderManagementFeatureKey]: IOrderManagementState }
            )
        );
        this.ordersApproved$ = this._store.select((state) =>
            selectorOrdersApprovedAggregate(
                state as { [orderManagementFeatureKey]: IOrderManagementState }
            )
        );
        this.ordersApprovedSubscription = this.ordersApproved$
            .pipe(tap((ordersApproved) => (this.ordersApproved = ordersApproved)))
            .subscribe();
    }

    toggleDisplayModeItems() {
        this.displayModeItems = this.displayModeItems === 'table' ? 'list' : 'table';
    }

    toggleDisplayModeOrders() {
        this.displayModeOrders = this.displayModeOrders === 'table' ? 'kanban' : 'table';
    }

    approveOrder(orderId: string) {
        this._store.dispatch(orderManagementActions.approveOrder({ orderId: orderId }));
    }

    removeOrderApproved(orderId: string) {
        this._store.dispatch(orderManagementActions.removeApprovedOrder({ orderId: orderId }));
    }

    resetApprovedOrders() {
        this._store.dispatch(orderManagementActions.clearAllApprovedOrders());
    }

    confirmApprovedOrders() {
        //console.log(this.ordersApproved);
        this._store.dispatch(orderManagementActions.confirmApprovedOrders({approvedOrders: this.ordersApproved}))
    }
}
