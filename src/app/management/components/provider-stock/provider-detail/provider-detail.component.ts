import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
    IProductModelInfoMergeStockItemRequest,
    IProviderRequirement
} from '../../../../core/models/provider.interface';
import {
    selectorGrandTotalPriceStockItemRequests,
    selectorProductModelsInfoMergeStockItemRequestsOfProvider,
    selectorSelectedProviderRequirement
} from '../../../state/provider-stock/provider-stock.selectors';
import { providerStockManagementFeatureKey } from '../../../state/provider-stock/provider-stock.reducers';
import { IProviderStockManagementState } from '../../../state/provider-stock/providerStockManageState.interface';
import { providerStockManagementActions } from '../../../state/provider-stock/provider-stock.actions';

@Component({
    selector: 'esa-management-provider-detail',
    templateUrl: './provider-detail.component.html',
    styleUrls: ['./provider-detail.component.scss']
})
export class ProviderDetailManagementComponent implements OnInit, OnDestroy {
    selectedProviderRequirementAllProductModelInfosMergeStockItemRequests$!: Observable<
        IProductModelInfoMergeStockItemRequest[] | null
    >;
    selectedProviderRequirement$!: Observable<IProviderRequirement | null>;
    grandTotalPriceStockItemRequests$!: Observable<number>;

    constructor(private _store: Store) {}

    ngOnDestroy(): void {}

    ngOnInit() {
        this.selectedProviderRequirement$ = this._store.select((state) =>
            selectorSelectedProviderRequirement(
                state as { [providerStockManagementFeatureKey]: IProviderStockManagementState }
            )
        );
        this.selectedProviderRequirementAllProductModelInfosMergeStockItemRequests$ =
            this._store.select((state) =>
                selectorProductModelsInfoMergeStockItemRequestsOfProvider(
                    state as { [providerStockManagementFeatureKey]: IProviderStockManagementState }
                )
            );

        this.grandTotalPriceStockItemRequests$ = this._store.select((state) =>
            selectorGrandTotalPriceStockItemRequests(
                state as { [providerStockManagementFeatureKey]: IProviderStockManagementState }
            )
        );
    }

    increaseQty(productModelId: string) {
        this._store.dispatch(
            providerStockManagementActions.increaseStockRequestQuantity({
                productModelId: productModelId
            })
        );
    }

    decreaseQty(productModelId: string) {
        this._store.dispatch(
            providerStockManagementActions.decreaseStockRequestQuantity({
                productModelId: productModelId
            })
        );
    }

    confirmStockRequestToProvider() {
        this._store.dispatch(providerStockManagementActions.confirmStockRequestToProvider());
    }
}
