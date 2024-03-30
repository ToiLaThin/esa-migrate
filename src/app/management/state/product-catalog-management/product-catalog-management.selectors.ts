import { createSelector } from '@ngrx/store';
import { productCatalogManagementFeatureKey } from './product-catalog-management.reducers';
import { IProductCatalogManagementState } from './productCatalogManagementState.interface';

export const selectProductCatalogManagementFeature = (state: {
    [productCatalogManagementFeatureKey]: IProductCatalogManagementState;
}) => state[productCatalogManagementFeatureKey];

export const selectorAllCatalogs = createSelector(
    selectProductCatalogManagementFeature,
    (state) => state.allCatalogs
);
