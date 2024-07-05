import { OrderStatus } from "../types/order-status.enum";
import { PaymentMethod } from "../types/payment-method.enum";
import { IProductModelInfoWithStockAggregate } from "./provider.interface";

export interface IItemStock {
    productModelId: string;
    quantity: number;
}

export interface IStockLookupItem extends IProductModelInfoWithStockAggregate {
}

export interface IOrderItems {
    orderId: string;
    userId: string;
    orderStatus: OrderStatus;
    paymentMethod: PaymentMethod;
    orderItemsQty: IItemStock[];
    totalPriceFinal: number;
}

export interface IOrderItemsAndStockLookupAggregate {
    orderItems: IOrderItems[];
    stockLookupItems: IStockLookupItem[];
}

//sent to aggregator to sequential update order status, then update stock quantity

export interface IStockDecreaseRequest {
    productModelId: string;
    quantityToDecrease: number;
}

export interface IOrderApprovedAggregate {
    orderId: string;
    userId: string;
    orderPrice: number;
    orderItemsStockToChange: IStockDecreaseRequest[];
}