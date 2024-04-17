import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { IOrderAggregateCart } from '../../../../core/models/order.interface';
import { Store } from '@ngrx/store';
import { orderManagementActions } from '../../../state/order/order.actions';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'esa-order-detail-drawer-management',
    templateUrl: './order-detail-drawer-management.component.html',
    styleUrls: ['./order-detail-drawer-management.component.scss']
})
export class OrderDetailDrawerManagementComponent implements OnInit {
    constructor(
        private _drawerRef: NzDrawerRef,
        private _store: Store,
        @Inject(NZ_DRAWER_DATA) public data: { orderAggregateCart: IOrderAggregateCart }
    ) {}

    ngOnInit() {
        this._drawerRef.afterOpen.subscribe(() => {
            console.log(this.data.orderAggregateCart);
        });
        // do not use pipe(takeUntil(this.destroy$)) here
        // because the drawer will be closed when the user clicks the close button
        // it destroys the component first before afterClose event is emitted
        this._drawerRef.afterClose.subscribe(() => {
            this._store.dispatch(orderManagementActions.closeOrderDetailDrawer());
        });
    }

    get orderDetail() {
        return this.data.orderAggregateCart;
    }

    close() {
        //if like this, only click the close btn, will dispatch action, not the close btn of nzDrawerService, so we can disable it
        //this._store.dispatch(orderManagementActions.closeOrderDetailDrawer());
        this._drawerRef.close();
    }
}
