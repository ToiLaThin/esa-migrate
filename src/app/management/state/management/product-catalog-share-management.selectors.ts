import { createSelector } from '@ngrx/store';
import { IProduct } from '../../../core/models/product.interface';
import { managementFeatureKey } from './management.reducers';
import { IManagementState } from './managementState.interface';

export const selectManagementFeature = (state: { [managementFeatureKey]: IManagementState }) =>
    state[managementFeatureKey];

export const selectorProductLazyLoadRequestManagement = createSelector(
    selectManagementFeature,
    (managementState) => managementState.productLazyLoadRequest
);

export const selectorProductSelectedManagement = (productId: string) =>
    createSelector(selectManagementFeature, (managementState: IManagementState) => {
        return managementState.paginatedProducts.products.find(
            (product) => product.productId == productId
        ) as IProduct;
    });

export const selectorDisplayingProductsManagement = createSelector(
    selectManagementFeature,
    (managementState) => managementState.paginatedProducts.products
);
export const selectorPageCountManagement = createSelector(
    selectManagementFeature,
    (managementState) => managementState.paginatedProducts.pageCount
);
export const selectorDisplayingProductsCount = createSelector(
    selectManagementFeature,
    (managementState) => managementState.paginatedProducts.products.length
);

export const selectorAllCatalogs = createSelector(
    selectManagementFeature,
    (managementState) => managementState.allCatalogs
);
export const selectorSelectedSubCatalogs = createSelector(
    selectManagementFeature,
    (managementState) => managementState.subCatalogsOfSelectedCatalog
);

export const selectorSelectedPageNum = createSelector(
    selectManagementFeature,
    (managementState) => managementState.paginatedProducts.pageNumber
)

export const selectorCatalogSelectedId = createSelector(
    selectManagementFeature,
    (managementState) => managementState.catalogSelectedId
);

export const selectorSubCatalogSelectedIds = createSelector(
    selectManagementFeature,
    (managementState) => managementState.subCatalogSelectedIds
);