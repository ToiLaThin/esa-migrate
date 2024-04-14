import { createSelector } from '@ngrx/store';
import { productFeatureKey } from './product.reducers';
import { IProductState } from './productState.interface';
import { IProduct } from '../../../core/models/product.interface';

export const selectorProductFeature = (state: { [productFeatureKey]: IProductState }) =>
    state[productFeatureKey];

export const selectorProductLazyLoadRequest = createSelector(
    selectorProductFeature,
    (productState) => productState.productLazyLoadRequest
);

export const selectorProductSelectedComments = createSelector(
    selectorProductFeature,
    (productState) => productState.selectedProductComments
);

export const selectorProductSelected = (productId: string) =>
    createSelector(selectorProductFeature, (projectState: IProductState) => {
        return projectState.paginatedProducts.products.find(
            (product) => product.productId == productId
        ) as IProduct;
    });

export const selectorIsSelectedProductBookmarked = (productBusinessKey: string) =>
    createSelector(selectorProductFeature, (productState) =>
        productState.selectedProductBookmarkMappings
            .map((mapping) => mapping.productBusinessKey)
            .includes(productBusinessKey)
    );
    
export const selectorDisplayingProducts = createSelector(
    selectorProductFeature,
    (productState) => productState.paginatedProducts.products
);
export const selectorPageCount = createSelector(
    selectorProductFeature,
    (productState) => productState.paginatedProducts.pageCount
);
export const selectorDisplayingProductCount = createSelector(
    selectorProductFeature,
    (productState) => productState.paginatedProducts.products.length
);

export const selectorAllCatalogs = createSelector(
    selectorProductFeature,
    (productState) => productState.allCatalogs
);
export const selectorSelectedSubCatalogs = createSelector(
    selectorProductFeature,
    (productState) => productState.subCatalogsOfSelectedCatalog
);
