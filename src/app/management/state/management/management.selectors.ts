import { state } from '@angular/animations';
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
