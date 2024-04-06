import { Component, Input } from "@angular/core";
import { IOrderItems } from "../../../../core/models/order-approve.model";
import { PaymentMethod } from "../../../../core/types/payment-method.enum";
import { OrderStatus } from "../../../../core/types/order-status.enum";

@Component({
    selector: 'esa-management-order-approve-order',
    templateUrl: './order-approve-order.component.html',
    styleUrls: ['./order-approve-order.component.scss']
})
export class OrderApproveOrderManagementComponent {
    @Input({required: true}) order!: IOrderItems;
    get PaymentMethod() {
        return PaymentMethod;
    }

    get PaymentMethodText() {
        return PaymentMethod[this.order.paymentMethod];
    }

    get OrderStatus() {
        return OrderStatus;
    }
    get OrderStatusText() {
        return OrderStatus[this.order.orderStatus];
    }
    constructor() {}
}