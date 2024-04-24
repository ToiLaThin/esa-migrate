import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { managementFeatureKey } from '../../state/management/management.reducers';
import { IManagementState } from '../../state/management/managementState.interface';
import {
    selectorSidebarFixed,
    selectorSidebarMode,
    selectorSidebarOpened
} from '../../state/management/management.selectors';
import { managementActions } from '../../state/management/management.actions';
import { SidebarMode } from '../../../core/types/sidebar-mode.enum';
import { OutlineSvgNames } from '../../../share-components/svg-definitions/outline-svg-names.enum';

@Component({
    selector: 'esa-management-layout',
    templateUrl: './management-layout.component.html',
    styleUrls: ['./management-layout.component.scss']
})
export class ManagementLayoutComponent implements OnInit {
    sidebarOpened$!: Observable<boolean>;
    sidebarMode$!: Observable<SidebarMode>;
    sidebarFixed$!: Observable<boolean>;

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
    constructor(private _store: Store) {}

    ngOnInit(): void {
        this.sidebarOpened$ = this._store.select((state) =>
        selectorSidebarOpened(state as { [managementFeatureKey]: IManagementState })
        );
        this.sidebarMode$ = this._store.select((state) =>
            selectorSidebarMode(state as { [managementFeatureKey]: IManagementState })
        );
        this.sidebarFixed$ = this._store.select((state) =>
            selectorSidebarFixed(state as { [managementFeatureKey]: IManagementState })
        );
    }

    toggleSidebar() {
        this._store.dispatch(managementActions.toggleSidebar());
    }
}
