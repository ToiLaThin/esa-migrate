import { IOrderItems, IOrderApprovedAggregate } from "../../../core/models/order-approve.model";
import { IOrderAggregateCart } from "../../../core/models/order.interface";

export interface IOrderManagementState {
    itemStockLookUp: Map<string, number>;
    ordersToApprove: IOrderItems[];
    ordersApprovedTypeIOrderItem: IOrderItems[];
    ordersApproved: IOrderApprovedAggregate[];
    orderDetail: IOrderAggregateCart | null;
}