import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { managementActions } from '../../state/management/management.actions';
import { SidebarMode } from '../../../core/types/sidebar-mode.enum';
import { Observable } from 'rxjs';
import {
    selectorSidebarMode,
    selectorTopbarOpened
} from '../../state/management/management.selectors';
import { IManagementState } from '../../state/management/managementState.interface';
import { managementFeatureKey } from '../../state/management/management.reducers';
import { OutlineSvgNames } from '../../../share-components/svg-definitions/outline-svg-names.enum';
import { ColorSvgNames } from '../../../share-components/svg-definitions/color-svg-names.enum';

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

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
    
    get ColorSvgNames() {
        return ColorSvgNames;
    }
    topbarOpened$!: Observable<boolean>;

    constructor(private _store: Store) {
        this.sidebarMode$ = this._store.select((state) =>
            selectorSidebarMode(state as { [managementFeatureKey]: IManagementState })
        );
        this.topbarOpened$ = this._store.select((state) =>
            selectorTopbarOpened(state as { [managementFeatureKey]: IManagementState })
        );
    }

    toggleTopbar() {
        this._store.dispatch(managementActions.toggleTopbar());
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
