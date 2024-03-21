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
)
