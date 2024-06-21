import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { selectorLanguageSelected, selectorNavigationLeftOpened, selectorTopbarOpened } from './state/management/management.selectors';
import { managementFeatureKey } from './state/management/management.reducers';
import { IManagementState } from './state/management/managementState.interface';
import { managementActions } from './state/management/management.actions';
import { productCatalogManagementActions } from './state/product-catalog-management/product-catalog-management.actions';
import { IUserInfo } from '../core/models/account.interface';
import { authFeatureKey } from '../auth/state/auth.reducers';
import { selectorUserInfo } from '../auth/state/auth.selectors';
import { IAuthState } from '../auth/state/authState.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'esa-management',
    templateUrl: './management.component.html'
})
export class ManagementComponent implements OnInit, OnDestroy {
    managementViewMode: 'navbar' | 'sidebar' = 'navbar';
    navigationLeftOpened$!: Observable<boolean>;
    topbarOpened$!: Observable<boolean>;
    userInfo!: IUserInfo | null;
    selectedLang!: 'en' | 'vi';

    timer!: any;
    destroy$ = new Subject<void>();
    constructor(private _translationService: TranslateService, private _store: Store) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnInit(): void {
        this._store.dispatch(productCatalogManagementActions.loadAllCatalogs());
        this.navigationLeftOpened$ = this._store.select((state) =>
            selectorNavigationLeftOpened(state as { [managementFeatureKey]: IManagementState })
        );
        this._store.select(state => selectorUserInfo(state as {[authFeatureKey]: IAuthState})).pipe(
            takeUntil(this.destroy$),
            tap(uInfo => {
                this.userInfo = uInfo;
            })
        ).subscribe();
        this.topbarOpened$ = this._store.select((state) =>
            selectorTopbarOpened(state as { [managementFeatureKey]: IManagementState })
        );

        this._store.select((state) => 
            selectorLanguageSelected(state as { [managementFeatureKey]: IManagementState })
        ).pipe(
            takeUntil(this.destroy$)
        ).subscribe((newLanguage) => {
            this.selectedLang = newLanguage;
            console.log("newLanguage in lazy load module", this.selectedLang);
            this._translationService.use(newLanguage);
        })
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

    changeMangementViewMode(newManagementViewMode: 'navbar' | 'sidebar') {
        this.managementViewMode = newManagementViewMode;
    }
}
