import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { IOrderAggregateCart } from "../../../core/models/order.interface";
import { ICustomerOrderInfo, ICustomerOrderInfoConfirmedRequest } from "../../../core/models/customer-order-info.interface";
import { OrderStatus } from "../../../core/types/order-status.enum";
import { OrdersSortBy, OrdersSortType } from "../../../core/ui-models/order-filter-data";
import { PaymentMethod } from "../../../core/types/payment-method.enum";

export const orderActions = createActionGroup({
    source: 'Order Events In Shopping Module',
    events: {
        'Begin Tracking Order': props<{ trackingOrder: IOrderAggregateCart }>(),
        'Continue Current Tracking Order Process': emptyProps(),

        'Load Tracking Order From Storage': emptyProps(),
        'Load Tracking Order From Storage Done': props<{ loadedTrackingOrder: IOrderAggregateCart | null }>(),

        'Load Address From Storage': emptyProps(),
        'Customer Order Info Setted': props<{ customerOrderInfo: ICustomerOrderInfo }>(),

        'Customer Order Info Confirmed': props<{ customerOrderInfoConfirmedRequest: ICustomerOrderInfoConfirmedRequest }>(),
        'Customer Order Info Confirmed Success': props<{ trackingOrder: IOrderAggregateCart }>(),
        'Customer Order Info Confirmed Failed': props<{ error: any }>(),

        'Pick Payment Method COD': emptyProps(),
        'Pick Payment Method COD Success': props<{ trackingOrder: IOrderAggregateCart }>(),
        'Pick Payment Method COD Failed': props<{ error: any }>(),

        'Pick Payment Method EWallet': emptyProps(),
        'Pick Payment Method EWallet Success': emptyProps(),
        'Pick Payment Method EWallet Failed': props<{ error: any }>(),

        'Pick Payment Method Credit Card': emptyProps(),
        'Pick Payment Method Credit Card Success': emptyProps(),
        'Pick Payment Method Credit Card Failed': props<{ error: any }>(),

        'Load Order Fitlerd Sorted Paginated List': emptyProps(),
        'Load Order Fitlerd Sorted Paginated List Success': props<{ orderAggregateCartFilteredSortedPaginatedList: IOrderAggregateCart[] }>(),
        'Load Order Fitlerd Sorted Paginated List Failed': props<{ error: any }>(),

        'Filter Order Status By': props<{newOrderListFilterByOrderStatus: OrderStatus}>(),
        'Filter Order Sort By': props<{newOrderListFilterBySortBy: OrdersSortBy}>(),
        'Filter Order Sort Type': props<{newOrderListFilterBySortType: OrdersSortType}>(),
        'Number Per Page Selected': props<{newOrderListNumberPerPage: number}>(),
        'Payment Method Selected Or Deselect': props<{newOrderListPaymentMethod: PaymentMethod | null}>(),

    }
})