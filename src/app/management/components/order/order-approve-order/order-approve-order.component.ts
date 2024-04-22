import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IOrderItems } from "../../../../core/models/order-approve.model";
import { PaymentMethod } from "../../../../core/types/payment-method.enum";
import { OrderStatus } from "../../../../core/types/order-status.enum";
import { ColorSvgNames } from "../../../../share-components/svg-definitions/color-svg-names.enum";
import { OutlineSvgNames } from "../../../../share-components/svg-definitions/outline-svg-names.enum";

@Component({
    selector: 'esa-management-order-approve-order',
    templateUrl: './order-approve-order.component.html',
    styleUrls: ['./order-approve-order.component.scss']
})
export class OrderApproveOrderManagementComponent {
    @Input({required: true}) order!: IOrderItems;
    @Output() viewedDetailOrder: EventEmitter<string> = new EventEmitter<string>();
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

    get ColorSvgNames() {
        return ColorSvgNames;
    }

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }

    constructor() {}

    viewDetailOrder(orderId: string) {
        this.viewedDetailOrder.emit(orderId);
    }

}