import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { managementActions } from '../state/management/management.actions';
import { OutlineSvgNames } from '../../share-components/svg-definitions/outline-svg-names.enum';

@Component({
    selector: 'esa-management-topbar',
    templateUrl: './management-topbar.component.html',
    styleUrls: ['./management-topbar.component.scss']
})
export class ManagementTopbarComponent {
    constructor(private _store: Store) {}

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
    
    toggleSidebarFixed() {
        this._store.dispatch(managementActions.toggleSidebarFixedPosition());
    }

    toggleNavigationLeft() {
        this._store.dispatch(managementActions.toggleNavigationLeft());
    }
}
