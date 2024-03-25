import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { managementActions } from '../state/management/management.actions';
import { SidebarMode } from '../../core/types/sidebar-mode.enum';
import { Observable } from 'rxjs';
import { selectorSidebarMode } from '../state/management/management.selectors';
import { IManagementState } from '../state/management/managementState.interface';
import { managementFeatureKey } from '../state/management/management.reducers';

@Component({
    selector: 'esa-management-navigation',
    templateUrl: './management-navigation.component.html',
    styleUrls: ['./management-navigation.component.scss']
})
export class ManagementNavigationComponent {
    sidebarMode$!: Observable<SidebarMode>;
    get SidebarMode() {
        return SidebarMode;
    }
    constructor(private _store: Store) {
        this.sidebarMode$ = this._store.select((state) =>
            selectorSidebarMode(state as { [managementFeatureKey]: IManagementState })
        );
    }

    toggleSideBar() {
        this._store.dispatch(managementActions.toggleSidebar());
    }

    switchSidebarPush() {
        this._store.dispatch(
            managementActions.switchModeSidebar({
                newSidebarMode: SidebarMode.PUSH
            })
        );
    }
    switchSidebarOver() {
        this._store.dispatch(
            managementActions.switchModeSidebar({
                newSidebarMode: SidebarMode.OVER
            })
        );
    }
}
