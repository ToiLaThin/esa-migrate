import { state } from '@angular/animations';
import { managementFeatureKey } from './management.reducers';
import { IManagementState } from './managementState.interface';
import { createSelector } from '@ngrx/store';

export const selectorManagementFeature = (state: { [managementFeatureKey]: IManagementState }) =>
    state[managementFeatureKey];

export const selectorSidebarToggled = createSelector(
    selectorManagementFeature,
    (managementState) => managementState.sideBarToggled
)
