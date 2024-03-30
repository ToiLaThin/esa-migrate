import { createReducer, on } from "@ngrx/store";
import { IProductCatalogManagementState } from "./productCatalogManagementState.interface"
import { productCatalogManagementActions } from './product-catalog-management.actions';

export const productCatalogManagementFeatureKey = 'productCatalogManagementFeature';
export const initialProductCatalogManagementState: IProductCatalogManagementState = {
    allCatalogs: []
};

export const productCatalogManagementReducer = createReducer(
    initialProductCatalogManagementState,
    on(productCatalogManagementActions.loadAllCatalogsSuccess, (state, action) => {
        return {
            ...state,
            allCatalogs: action.loadedCatalogs
        }
    })
)