import { createSelector } from "@ngrx/store";
import { productFeatureKey } from "./product.reducers";
import { IProductState } from "./productState.interface";

export const selectorProductFeature = (state: { [productFeatureKey]: IProductState }) => state[productFeatureKey];

export const selectorProductLazyLoadRequest = createSelector(
    selectorProductFeature,
    (productState) => productState.productLazyLoadRequest
)