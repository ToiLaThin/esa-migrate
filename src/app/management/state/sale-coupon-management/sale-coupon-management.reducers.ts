import { createReducer, on } from '@ngrx/store';
import { ISaleCouponManagementState } from './saleCouponManagementState.interface';
import { saleCouponManagementActions } from './sale-coupon-management.actions';

export const saleCouponManagementFeatureKey = 'saleCouponManagementFeature';
const initialSaleCouponManagementState: ISaleCouponManagementState = {
    allCoupons: []
};

export const saleCouponManagementReducer = createReducer(
    initialSaleCouponManagementState,
    on(saleCouponManagementActions.loadAllCouponsSuccess, (state, action) => {
        return {
            ...state,
            allCoupons: action.loadedCoupons
        };
    })
);
