import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProviderService } from '../../../core/services/provider.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { providerStockManagementActions } from './provider-stock.actions';
import { switchMap, map, tap, catchError, of } from 'rxjs';
import { Store } from '@ngrx/store';
import {
    IProductModelInfoMergeStockItemRequest,
    IProviderRequirement,
    IStockItemRequest,
    IStockRequestTransaction
} from '../../../core/models/provider.interface';
import {
    selectorSelectedProviderRequirement,
    selectorProductModelsInfoMergeStockItemRequestsOfProvider
} from './provider-stock.selectors';
import { providerStockManagementFeatureKey } from './provider-stock.reducers';
import { IProviderStockManagementState } from './providerStockManageState.interface';

@Injectable({ providedIn: 'root' })
export class ProviderStockManagementEffects {
    constructor(
        private actions$: Actions,
        private _store: Store,
        private _providerService: ProviderService,
        private _notificationService: NzNotificationService
    ) {}

    loadAllProviderRequirementsEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(providerStockManagementActions.loadAllProviderRequirements),
            switchMap((action) =>
                this._providerService.getAllProviderRequirements().pipe(
                    map((allProviderRequirements) =>
                        providerStockManagementActions.loadAllProviderRequirementsSuccess({
                            loadedProviderRequirements: allProviderRequirements
                        })
                    ),
                    tap(() =>
                        this._notificationService.create(
                            'success',
                            'All provider requirements loaded successfully',
                            ''
                        )
                    ),
                    catchError((err) => {
                        this._notificationService.create('error', `Error: ${err.title}`, '');
                        return of(
                            providerStockManagementActions.loadAllProviderRequirementsFailed({
                                error: err
                            })
                        );
                    })
                )
            )
        )
    );

    selectProviderRequirementEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(providerStockManagementActions.selectProviderRequirement),
            switchMap((action) => {
                let selectedProviderRequirement: IProviderRequirement | null = null;
                let allProviderRequirementsSubscription = this._store
                    .select((state) =>
                        selectorSelectedProviderRequirement(
                            state as {
                                [providerStockManagementFeatureKey]: IProviderStockManagementState;
                            }
                        )
                    )
                    .pipe(
                        tap(
                            (fromStoreProviderRequirement) =>
                                (selectedProviderRequirement = fromStoreProviderRequirement)
                        )
                    )
                    .subscribe();
                allProviderRequirementsSubscription.unsubscribe();

                //get the selected provider req from store then get the product models with stock of that provider
                //then transform the product models with stock to product model merge stock item request
                //then dispatch the success action with those 2 info
                return this._providerService
                    .getProductModelInfosWithStockOfProvider(selectedProviderRequirement!)
                    .pipe(
                        map((productModelInfosWithStock) => {
                            let allProductModelInfoMergeStockItemReqs =
                                productModelInfosWithStock.map((productModelInfoWithStock) => {
                                    let productModelInfoMergeStockItemReq = {
                                        productId: productModelInfoWithStock.productId,
                                        productModelId: productModelInfoWithStock.productModelId,
                                        businessKey: productModelInfoWithStock.businessKey,
                                        productModelName:
                                            productModelInfoWithStock.productModelName,
                                        productCoverImage:
                                            productModelInfoWithStock.productCoverImage,
                                        price: productModelInfoWithStock.price,
                                        currentQuantity: productModelInfoWithStock.currentQuantity, //current quantity we are having in stock, not the number we request
                                        unitRequestPrice:
                                            productModelInfoWithStock.unitRequestPrice,
                                        itemQuantity: 0, //the number we request
                                        totalItemRequestPrice: 0,
                                        afterRequestQuantity:
                                            productModelInfoWithStock.currentQuantity
                                    } as unknown as IProductModelInfoMergeStockItemRequest;
                                    return productModelInfoMergeStockItemReq;
                                });
                            return providerStockManagementActions.afterSelectLoadedProductModelsWithStockOfProviderAndTransformToProductModelMergeStockItemRequestSuccess(
                                {
                                    loadedProductModelsInfoWithStock: productModelInfosWithStock,
                                    transformedProductModelInfoMergeStockItemReqs:
                                        allProductModelInfoMergeStockItemReqs
                                }
                            );
                        }),
                        catchError((err) =>
                            of(
                                providerStockManagementActions.afterSelectLoadedProductModelsWithStockOfProviderAndTransformToProductModelMergeStockItemRequestFailed(
                                    { error: err }
                                )
                            )
                        )
                    );
            })
        )
    );

    confirmStockRequestToProviderEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(providerStockManagementActions.confirmStockRequestToProvider),
            switchMap((action) => {
                let selectedProviderRequirement: IProviderRequirement | null = null;
                let allProductModelInfoMergeStockItemRequest: IProductModelInfoMergeStockItemRequest[] =
                    [];
                let selectedProviderRequirementSubscription = this._store
                    .select((state) =>
                        selectorSelectedProviderRequirement(
                            state as {
                                [providerStockManagementFeatureKey]: IProviderStockManagementState;
                            }
                        )
                    )
                    .pipe(
                        tap(
                            (fromStoreProviderRequirement) =>
                                (selectedProviderRequirement = fromStoreProviderRequirement)
                        )
                    )
                    .subscribe();
                let allStockItemReqsSubscription = this._store
                    .select((state) =>
                        selectorProductModelsInfoMergeStockItemRequestsOfProvider(
                            state as {
                                [providerStockManagementFeatureKey]: IProviderStockManagementState;
                            }
                        )
                    )
                    .pipe(
                        tap(
                            (fromStoreAllProductModelInfoMergeStockItemRequest) =>
                                (allProductModelInfoMergeStockItemRequest =
                                    fromStoreAllProductModelInfoMergeStockItemRequest)
                        )
                    )
                    .subscribe();
                selectedProviderRequirementSubscription.unsubscribe();
                allStockItemReqsSubscription.unsubscribe();

                let allStockItemReqs = allProductModelInfoMergeStockItemRequest
                    .filter((mergedItem) => mergedItem.itemQuantity > 0)
                    .map((mergedItem) => {
                        let stockItemReq = {
                            productId: mergedItem.productId,
                            productModelId: mergedItem.productModelId,
                            businessKey: mergedItem.businessKey,
                            unitRequestPrice: mergedItem.unitRequestPrice,
                            itemQuantity: mergedItem.itemQuantity,
                            totalItemRequestPrice: mergedItem.totalItemRequestPrice
                        } as IStockItemRequest;
                        return stockItemReq;
                    });
                if (selectedProviderRequirement === undefined || allStockItemReqs === undefined) {
                    this._notificationService.create(
                        'error',
                        'Please select a provider requirement && request items',
                        ''
                    );
                    return of(
                        providerStockManagementActions.confirmStockRequestToProviderFailed({
                            error: 'Please select a provider requirement && request items'
                        })
                    );
                }
                let requestBody: IStockRequestTransaction = {
                    //stockRequestTransactionId is not needed to be supplied, it will be generated in db
                    providerRequirementId: selectedProviderRequirement!
                        .providerRequirementId as string,
                    providerBusinessKey: selectedProviderRequirement!.providerBusinessKey as string,
                    stockItemRequests: allStockItemReqs
                };
                console.log(requestBody); ///////debug
                return this._providerService.confirmStockRequestToProvider(requestBody).pipe(
                    map((_) =>
                        providerStockManagementActions.selectProviderRequirement({
                            providerRequirementId:
                                selectedProviderRequirement!.providerRequirementId
                        })
                    ),
                    tap(() => {
                        this._notificationService.create(
                            'success',
                            'Stock request confirmed successfully',
                            ''
                        );
                    }),
                    catchError((err) => {
                        this._notificationService.create('error', `Error: ${err.title}`, '');
                        return of(
                            providerStockManagementActions.confirmStockRequestToProviderFailed({
                                error: err
                            })
                        );
                    })
                );
            })
        )
    );
}
