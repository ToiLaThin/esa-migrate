import { createSelector } from '@ngrx/store';
import { IProduct } from '../../../core/models/product.interface';
import { managementFeatureKey } from './management.reducers';
import { IManagementState } from './managementState.interface';

export const selectorManagementFeature = (state: { [managementFeatureKey]: IManagementState }) =>
    state[managementFeatureKey];

export const selectorProductLazyLoadRequestManagement = createSelector(
    selectorManagementFeature,
    (managementState) => managementState.productLazyLoadRequest
);

export const selectorProductSelectedManagement = (productId: string) =>
    createSelector(selectorManagementFeature, (managementState: IManagementState) => {
        return managementState.paginatedProducts.products.find(
            (product) => product.productId == productId
        ) as IProduct;
    });

export const selectorDisplayingProductsManagement = createSelector(
    selectorManagementFeature,
    (managementState) => managementState.paginatedProducts.products
);
export const selectorPageCountManagement = createSelector(
    selectorManagementFeature,
    (managementState) => managementState.paginatedProducts.pageCount
);
export const selectorDisplayingProductsCount = createSelector(
    selectorManagementFeature,
    (managementState) => managementState.paginatedProducts.products.length
);

export const selectorAllCatalogs = createSelector(
    selectorManagementFeature,
    (managementState) => managementState.allCatalogs
);
export const selectorSelectedSubCatalogs = createSelector(
    selectorManagementFeature,
    (managementState) => managementState.subCatalogsOfSelectedCatalog
);
