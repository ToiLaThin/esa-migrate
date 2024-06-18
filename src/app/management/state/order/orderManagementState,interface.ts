import { IOrderItems, IOrderApprovedAggregate, IStockLookupItem } from "../../../core/models/order-approve.model";
import { IOrderAggregateCart } from "../../../core/models/order.interface";

export interface IOrderManagementState {
    itemStockLookUp: IStockLookupItem[];
    ordersToApprove: IOrderItems[];
    isLoadingOrdersToApprove: boolean;
    ordersApprovedTypeIOrderItem: IOrderItems[];
    isConfirmingApprovedOrders: boolean;
    ordersApproved: IOrderApprovedAggregate[];
    orderDetail: IOrderAggregateCart | null;
}