import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import {
    IProductModelInfoMergeStockItemRequest,
    IProviderRequirement
} from '../../../../core/models/provider.interface';
import { OutlineSvgNames } from '../../../../share-components/svg-definitions/outline-svg-names.enum';
import { providerStockManagementActions } from '../../../state/provider-stock/provider-stock.actions';
import { providerStockManagementFeatureKey } from '../../../state/provider-stock/provider-stock.reducers';
import {
    selectorGrandTotalPriceStockItemRequests,
    selectorProductModelsInfoMergeStockItemRequestsDisplaying
} from '../../../state/provider-stock/provider-stock.selectors';
import { IProviderStockManagementState } from '../../../state/provider-stock/providerStockManageState.interface';

@Component({
    selector: 'esa-management-add-stock',
    templateUrl: './add-stock.component.html',
    styleUrls: ['./add-stock.component.scss']
})
export class AddStockManagementComponent implements OnInit, OnDestroy {
    selectedRequestRequireProductModelInfosMergeStockItemReqs$!: Observable<
        IProductModelInfoMergeStockItemRequest[] | null
    >;
    grandTotalPriceStockItemRequests$!: Observable<number>;

    selectedProviderRequirementId!: string;

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }

    constructor(private _store: Store) {
        this._store.dispatch(
            providerStockManagementActions.loadAllRequestRequireProductModelsWithStockSub()
        );
    }

    ngOnDestroy(): void {}

    ngOnInit() {
        this.selectedRequestRequireProductModelInfosMergeStockItemReqs$ = this._store.select(
            (state) =>
                selectorProductModelsInfoMergeStockItemRequestsDisplaying(
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
                productModelId: productModelId,
                quantityChange: 1
            })
        );
    }

    decreaseQty(productModelId: string) {
        this._store.dispatch(
            providerStockManagementActions.decreaseStockRequestQuantity({
                productModelId: productModelId,
                quantityChange: 1
            })
        );
    }

    //TODO confirm will need another action without requiring provider since we request from multiple provider
    confirmStockRequestToProvider() {
        this._store.dispatch(providerStockManagementActions.confirmStockRequestToProvider());
    }

    clearAllStockRequestsRequireRequest() {
        this._store.dispatch(providerStockManagementActions.clearAllStockRequestsRequireRequest());
    }
}
