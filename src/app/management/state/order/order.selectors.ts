import { orderManagementFeatureKey } from './order.reducers';
import { IOrderManagementState } from './orderManagementState,interface';
import { createSelector } from '@ngrx/store';
import { IItemStock, IOrderItems } from '../../../core/models/order-approve.model';
import { state } from '@angular/animations';

export const selectOrderManagementFeature = (state: {
    [orderManagementFeatureKey]: IOrderManagementState;
}) => state[orderManagementFeatureKey];

export const selectorItemStockLookUpMap = createSelector(
    selectOrderManagementFeature,
    state => state.itemStockLookUp
)

export const selectorItemStockLookUp = createSelector(
    selectorItemStockLookUpMap,
    itemStockLookUp => {
        let result: IItemStock[] = [];
        itemStockLookUp.forEach((value, key) => {
            result.push({productModelId: key, quantity: value});
        });
        return result;
    }
)

export const selectorOrdersToApprove = createSelector(
    selectOrderManagementFeature,
    state => state.ordersToApprove
)

//this the ordersApproved aggregate to send to the server
export const selectorOrdersApprovedAggregate = createSelector(
    selectOrderManagementFeature,
    state => state.ordersApproved
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