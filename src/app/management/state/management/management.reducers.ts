import { createReducer, on } from '@ngrx/store';
import { IManagementState } from './managementState.interface';
import { managementActions } from './management.actions';
import { SidebarMode } from '../../../core/types/sidebar-mode.enum';

export const managementFeatureKey = 'managementFeature';
export const initialManagementState: IManagementState = {
    topbarOpened: true,
    navigationLeftOpened: true,
    sidebarOpened: false,
    sidebarMode: SidebarMode.PUSH,
    sidebarFixed: false
};
export const managementReducer = createReducer(
    initialManagementState,
    on(managementActions.toggleSidebar, (state, action) => {
        if (state.sidebarFixed === true) {
            return { 
                ...state, 
                sidebarOpened: false
            };
        }
        return {
            ...state,
            sidebarOpened: !state.sidebarOpened
        };
    }),
    on(managementActions.switchModeSidebar, (state, action) => {
        if (state.sidebarFixed === true) {
            return {
                ...state,
                sidebarMode: SidebarMode.PUSH
            }    
        }
        return {
            ...state,
            sidebarMode: action.newSidebarMode
        }
    }),
    on(managementActions.toggleSidebarFixedPosition, (state, action) => {
        if (state.navigationLeftOpened == false) {
            return { ...state }
        }

        if (state.sidebarFixed === true) {
            return {
                ...state,
                sidebarFixed: false
            };
        }
        return {
            ...state,
            sidebarFixed: true,
            sidebarMode: SidebarMode.PUSH,
            sidebarOpened: true //later if we add the toggle, we can put this to false, the resizer will be display so user will know they now can toggle the sidebar
        };
    }),
    on(managementActions.toggleNavigationLeft, (state, action) => {
        return {
            ...initialManagementState,
            navigationLeftOpened: !state.navigationLeftOpened
        }
    }),
    on(managementActions.toggleTopbar, (state, action) => ({
        ...state,
        topbarOpened: !state.topbarOpened
    }))
);
