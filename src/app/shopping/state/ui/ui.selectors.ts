import { createSelector } from '@ngrx/store';
import { uiShoppingFeatureKey } from './ui.reducers';
import { IUIState } from './uiState.inteface';

export const selectUIShoppingFeature = (state: { [uiShoppingFeatureKey]: IUIState }) =>
    state[uiShoppingFeatureKey];

export const selectorHorizontalOptionExpanded = createSelector(
    selectUIShoppingFeature,
    (uiState) => uiState.optionHorizontalExpanded
);
