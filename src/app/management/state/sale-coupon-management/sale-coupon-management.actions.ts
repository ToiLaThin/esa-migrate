import { createActionGroup, props } from "@ngrx/store";
import { ICoupon } from '../../../core/models/coupon.interface';

export const saleCouponManagementActions = createActionGroup({
    source: 'Sale Coupon Events in Management Module',
    events: {
        'Add New Coupon': props<{coupon: ICoupon}>(),
        'Add New Coupon Success': props<{addedCoupon: ICoupon}>(),
        'Add New Coupon Failed': props<{error: any}>()
    }
})