import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThemeType } from '../../core/ui-models/theme-type';
import { Observable } from 'rxjs';
import { selectorThemeSelected } from '../../management/state/management/management.selectors';
import { managementFeatureKey } from '../../management/state/management/management.reducers';
import { IManagementState } from '../../management/state/management/managementState.interface';

@Component({
    selector: 'esa-loader-spinner',
    templateUrl: './loader-spinner.component.html',
    styleUrls: ['./loader-spinner.component.scss']
})
export class LoaderSpinnerComponent implements OnInit {
    @Input({required: true}) isLoading!: boolean
    @Input({required: true}) isFullPage!: boolean
    currentTheme$!: Observable<ThemeType>;
    get ThemeType() {
        return ThemeType;
    }
    constructor(private _store: Store) {
        this.currentTheme$ = this._store.select((state) =>
            selectorThemeSelected(state as { [managementFeatureKey]: IManagementState })
        );
    }

    ngOnInit(): void {}
}
