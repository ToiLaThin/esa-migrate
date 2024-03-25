import { createActionGroup, emptyProps } from "@ngrx/store";

export const managementActions = createActionGroup({
    source: 'Management Events in Management Module',
    events: {
        'Toggle Sidebar': emptyProps()
    }
})