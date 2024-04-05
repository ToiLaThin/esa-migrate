import { OrderStatus } from "../types/order-status.enum";

export interface IOrderDraftViewModel {
    orderId: string;
    subTotal: number;
    totalDiscount: number;
}

export interface IOrderViewModel {
    orderId: string;
    orderStatus: OrderStatus;
    subTotal: number;
    totalDiscount: number;
}

export interface IComment {
    commentId: string;
    productBusinessKey: string;
    userId: string;
    commentDetail: string;
    dateModified: Date;
}