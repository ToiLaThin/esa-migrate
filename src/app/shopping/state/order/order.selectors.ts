import { state } from '@angular/animations';
import { orderFeatureKey } from './order.reducers';
import { IOrderState } from './orderState.interface';
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
