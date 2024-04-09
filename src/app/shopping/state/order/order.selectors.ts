import { state } from '@angular/animations';
import { orderFeatureKey } from './order.reducers';
import { IOrderState } from './orderState.interface';
import { createSelector } from '@ngrx/store';

export const selectOrderState = (state: { [orderFeatureKey]: IOrderState }) =>
    state[orderFeatureKey];

export const selectorTrackingOrder = createSelector(
    selectOrderState,
    (state) => state.trackingOrder
)
