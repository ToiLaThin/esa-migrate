import { createReducer, on } from '@ngrx/store';
import { ICartState } from './cartState.interface';
import { cartActions } from './cart.actions';

export const initialCartState: ICartState = {
    itemsInCart: [],
    couponApplied: false,
    discountAmountByCoupon: 0
};

export const cartFeatureKey = 'cartFeature';
export const cartReducer = createReducer(
    initialCartState,
    on(cartActions.cartItemUpsert, (state, action) => {
        let itemsInCart = state.itemsInCart;
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

        item!.quantity = item!.quantity + action.upsertCartItem.quantity;
        item!.finalPrice = item!.finalPrice + action.upsertCartItem.finalPrice;
        item!.finalAfterSalePrice =
            item!.finalAfterSalePrice && action.upsertCartItem.finalAfterSalePrice
                ? item!.finalAfterSalePrice + action.upsertCartItem.finalAfterSalePrice
                : undefined;
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
        }
    })
);
