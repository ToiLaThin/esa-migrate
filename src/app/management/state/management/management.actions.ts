import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { SidebarMode } from "../../../core/types/sidebar-mode.enum";

export const managementActions = createActionGroup({
    source: 'Management Events in Management Module',
    events: {
        'Toggle Sidebar': emptyProps(),
        'Toggle Topbar': emptyProps(),
        'Toggle Sidebar Fixed Position': emptyProps(),
        'Switch mode Sidebar': props<{ newSidebarMode: SidebarMode}>(),
        'Toggle Navigation Left': emptyProps(),
    }
})