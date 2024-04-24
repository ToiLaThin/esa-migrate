import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectorNavigationLeftOpened, selectorTopbarOpened } from './state/management/management.selectors';
import { managementFeatureKey } from './state/management/management.reducers';
import { IManagementState } from './state/management/managementState.interface';
import { managementActions } from './state/management/management.actions';
import { productCatalogManagementActions } from './state/product-catalog-management/product-catalog-management.actions';

@Component({
    selector: 'esa-management',
    templateUrl: './management.component.html'
})
export class ManagementComponent implements OnInit {
    managementViewMode: 'navbar' | 'sidebar' = 'navbar';
    navigationLeftOpened$!: Observable<boolean>;
    topbarOpened$!: Observable<boolean>;

    timer!: any;
    constructor(private _store: Store) {}

    ngOnInit(): void {
        this._store.dispatch(productCatalogManagementActions.loadAllCatalogs());
        this.navigationLeftOpened$ = this._store.select((state) =>
            selectorNavigationLeftOpened(state as { [managementFeatureKey]: IManagementState })
        );

        this.topbarOpened$ = this._store.select((state) =>
            selectorTopbarOpened(state as { [managementFeatureKey]: IManagementState })
        );
    }

    toggleTopbar() {        
        this.timer = setTimeout(() => {
            this._store.dispatch(managementActions.toggleTopbar());
        }, 5000);
    }
    
    interruptToggleTopvar() {
        //if mouse leave before dispatch toggleTopbar, clear timer
        clearTimeout(this.timer);
    }

    toggleViewMode() {
        this.managementViewMode = this.managementViewMode === 'navbar' ? 'sidebar' : 'navbar';
    }
}
