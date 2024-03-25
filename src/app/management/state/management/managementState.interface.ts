import { SidebarMode } from "../../../core/types/sidebar-mode.enum";

export interface IManagementState {
    topbarOpened: boolean,
    navigationLeftOpened: boolean, //when nav left is closed, no action can be performed except toggle nav left
    sidebarOpened: boolean,
    sidebarFixed: boolean, //when sidebarfixed it will also be toggled
    sidebarMode: SidebarMode
}