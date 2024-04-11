import { ICustomerOrderInfo, ICustomerOrderInfoConfirmedRequest } from "../../../core/models/customer-order-info.interface";
import { IOrderAggregateCart } from "../../../core/models/order.interface";
import { OrderStatus } from "../../../core/types/order-status.enum";
import { PaymentMethod } from "../../../core/types/payment-method.enum";
import { OrdersSortBy, OrdersSortType } from "../../../core/ui-models/order-filter-data";

export interface IOrderState {
    trackingOrder: IOrderAggregateCart | null;
    customerOrderInfo: ICustomerOrderInfo | null;

    orderListFilterOrderStatus: OrderStatus | null;
    orderListFilterPaymentMethod: PaymentMethod | null;
    orderListPageNum: number;
    orderListPageSize: number;
    orderListSortBy: OrdersSortBy;
    orderListSortType: OrdersSortType;

    orderAggregateCartFilteredSortedPaginatedList: IOrderAggregateCart[];
}

export interface IOrderListFilterSortPaginateAggregateState {
    orderListFilterOrderStatus: OrderStatus | null;
    orderListFilterPaymentMethod: PaymentMethod | null;
    orderListPageNum: number;
    orderListPageSize: number;
    orderListSortBy: OrdersSortBy;
    orderListSortType: OrdersSortType;
}