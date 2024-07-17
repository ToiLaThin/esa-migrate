import { ICustomerOrderInfo } from "../../../core/models/customer-order-info.interface";
import { IOrderAggregateCart } from "../../../core/models/order.interface";
import { IProduct } from "../../../core/models/product.interface";
import { OrderStatus } from "../../../core/types/order-status.enum";
import { PaymentMethod } from "../../../core/types/payment-method.enum";
import { OrdersSortBy, OrdersSortType } from "../../../core/ui-models/order-filter-data";

export interface IOrderState {
    isLoadingInOrderState: boolean; //for all loading in this feature state
    trackingOrder: IOrderAggregateCart | null;
    customerOrderInfo: ICustomerOrderInfo | null;

    orderListFilterOrderStatus: OrderStatus | null;
    orderListFilterPaymentMethod: PaymentMethod | null;
    orderListPageNum: number;
    orderListPageSize: number;
    orderListSortBy: OrdersSortBy;
    orderListSortType: OrdersSortType;

    orderAggregateCartFilteredSortedPaginatedList: IOrderAggregateCart[];
    totalOrdersAfterFilteredCount: number;//not paginated count, but all after filter
    productsForReorder: IProduct[];
}

export interface IOrderListFilterSortPaginateAggregateState {
    orderListFilterOrderStatus: OrderStatus | null;
    orderListFilterPaymentMethod: PaymentMethod | null;
    orderListPageNum: number;
    orderListPageSize: number;
    orderListSortBy: OrdersSortBy;
    orderListSortType: OrdersSortType;
}