import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IOrderApprovedAggregate, IOrderItems } from "../../../../core/models/order-approve.model";
import { PaymentMethod } from "../../../../core/types/payment-method.enum";
import { OrderStatus } from "../../../../core/types/order-status.enum";
import { PillType } from "../../../../core/ui-models/pill-type";

@Component({
    selector: 'esa-management-order-approve-list',
    templateUrl: './order-approve-list.component.html',
    styleUrls: ['./order-approve-list.component.scss']
})
export class OrderApproveListManagementComponent {
    @Input({required: true}) displayMode: 'kanban' | 'table' = 'kanban';
    @Input({required: true}) ordersToApprove!: IOrderItems[];
    @Input({required: true}) ordersApproved!: IOrderItems[];
    @Output() displayModeToggled: EventEmitter<void> = new EventEmitter<void>();
    @Output() orderApproved: EventEmitter<string> = new EventEmitter<string>();
    @Output() removedOrderApproved: EventEmitter<string> = new EventEmitter<string>();
    @Output() resettedApprovedOrders: EventEmitter<void> = new EventEmitter<void>();
    @Output() confirmedApprovedOrders: EventEmitter<void> = new EventEmitter<void>();
    get PaymentMethod() {
        return PaymentMethod;
    }
    get OrderStatus() {
        return OrderStatus;
    }
    get PillType() {
        return PillType;
    }
    constructor() {}

    toggleDisplayMode() {
        this.displayModeToggled.emit();
    }

    approveOrder(orderId: string) {
        this.orderApproved.emit(orderId);
    }

    removeOrderApproved(orderId: string) {
        this.removedOrderApproved.emit(orderId);
    }

    resetApprovedOrders() {
        console.log('resetting approved orders');
        
        this.resettedApprovedOrders.emit();
    }

    confirmApprovedOrders() {
        if (!this.ordersApproved.length || this.ordersApproved.length === 0) {
            return;
        }
        this.confirmedApprovedOrders.emit();
    }


}