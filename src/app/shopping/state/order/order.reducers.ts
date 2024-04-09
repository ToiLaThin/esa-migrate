import { createReducer, on } from "@ngrx/store";
import { IOrderState } from "./orderState.interface";
import { orderActions } from "./order.actions";

export const orderFeatureKey = 'orderFeature';

export const initialOrderState: IOrderState = {
    trackingOrder: null
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
    })
);