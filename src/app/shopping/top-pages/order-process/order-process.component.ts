import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { orderActions } from '../../state/order/order.actions';
import { Observable } from 'rxjs';
import { IOrderAggregateCart } from '../../../core/models/order.interface';
import { selectorIsLoadingInOrderState, selectorTrackingOrder } from '../../state/order/order.selectors';
import { orderFeatureKey } from '../../state/order/order.reducers';
import { IOrderState } from '../../state/order/orderState.interface';

@Component({
    selector: 'esa-order-process',
    templateUrl: './order-process.component.html',
    styleUrls: ['./order-process.component.scss']
})
export class OrderProcessComponent implements OnInit {
    trackingOrder$!: Observable<IOrderAggregateCart | null>;
    isLoadingInOrderState$!: Observable<boolean>;

    constructor(private _store: Store) {
        this._store.dispatch(orderActions.continueCurrentTrackingOrderProcess());
    }

    ngOnInit(): void {
        this.trackingOrder$ = this._store.select((state) =>
            selectorTrackingOrder(state as { [orderFeatureKey]: IOrderState })
        );
        this.isLoadingInOrderState$ = this._store.select((state) =>
            selectorIsLoadingInOrderState(state as { [orderFeatureKey]: IOrderState })
        );
    }
}
