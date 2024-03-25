import { createReducer, on } from '@ngrx/store';
import { IManagementState } from './managementState.interface';
import { managementActions } from './management.actions';
import { SidebarMode } from '../../../core/types/sidebar-mode.enum';

export const managementFeatureKey = 'managementFeature';
export const initialManagementState: IManagementState = {
    sidebarToggled: false,
    sidebarMode: SidebarMode.PUSH
};
export const managementReducer = createReducer(
    initialManagementState,
    on(managementActions.toggleSidebar, (state, action) => ({
        ...state,
        sidebarToggled: !state.sidebarToggled
    })),
    on(managementActions.switchModeSidebar, (state, action) => ({
        ...state,
        sidebarMode: action.newSidebarMode
    }))
);
