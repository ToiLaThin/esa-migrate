import { createFeature, createFeatureSelector, createSelector } from '@ngrx/store';
import { providerStockManagementFeatureKey } from './provider-stock.reducers';
import { IProviderStockManagementState } from './providerStockManageState.interface';
import { IManagementState } from '../management/managementState.interface';
import { managementFeatureKey } from '../management/management.reducers';
import { ICatalog } from '../../../core/models/catalog.interface';
import { IProviderRequirement, IProviderRequirementWithCatalogsAggregate } from '../../../core/models/provider.interface';

export const selectProviderStockManagementFeature = (state: {
    [providerStockManagementFeatureKey]: IProviderStockManagementState;
}) => state[providerStockManagementFeatureKey];

export const selectorAllProviderRequirements = createSelector(
    selectProviderStockManagementFeature,
    (state) => state.allProviderRequirements
);

const selectLocalProviderStockManagementFeature = createFeatureSelector<IProviderStockManagementState>(providerStockManagementFeatureKey);
const selectLocalManagementFeature = createFeatureSelector<IManagementState>(managementFeatureKey);

export const selectorAllProviderRequirementsWithCatalogs = createSelector(
    selectLocalProviderStockManagementFeature,
    selectLocalManagementFeature,
    (providerStockState, managementState) => {
        const allProviderRequirements: IProviderRequirement[] = providerStockState.allProviderRequirements;
        const allCatalogs: ICatalog[] = managementState.allCatalogs;
        return allProviderRequirements.map((providerRequirement) => {
            const availableProviderCatalogs = allCatalogs.filter((catalog) =>
                providerRequirement.availableProviderCatalogIds.includes(catalog.catalogId!)
            );
            return { providerRequirement, availableProviderCatalogs } as unknown as IProviderRequirementWithCatalogsAggregate;
        });
    }
);    

export const selectorSelectedProviderRequirement = createSelector(
    selectProviderStockManagementFeature,
    (state) => state.selectedProviderRequirement
);