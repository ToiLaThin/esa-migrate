import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { managementActions } from '../state/management/management.actions';

@Component({
    selector: 'esa-management-topbar',
    templateUrl: './management-topbar.component.html',
    styleUrls: ['./management-topbar.component.scss']
})
export class ManagementTopbarComponent {
    constructor(private _store: Store) {}

    toggleSidebarFixed() {
        this._store.dispatch(managementActions.toggleSidebarFixedPosition());
    }

    toggleNavigationLeft() {
        this._store.dispatch(managementActions.toggleNavigationLeft());
    }
}
