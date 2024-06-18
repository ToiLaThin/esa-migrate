import { state } from '@angular/animations';
import { orderManagementFeatureKey } from './order.reducers';
import { IOrderManagementState } from './orderManagementState,interface';
import { createSelector } from '@ngrx/store';

export const selectOrderManagementFeature = (state: {
    [orderManagementFeatureKey]: IOrderManagementState;
}) => state[orderManagementFeatureKey];

export const selectorItemStockLookUp = createSelector(
    selectOrderManagementFeature,
    state => state.itemStockLookUp
)

export const selectorOrdersToApprove = createSelector(
    selectOrderManagementFeature,
    state => state.ordersToApprove
)
export const selectorIsLoadingOrdersToApprove = createSelector(
    selectOrderManagementFeature,
    state => state.isLoadingOrdersToApprove
)

//this the ordersApproved aggregate to send to the server
export const selectorOrdersApprovedAggregate = createSelector(
    selectOrderManagementFeature,
    state => state.ordersApproved
)
export const selectorIsConfirmingApprovedOrders = createSelector(
    selectOrderManagementFeature,
    state => state.isConfirmingApprovedOrders
)

//this the ordersApproved but the type is IOrderItem[] to display in the UI
export const selectorOrdersApprovedTypeIOrderItem = createSelector(
    selectOrderManagementFeature,
    state => state.ordersApprovedTypeIOrderItem
)

export const selectorOrderAggregateCartDetail = createSelector(
    selectOrderManagementFeature,
    state => state.orderDetail
);