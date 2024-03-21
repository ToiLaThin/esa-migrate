import { ICartItem } from "../../../core/models/cart-item.interface";

export interface ICartState {
    itemsInCart: ICartItem[];
    discountAmountByCoupon: number;
    couponApplied: boolean;
}