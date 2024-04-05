import { Component, Input } from "@angular/core";
import { IOrderItems } from "../../../../core/models/order-approve.model";

@Component({
    selector: 'esa-management-order-approve-order',
    templateUrl: './order-approve-order.component.html',
    styleUrls: ['./order-approve-order.component.scss']
})
export class OrderApproveOrderManagementComponent {
    @Input({required: true}) ordersToApprove!: IOrderItems[];
    constructor() {}
}