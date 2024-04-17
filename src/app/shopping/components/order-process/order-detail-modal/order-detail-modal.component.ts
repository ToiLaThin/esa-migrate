import { Component, Inject } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { IOrderAggregateCart } from '../../../../core/models/order.interface';

@Component({
    selector: 'esa-order-detail-modal',
    templateUrl: './order-detail-modal.component.html',
    styleUrls: ['./order-detail-modal.component.scss']
})
export class OrderDetailModalComponent {
    constructor(
        private _modalRef: NzModalRef,
        @Inject(NZ_MODAL_DATA) public data: { orderAggregateCart: IOrderAggregateCart }
    ) {}

    ngOnInit() {
        this._modalRef.afterOpen.subscribe(() => {
            console.log(this.data.orderAggregateCart)
        })
    }

    get orderDetail() {
        return this.data.orderAggregateCart;
    }

    close() {
        this._modalRef.close();
    }
}
