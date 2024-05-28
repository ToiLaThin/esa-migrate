import { state } from '@angular/animations';
import { orderFeatureKey } from './order.reducers';
import { IOrderListFilterSortPaginateAggregateState, IOrderState } from './orderState.interface';
import { createSelector } from '@ngrx/store';

export const selectOrderState = (state: { [orderFeatureKey]: IOrderState }) =>
    state[orderFeatureKey];

export const selectorTrackingOrder = createSelector(
    selectOrderState,
    (state) => state.trackingOrder
);

export const selectorIsAddressDefined = createSelector(
    selectOrderState,
    (state) => state.customerOrderInfo?.address !== undefined || state.customerOrderInfo?.address !== null
);

export const selectorCustomerOrderInfo = createSelector(
    selectOrderState,
    (state) => state.customerOrderInfo
);

export const selectorOrderListFilterSortPaginateAggregateState = createSelector(
    selectOrderState,
    (state) => {
        let orderListFilterSortPaginateAggregateState: IOrderListFilterSortPaginateAggregateState;
        orderListFilterSortPaginateAggregateState = {
            orderListFilterOrderStatus: state.orderListFilterOrderStatus,
            orderListFilterPaymentMethod: state.orderListFilterPaymentMethod,
            orderListPageNum: state.orderListPageNum,
            orderListPageSize: state.orderListPageSize,
            orderListSortBy: state.orderListSortBy,
            orderListSortType: state.orderListSortType
        }
        return orderListFilterSortPaginateAggregateState;
    }
)

export const selectorOrderAggregateCartFilteredSortedPaginatedList = createSelector(
    selectOrderState,
    (state) => state.orderAggregateCartFilteredSortedPaginatedList
)

export const selectorOrderAggregateCartFilteredListTotalCount = createSelector(
    selectOrderState,
    (state) => state.totalOrdersAfterFilteredCount
)

export const selectorPageCountOrderAggregateCartFilteredSortedPaginated = createSelector(
    selectorOrderListFilterSortPaginateAggregateState,
    selectorOrderAggregateCartFilteredListTotalCount,
    (orderListFilterSortPaginateAggregateState, totalOrdersAfterFilteredCount) => Math.ceil(totalOrdersAfterFilteredCount / orderListFilterSortPaginateAggregateState.orderListPageSize)
    //math ceil luon lam tron len => 1.1 -> 2
)

export const selectorCurrentPageNumOrderAggregateCartFilteredSortedPaginated = createSelector(
    selectOrderState,
    (state) => state.orderListPageNum
)

export const selectorProductsForReorder = createSelector(
    selectOrderState,
    (state) => state.productsForReorder
)