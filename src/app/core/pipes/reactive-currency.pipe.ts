import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Currency } from '../types/currency.enum';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { managementFeatureKey } from '../../management/state/management/management.reducers';
import { selectorCurrencySelected } from '../../management/state/management/management.selectors';
import { IManagementState } from '../../management/state/management/managementState.interface';

@Pipe({
    name: 'rcurrency',
    standalone: true, 
    //so we can import it in other modules directly
    //no need to import it in the module that declares it

    pure: false
    //to make it reactive, so it can subscribe to the store
})
export class ReactiveCurrencyPipe implements PipeTransform, OnDestroy {
    currentCurrency!: Currency;
    destroy$: Subject<void> = new Subject<void>(); //for unsubscribing
    vn2UsRate = 24000;
    constructor(private _store: Store) {
        this._store
            .select((state) =>
                selectorCurrencySelected(state as { [managementFeatureKey]: IManagementState })
            )
            .pipe(
                tap((currency) => (this.currentCurrency = currency)),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    transform(value: number | null, ...args: any[]) {
        if (value === null || value === undefined) return '';
        switch (this.currentCurrency) {
            case Currency.VND:
                return new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                }).format(value);
            case Currency.USD:
                value = value / this.vn2UsRate;
                return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }).format(value);
        }
    }
}
