import { ICartItem } from "../../../core/models/cart-item.interface";
import { ICoupon } from "../../../core/models/coupon.interface";

export interface ICartState {
    itemsInCart: ICartItem[];
    allCoupons: ICoupon[];
    allActiveCouponsNotUsedByUser: ICoupon[];
    discountAmountByCoupon: number;
    couponApplied: boolean;
    couponCodeApplied: string;
}