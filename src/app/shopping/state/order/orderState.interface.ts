import { IOrderAggregateCart } from "../../../core/models/order.interface";

export interface IOrderState {
    trackingOrder: IOrderAggregateCart | null;
}