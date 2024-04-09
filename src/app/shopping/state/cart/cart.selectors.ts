import { createSelector } from '@ngrx/store';
import { cartFeatureKey } from './cart.reducers';
import { ICartState } from './cartState.interface';

export const selectorCartFeature = (state: { [cartFeatureKey]: ICartState }) =>
    state[cartFeatureKey];

export const selectorItemsInCart = createSelector(
    selectorCartFeature,
    (cartState) => cartState.itemsInCart
);

export const selectorItemsInCartCount = createSelector(
    selectorCartFeature,
    (cartState) => cartState.itemsInCart.length
);

export const selectorSubItemsPrice = createSelector(selectorCartFeature, (cartState) =>
    cartState.itemsInCart.reduce((acc, item) => acc + item.finalPrice, 0)
);

export const selectorSubItemsAfterSalePrice = createSelector(selectorCartFeature, (cartState) =>
    cartState.itemsInCart.reduce((acc, item) => {
        if (item.isOnSale) {
            return acc + item.finalAfterSalePrice!;
        }
        return acc + item.finalPrice;
    }, 0)
);

export const selectorDiscountAmountSale = createSelector(
    selectorSubItemsPrice,
    selectorSubItemsAfterSalePrice,
    (subItemsPrice, subItemsAfterSalePrice) => {
        return subItemsPrice - subItemsAfterSalePrice;
    }
);

//coupon selectors
export const selectorAllCoupons = createSelector(
    selectorCartFeature,
    (cartState) => cartState.allCoupons
);

export const selectorAllActiveCouponsNotUsedByUser = createSelector(
    selectorCartFeature,
    (cartState) => cartState.allActiveCouponsNotUsedByUser
);

export const selectorCouponApplied = createSelector(
    selectorCartFeature,
    (cartState) => cartState.couponApplied
);

export const selectorCouponCodeApplied = createSelector(
    selectorCartFeature,
    (cartState) => cartState.couponCodeApplied
);

export const selectorDiscountAmountCoupon = createSelector(
    selectorCartFeature,
    (cartState) => cartState.discountAmountByCoupon
)

export const selectorSubItemsAfterSaleThenCouponPrice = createSelector(
    selectorSubItemsAfterSalePrice,
    selectorDiscountAmountCoupon,
    (subItemsAfterSalePrice, discountAmountCoupon) => {
        return subItemsAfterSalePrice - discountAmountCoupon;
    }
)
    
