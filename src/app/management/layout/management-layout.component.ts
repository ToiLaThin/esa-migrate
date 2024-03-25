import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { managementFeatureKey } from '../state/management/management.reducers';
import { IManagementState } from '../state/management/managementState.interface';
import {
    selectorSidebarMode,
    selectorSidebarToggled
} from '../state/management/management.selectors';
import { managementActions } from '../state/management/management.actions';
import { SidebarMode } from '../../core/types/sidebar-mode.enum';

@Component({
    selector: 'esa-management-layout',
    templateUrl: './management-layout.component.html',
    styleUrls: ['./management-layout.component.scss']
})
export class ManagementLayoutComponent implements OnInit {
    sidebarToggled$!: Observable<boolean>;
    sidebarMode$!: Observable<SidebarMode>;
    constructor(private _store: Store) {}

    ngOnInit(): void {
        this.sidebarToggled$ = this._store.select((state) =>
            selectorSidebarToggled(state as { [managementFeatureKey]: IManagementState })
        );
        this.sidebarMode$ = this._store.select((state) =>
            selectorSidebarMode(state as { [managementFeatureKey]: IManagementState })
        );
    }

    toggleSidebar() {
        this._store.dispatch(managementActions.toggleSidebar());
    }
}
