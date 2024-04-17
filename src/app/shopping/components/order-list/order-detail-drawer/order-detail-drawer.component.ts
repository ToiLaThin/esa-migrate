import { Component, Inject, inject } from '@angular/core';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { IOrderAggregateCart } from '../../../../core/models/order.interface';

@Component({
    selector: 'esa-order-detail-drawer',
    templateUrl: './order-detail-drawer.component.html',
    styleUrls: ['./order-detail-drawer.component.scss']
})
export class OrderDetailDrawerComponent {
    constructor(
        private _drawerRef: NzDrawerRef,
        @Inject(NZ_DRAWER_DATA) public data: { orderAggregateCart: IOrderAggregateCart }
    ) {}

    ngOnInit() {
        this._drawerRef.afterOpen.subscribe(() => {
            console.log(this.data.orderAggregateCart);
        });
        this._drawerRef.afterClose.subscribe(() => {
            console.log('Drawer closed');
        });
    }

    get orderDetail() {
        return this.data.orderAggregateCart;
    }

    close() {
        this._drawerRef.close();
    }
}
