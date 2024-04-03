import { createReducer, on } from '@ngrx/store';
import { IProviderStockManagementState } from './providerStockManageState.interface';
import { providerStockManagementActions } from './provider-stock.actions';

export const providerStockManagementFeatureKey = 'providerStockManagementFeature';
export const initialProviderStockManagementState: IProviderStockManagementState = {
    allProviderRequirements: [],
    selectedProviderRequirement: null
};

export const providerStockManagementReducer = createReducer(
    initialProviderStockManagementState,
    on(providerStockManagementActions.loadAllProviderRequirementsSuccess, (state, action) => {
        return {
            ...state,
            allProviderRequirements: action.loadedProviderRequirements
        };
    }),
    on(providerStockManagementActions.selectProviderRequirement, (state, action) => {
        return {
            ...state,
            selectedProviderRequirement:
                state.allProviderRequirements.find(
                    (providerRequirement) =>
                        providerRequirement.providerRequirementId === action.providerRequirementId
                ) || null
        };
    })
);
