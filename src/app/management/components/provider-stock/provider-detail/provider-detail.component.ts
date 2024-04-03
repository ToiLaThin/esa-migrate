import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IProviderRequirement } from '../../../../core/models/provider.interface';
import { selectorSelectedProviderRequirement } from '../../../state/provider-stock/provider-stock.selectors';
import { providerStockManagementFeatureKey } from '../../../state/provider-stock/provider-stock.reducers';
import { IProviderStockManagementState } from '../../../state/provider-stock/providerStockManageState.interface';

@Component({
    selector: 'esa-management-provider-detail',
    templateUrl: './provider-detail.component.html',
    styleUrls: ['./provider-detail.component.scss']
})
export class ProviderDetailManagementComponent implements OnInit, OnDestroy {
    selectedProviderRequirement$!: Observable<IProviderRequirement | null>;
    sub!: Subscription
    constructor(private _store: Store) {}
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit() {
        this.selectedProviderRequirement$ = this._store.select((state) =>
            selectorSelectedProviderRequirement(
                state as { [providerStockManagementFeatureKey]: IProviderStockManagementState }
            )
        );

        this.sub = this.selectedProviderRequirement$.subscribe((selectedProviderRequirement) => {
            console.log('Selected provider requirement: ', selectedProviderRequirement);
        });
    }

    increaseQty() {
        const qtyInput = document.getElementById('qtyInput') as HTMLInputElement;
        qtyInput.stepUp();
    }

    decreaseQty() {
        const qtyInput = document.getElementById('qtyInput') as HTMLInputElement;
        qtyInput.stepDown();
    }
    
}
