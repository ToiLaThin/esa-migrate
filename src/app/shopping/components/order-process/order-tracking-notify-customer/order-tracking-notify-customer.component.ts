import { Component, OnInit } from '@angular/core';
import { GgAnalyticsService } from '../../../../core/services/gg-analytics.service';
import { Store } from '@ngrx/store';
import { selectorTrackingOrder } from '../../../state/order/order.selectors';
import { orderFeatureKey } from '../../../state/order/order.reducers';
import { IOrderState } from '../../../state/order/orderState.interface';
import { tap } from 'rxjs';

@Component({
    selector: 'esa-order-tracking-notify-customer',
    templateUrl: './order-tracking-notify-customer.component.html',
    styleUrls: ['./order-tracking-notify-customer.component.scss']
})
export class OrderTrackingNotifyCustomerComponent implements OnInit {
    constructor(private _analyticsService: GgAnalyticsService, private _store: Store) {}
    ngOnInit() {
        let tempSubscription = this._store
            .select((state) => selectorTrackingOrder(state as { [orderFeatureKey]: IOrderState }))
            .pipe(
                tap((trackingOrder) => {
                    if (trackingOrder) {
                        this._analyticsService.purchase(trackingOrder);
                    } else {
                        alert('No tracking order found!');
                    }
                })
            )
            .subscribe();
        tempSubscription.unsubscribe();
    }
}
