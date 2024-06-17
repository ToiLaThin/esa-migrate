import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { managementActions } from '../../state/management/management.actions';
import { OutlineSvgNames } from '../../../share-components/svg-definitions/outline-svg-names.enum';
import { AuthStatus } from '../../../core/types/auth-status.enum';
import { ThemeType } from '../../../core/ui-models/theme-type';
import { ColorSvgNames } from '../../../share-components/svg-definitions/color-svg-names.enum';
import { I18NLayoutIdSelector } from '../../../shopping/translate-ids/i18n-layout-id';
import { tap, takeUntil, Subject } from 'rxjs';
import { managementFeatureKey } from '../../state/management/management.reducers';
import { selectorCurrencySelected, selectorThemeSelected, selectorLanguageSelected } from '../../state/management/management.selectors';
import { IManagementState } from '../../state/management/managementState.interface';
import { Currency } from '../../../core/types/currency.enum';
import { currencyDatas } from '../../../core/ui-models/currency-data';

@Component({
    selector: 'esa-management-topbar',
    templateUrl: './management-topbar.component.html',
    styleUrls: ['./management-topbar.component.scss']
})
export class ManagementTopbarComponent implements OnInit, OnDestroy {
    @Input({required: true}) currentManagementViewMode: 'navbar' | 'sidebar' = 'navbar';
    @Output() managementViewModeChangedTo: EventEmitter<'navbar' | 'sidebar'> = new EventEmitter<'navbar' | 'sidebar'>();
    get AuthStatus() {
        return AuthStatus;
    } //for template to use enum

    get ColorSvgNames() {
        return ColorSvgNames;
    }

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
    get ThemeType() {
        return ThemeType;
    }

    get I18NLayoutIds() {
        return I18NLayoutIdSelector;
    }

    currentTheme!: ThemeType;
    selectedCurrency!: Currency;
    currencyDatas = currencyDatas;
    selectedLanguage!: string;
    destroy$: Subject<void> = new Subject<void>(); //for unsubscribing

    moreLayoutOptionTopbarExpanded: boolean = true;

    constructor(private _store: Store) {
        this._store
            .select((state) =>
                selectorCurrencySelected(state as { [managementFeatureKey]: IManagementState })
            )
            .pipe(
                tap((currency) => (this.selectedCurrency = currency)),
                takeUntil(this.destroy$)
            )
            .subscribe();

        this._store
            .select((state) =>
                selectorThemeSelected(state as { [managementFeatureKey]: IManagementState })
            )
            .pipe(
                tap((theme) => (this.currentTheme = theme)),
                takeUntil(this.destroy$)
            )
            .subscribe();

        this._store
            .select((state) =>
                selectorLanguageSelected(state as { [managementFeatureKey]: IManagementState })
            )
            .pipe(
                tap((language) => (this.selectedLanguage = language)),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    toggleSidebarFixed() {
        this._store.dispatch(managementActions.toggleSidebarFixedPosition());
    }

    toggleNavigationLeft() {
        this._store.dispatch(managementActions.toggleNavigationLeft());
    }

    toggleMoreLayoutOptionTopbar() {
        this.moreLayoutOptionTopbarExpanded = !this.moreLayoutOptionTopbarExpanded;
    }

    changeTheme(newTheme: ThemeType) {
        if (this.currentTheme !== newTheme) {
            this._store.dispatch(managementActions.changeTheme({ newTheme: newTheme }));
        }
    }

    changeCurrency(clickedCurrency: Currency) {
        console.log('currenCurrency', this.selectedCurrency);
        console.log('changeCurrency', clickedCurrency);
        if (this.selectedCurrency !== clickedCurrency) {
            this._store.dispatch(
                managementActions.changeCurrency({ newCurrency: clickedCurrency })
            );
        }
    }

    changeLanguage(language: 'vi' | 'en') {
        console.log('currentLanguage', this.selectedLanguage);
        console.log('changeLanguage', language);
        if (this.selectedLanguage !== language) {
            this._store.dispatch(managementActions.changeLanguage({ newLanguage: language }));
        }
    }

    changeManagementViewMode() {
        let newManagementViewMode: 'navbar' | 'sidebar' = this.currentManagementViewMode === 'navbar' ? 'sidebar' : 'navbar';
        this.managementViewModeChangedTo.emit(newManagementViewMode);
    }
}
