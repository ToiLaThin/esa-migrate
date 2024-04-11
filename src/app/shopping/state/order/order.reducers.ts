import { createReducer, on } from "@ngrx/store";
import { IOrderState } from "./orderState.interface";
import { orderActions } from "./order.actions";
import { OrdersNumberPerPage, OrdersSortBy, OrdersSortType } from "../../../core/ui-models/order-filter-data";
import { IOrderAggregateCart } from './../../../core/models/order.interface';

export const orderFeatureKey = 'orderFeature';

export const initialOrderState: IOrderState = {
    trackingOrder: null,
    customerOrderInfo: null,

    orderListFilterOrderStatus: null,
    orderListFilterPaymentMethod: null,
    orderListPageNum: 1,
    orderListPageSize: OrdersNumberPerPage.five,
    orderListSortBy: OrdersSortBy.id,
    orderListSortType: OrdersSortType.ascending,
    
    orderAggregateCartFilteredSortedPaginatedList: []
}

export const orderReducer = createReducer(
    initialOrderState,
    on(orderActions.beginTrackingOrder, (state, action) => {
        return {
            ...state,
            trackingOrder: action.trackingOrder
        }
    }),
    on(orderActions.loadTrackingOrderFromStorageDone, (state, action) => {
        return {
            ...state,
            trackingOrder: action.loadedTrackingOrder
        }
    }),
    on(orderActions.customerOrderInfoSetted, (state, action) => {
        return {
            ...state,
            customerOrderInfo: action.customerOrderInfo
        }
    }),
    on(orderActions.customerOrderInfoConfirmedSuccess, (state, action) => {
        return {
            ...state,
            trackingOrder: action.trackingOrder
        }
    }),
    on(orderActions.pickPaymentMethodCODSuccess, (state, action) => {
        return {
            ...state,
            trackingOrder: action.trackingOrder
        }
    }),
    on(orderActions.loadOrderFitlerdSortedPaginatedListSuccess, (state, action) => {
        return {
            ...state,
            orderAggregateCartFilteredSortedPaginatedList: action.orderAggregateCartFilteredSortedPaginatedList
        }
    }),

    on(orderActions.filterOrderStatusBy, (state, action) => {
        if (action.newOrderListFilterByOrderStatus === state.orderListFilterOrderStatus) {
            return {...state};
        }
        return {
            ...state,
            orderListFilterOrderStatus: action.newOrderListFilterByOrderStatus
        };
    }),
    on(orderActions.filterOrderSortBy, (state, action) => {
        if (action.newOrderListFilterBySortBy === state.orderListSortBy) {
            return {...state};
        }
        return {
            ...state,
            orderListSortBy: action.newOrderListFilterBySortBy
        };
    }),
    on(orderActions.filterOrderSortType, (state, action) => {
        if (action.newOrderListFilterBySortType === state.orderListSortType) {
            return {...state};
        }
        return {
            ...state,
            orderListSortType: action.newOrderListFilterBySortType
        };
    }),
    on(orderActions.numberPerPageSelected, (state, action) => {
        if (action.newOrderListNumberPerPage === state.orderListPageSize) {
            return {...state};
        }
        return {
            ...state,
            orderListPageSize: action.newOrderListNumberPerPage
        };
    }),
    on(orderActions.paymentMethodSelectedOrDeselect, (state, action) => {
        if (action.newOrderListPaymentMethod === state.orderListFilterPaymentMethod) {
            return {...state};
        }
        //no matter select or deselect, we will update the payment method
        return {
            ...state,
            orderListFilterPaymentMethod: action.newOrderListPaymentMethod
        };
    }),
);