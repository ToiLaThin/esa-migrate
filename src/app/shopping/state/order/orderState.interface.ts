import { ICustomerOrderInfo, ICustomerOrderInfoConfirmedRequest } from "../../../core/models/customer-order-info.interface";
import { IOrderAggregateCart } from "../../../core/models/order.interface";

export interface IOrderState {
    trackingOrder: IOrderAggregateCart | null;
    customerOrderInfo: ICustomerOrderInfo | null;
}