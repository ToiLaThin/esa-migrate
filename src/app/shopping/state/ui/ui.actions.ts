import { createActionGroup, emptyProps } from "@ngrx/store";

export const uiShoppingActions = createActionGroup({
    source: 'UI Events In Shopping Module',
    events: {
        'Toggle Option Horizontal Expanded': emptyProps(),
        'Toggle Option Vertical Expanded': emptyProps()
    }
})