import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { managementActions } from '../state/management/management.actions';

@Component({
    selector: 'esa-management-navigation',
    templateUrl: './management-navigation.component.html',
    styleUrls: ['./management-navigation.component.scss']
})
export class ManagementNavigationComponent {
    constructor(private _store: Store) {}

    toggleSideBar() {
        this._store.dispatch(managementActions.toggleSidebar());
    }
}
