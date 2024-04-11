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

//we must get this from server, not the state.orderAggregateCartFilteredSortedPaginatedList.length
export const selectorOrderAggregateCartFilteredSortedTotalCount = createSelector(
    selectOrderState,
    (state) => state.orderAggregateCartFilteredSortedPaginatedList.length //wrong
)

export const selectorPageCountOrderAggregateCartFilteredSortedPaginated = createSelector(
    selectOrderState,
    (state) => Math.ceil(state.orderAggregateCartFilteredSortedPaginatedList.length / state.orderListPageSize)
    //math ceil luon lam tron len => 1.1 -> 2
)

export const selectorCurrentPageNumOrderAggregateCartFilteredSortedPaginated = createSelector(
    selectOrderState,
    (state) => state.orderListPageNum
)