import { IOrderItems, IOrderApprovedAggregate } from "../../../core/models/order-approve.model";

export interface IOrderManagementState {
    itemStockLookUp: Map<string, number>;
    ordersToApprove: IOrderItems[];
    ordersApprovedTypeIOrderItem: IOrderItems[];
    ordersApproved: IOrderApprovedAggregate[];
}