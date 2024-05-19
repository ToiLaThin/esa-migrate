import { IOrderItems, IOrderApprovedAggregate, IStockLookupItem } from "../../../core/models/order-approve.model";
import { IOrderAggregateCart } from "../../../core/models/order.interface";

export interface IOrderManagementState {
    itemStockLookUp: IStockLookupItem[];
    ordersToApprove: IOrderItems[];
    ordersApprovedTypeIOrderItem: IOrderItems[];
    ordersApproved: IOrderApprovedAggregate[];
    orderDetail: IOrderAggregateCart | null;
}