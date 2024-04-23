import { createReducer, on } from "@ngrx/store";
import { IUIState } from "./uiState.inteface";
import { uiShoppingActions } from "./ui.actions";

export const initialUIState: IUIState = {
    optionHorizontalExpanded: false,
    optionVerticalExpanded: false
}

export const uiShoppingFeatureKey = 'uiShoppingFeature';
export const uiShoppingReducer = createReducer(
    initialUIState,
    on(uiShoppingActions.toggleOptionHorizontalExpanded, (state, _) => {
        return {
            ...state,
            optionHorizontalExpanded: !state.optionHorizontalExpanded
        }
    })
)