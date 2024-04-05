import { OrderStatus } from "../types/order-status.enum";
import { PaymentMethod } from "../types/payment-method.enum";

export interface IItemStock {
    productModelId: string;
    quantity: number;
}

export interface IOrderItems {
    orderId: string;
    orderStatus: OrderStatus;
    paymentMethod: PaymentMethod;
    orderItemsQty: IItemStock[];
    totalPriceFinal: number;
}

export interface IOrderItemsAndStockAggregate {
    orderItems: IOrderItems[];
    itemsStock: Map<string, number>;//dictionary<string, int>
}

//sent to aggregator to sequential update order status, then update stock quantity

export interface IStockDecreaseRequest {
    productModelId: string;
    quantityToDecrease: number;
}

export interface IOrderApprovedAggregate {
    orderId: string;
    orderItemsStockToChange: IStockDecreaseRequest[];
}