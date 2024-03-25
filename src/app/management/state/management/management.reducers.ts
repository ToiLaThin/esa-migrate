import { createReducer, on } from "@ngrx/store";
import { IManagementState } from "./managementState.interface";
import { managementActions } from "./management.actions";

export const managementFeatureKey = 'managementFeature';
export const initialManagementState: IManagementState = {
    sideBarToggled: false
}
export const managementReducer = createReducer(
    initialManagementState,
    on(managementActions.toggleSidebar, (state, action) => ({
        ...state,
        sideBarToggled: !state.sideBarToggled
    })
));