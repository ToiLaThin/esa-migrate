import { createReducer, on } from '@ngrx/store';
import { ICartState } from './cartState.interface';
import { cartActions } from './cart.actions';

export const initialCartState: ICartState = {
    itemsInCart: [],
    allCoupons: [],
    allActiveCouponsNotUsedByUser: [],
    couponApplied: false,
    discountAmountByCoupon: 0,
    couponCodeApplied: ''
};

export const cartFeatureKey = 'cartFeature';
export const cartReducer = createReducer(
    initialCartState,
    on(cartActions.cartItemUpsert, (state, action) => {
        let itemsInCart = [...state.itemsInCart]; //this single line make it immutable, if not use spread operator, it will mutate the state
        let item = itemsInCart.find(
            (item) =>
                item.productModelId === action.upsertCartItem.productModelId &&
                item.productId === action.upsertCartItem.productId
        );
        console.log(action.upsertCartItem);
        console.log(itemsInCart);
        if (item === undefined) {
            itemsInCart = [...itemsInCart, action.upsertCartItem];
            return {
                ...state,
                itemsInCart: itemsInCart
            };
        }

        //immutable modify item
        itemsInCart = itemsInCart.map(
            (item) =>
                item.productModelId === action.upsertCartItem.productModelId &&
                item.productId === action.upsertCartItem.productId
                    ? {
                          ...item,
                          quantity: item.quantity + action.upsertCartItem.quantity,
                          finalPrice: item.finalPrice + action.upsertCartItem.finalPrice,
                          finalAfterSalePrice:
                              item.finalAfterSalePrice && action.upsertCartItem.finalAfterSalePrice
                                  ? item.finalAfterSalePrice + action.upsertCartItem.finalAfterSalePrice
                                  : undefined
                      }
                    : item
        );  
        console.log(action.upsertCartItem);
        console.log(itemsInCart);
        return {
            ...state,
            itemsInCart: itemsInCart
        };
    }),
    on(cartActions.loadCartItemsFromStorageDone, (state, action) => ({
        ...state,
        itemsInCart: action.loadedCartItems
    })),
    on(cartActions.cartClear, (state, action) => {
        return {
            ...state,
            itemsInCart: []
        };
    }),
    on(cartActions.removeCartItem, (state, action) => {
        return {
            ...state,
            itemsInCart: state.itemsInCart.filter((_, idx) => idx !== action.idxItemInCart)
        };
    }),
    on(cartActions.changeCartItemQuantity, (state, action) => ({
        //immutable way to change the quantity of an item in the cart
        ...state,
        itemsInCart: [
            ...state.itemsInCart.map((item, idx) => {
                if (idx !== action.idxItemInCart) {
                    return item;
                }
                return {
                    ...item,
                    quantity: action.newQuantity,
                    finalPrice: (item.finalPrice / item.quantity) * action.newQuantity,
                    //divide by old quantity and multiply by new quantity
                    finalAfterSalePrice: item.finalAfterSalePrice
                        ? (item.finalAfterSalePrice / item.quantity) * action.newQuantity
                        : undefined
                };
            })
        ]
    })),

    //coupon related reducers
    on(cartActions.loadCouponsDone, (state, action) => {
        return {
            ...state,
            allCoupons: action.coupons
        };
    }),
    on(cartActions.loadActiveCouponsNotUsedByUserDone, (state, action) => {
        return {
            ...state,
            allActiveCouponsNotUsedByUser: action.coupons
        };
    }),
    on(cartActions.applyCoupon, (state, action) => (
        {
            ...state,
            couponApplied: true,
            discountAmountByCoupon: action.discountAmount,
            couponCodeApplied: action.couponCode
        }
    )),
    on(cartActions.removeCouponApplied, (state, action) => ({
        ...state,
        couponApplied: false,
        discountAmountByCoupon: 0,
        couponCodeApplied: ''
    })),
);
