import { createActionGroup, emptyProps } from "@ngrx/store";

export const tourActions = createActionGroup({
    source: 'Tour Events In Shopping Module',
    events: {
        'Start NavBar Tour': emptyProps(),
        'End NavBar Tour': emptyProps(),
        'Start Product Tour': emptyProps(),
        'End Product Tour': emptyProps(),
        'Start Cart Tour': emptyProps(),
        'End Cart Tour': emptyProps(),
        'Start Order Tour': emptyProps(),
        'End Order Tour': emptyProps(),
    }
})