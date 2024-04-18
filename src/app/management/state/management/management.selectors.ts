import { managementFeatureKey } from './management.reducers';
import { IManagementState } from './managementState.interface';
import { createSelector } from '@ngrx/store';

export const selectorManagementFeature = (state: { [managementFeatureKey]: IManagementState }) =>
    state[managementFeatureKey];

export const selectorSidebarOpened = createSelector(
    selectorManagementFeature,
    (managementState) => managementState.sidebarOpened
);

export const selectorSidebarMode = createSelector(
    selectorManagementFeature,
    (managementState) => managementState.sidebarMode
);

export const selectorSidebarFixed = createSelector(
    selectorManagementFeature,
    (managementState) => managementState.sidebarFixed
);

export const selectorNavigationLeftOpened = createSelector(
    selectorManagementFeature,
    (managementState) => managementState.navigationLeftOpened
);

export const selectorTopbarOpened = createSelector(
    selectorManagementFeature,
    (managementState) => managementState.topbarOpened
);

export const selectorCurrencySelected = createSelector(
    selectorManagementFeature,
    (managementState) => managementState.currency
);

export const selectorLanguageSelected = createSelector(
    selectorManagementFeature,
    (managementState) => managementState.language
);

export const selectorUserRewardPoints = createSelector(
    selectorManagementFeature,
    (managementState) => managementState.userRewardPoints?.rewardPoint
)