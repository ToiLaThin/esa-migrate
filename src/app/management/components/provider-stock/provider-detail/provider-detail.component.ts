import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import {
    IProductModelInfoMergeStockItemRequest,
    IProviderRequirement
} from '../../../../core/models/provider.interface';
import {
    selectorGrandTotalPriceStockItemRequests,
    selectorProductModelsInfoMergeStockItemRequestsDisplaying,
    selectorSelectedProviderRequirement
} from '../../../state/provider-stock/provider-stock.selectors';
import { providerStockManagementFeatureKey } from '../../../state/provider-stock/provider-stock.reducers';
import { IProviderStockManagementState } from '../../../state/provider-stock/providerStockManageState.interface';
import { providerStockManagementActions } from '../../../state/provider-stock/provider-stock.actions';
import { OutlineSvgNames } from '../../../../share-components/svg-definitions/outline-svg-names.enum';

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

    selectedProviderRequirementId!: string;
    qtyChange: string = '1'; //can only be 1, 50, 100

    providerInfoToggled: boolean = true;
    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
    constructor(private _store: Store) {}

    ngOnDestroy(): void {}

    ngOnInit() {
        this.selectedProviderRequirement$ = this._store.select((state) =>
            selectorSelectedProviderRequirement(
                state as { [providerStockManagementFeatureKey]: IProviderStockManagementState }
            )
        ).pipe(
            //not modifying the state so selectedProviderRequirement$ is still IProviderRequirement | null
            //THIS IS ONLY WORK because on template we DO USING async pipe for selectedProviderRequirement$
            //so the good way is still use Subscription.unsubscribe() in ngOnDestroy
            tap((selectedProviderRequirement) => {
                if (selectedProviderRequirement) {
                    this.selectedProviderRequirementId = selectedProviderRequirement.providerRequirementId;
                }
            })
        
        );
        this.selectedProviderRequirementAllProductModelInfosMergeStockItemRequests$ =
            this._store.select((state) =>
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
        console.log(this.qtyChange);
        console.log(typeof(this.qtyChange));
        
        this._store.dispatch(
            providerStockManagementActions.increaseStockRequestQuantity({
                productModelId: productModelId,
                quantityChange: parseInt(this.qtyChange)
            })
        );
    }

    decreaseQty(productModelId: string) {
        console.log(this.qtyChange);
        this._store.dispatch(
            providerStockManagementActions.decreaseStockRequestQuantity({
                productModelId: productModelId,
                quantityChange: parseInt(this.qtyChange)
            })
        );
    }

    confirmStockRequestToProvider() {
        this._store.dispatch(providerStockManagementActions.confirmStockRequestToProvider());
    }

    clearAllStockRequests() {
        this._store.dispatch(providerStockManagementActions.clearAllStockRequestsToProvider({selectingProviderRequirementId: this.selectedProviderRequirementId}));
    }

    toggleProviderInfo() {
        this.providerInfoToggled = !this.providerInfoToggled;
    }
}
