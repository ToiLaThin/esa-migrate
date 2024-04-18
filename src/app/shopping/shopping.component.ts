import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { selectorLanguageSelected } from "../management/state/management/management.selectors";
import { managementFeatureKey } from './../management/state/management/management.reducers';
import { IManagementState } from "../management/state/management/managementState.interface";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: 'esa-shopping',
    templateUrl: './shopping.component.html',
    styleUrls: ['./shopping.component.scss']

})
export class ShoppingComponent implements OnInit, OnDestroy {
    selectedLang!: 'en' | 'vi';
    destroy$: Subject<void> = new Subject<void>();
    constructor(private _translationService: TranslateService, private _store: Store) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    
    ngOnInit(): void {
        //for lazy load workaround
        // const currentLang = this._translationService.currentLang;
        // this._translationService.currentLang = '';
        // this._translationService.use(currentLang);
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
}