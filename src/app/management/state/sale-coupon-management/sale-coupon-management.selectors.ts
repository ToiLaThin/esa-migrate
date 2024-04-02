import { createSelector } from "@ngrx/store";
import { saleCouponManagementFeatureKey } from "./sale-coupon-management.reducers";
import { ISaleCouponManagementState } from "./saleCouponManagementState.interface";

export const selectSaleCouponManagementFeature = (state: {
    [saleCouponManagementFeatureKey]: ISaleCouponManagementState;
}) => state[saleCouponManagementFeatureKey];

export const selectorAllCoupons = createSelector(
    selectSaleCouponManagementFeature,
    (state) => state.allCoupons
);
