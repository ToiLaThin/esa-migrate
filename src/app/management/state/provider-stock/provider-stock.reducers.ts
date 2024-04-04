import { createReducer, on } from '@ngrx/store';
import { IProviderStockManagementState } from './providerStockManageState.interface';
import { providerStockManagementActions } from './provider-stock.actions';

export const providerStockManagementFeatureKey = 'providerStockManagementFeature';
export const initialProviderStockManagementState: IProviderStockManagementState = {
    allProviderRequirements: [],
    selectedProviderRequirement: null,
    allSelectedProviderProductModelInfosWithStockSub: [],
    allProductModelInfoMergeStockItemReqs: []
};

export const providerStockManagementReducer = createReducer(
    initialProviderStockManagementState,
    on(providerStockManagementActions.loadAllProviderRequirementsSuccess, (state, action) => {
        return {
            ...state,
            allProviderRequirements: action.loadedProviderRequirements
        };
    }),
    on(providerStockManagementActions.selectProviderRequirement, (state, action) => {
        return {
            ...state,
            selectedProviderRequirement:
                state.allProviderRequirements.find(
                    (providerRequirement) =>
                        providerRequirement.providerRequirementId === action.providerRequirementId
                ) || null
        };
    }),
    on(
        providerStockManagementActions.afterSelectLoadedProductModelsWithStockOfProviderAndTransformToProductModelMergeStockItemRequestSuccess,
        (state, action) => ({
            ...state,
            allSelectedProviderProductModelInfosWithStockSub:
                action.loadedProductModelsInfoWithStock,
            allProductModelInfoMergeStockItemReqs:
                action.transformedProductModelInfoMergeStockItemReqs
        })
    ),
    on(providerStockManagementActions.decreaseStockRequestQuantity, (state, action) => {
        if (state.allProductModelInfoMergeStockItemReqs.length === 0 || state.allProductModelInfoMergeStockItemReqs === null) {
            return state;
        }
        let mergedItem = state.allProductModelInfoMergeStockItemReqs.filter((mergedItem) => mergedItem.productModelId === action.productModelId);
        if (mergedItem.length !== 1) { 
            alert("Product model id is duplicate") 
            return state;
        }
        if (mergedItem[0].itemQuantity === 0) {
            alert("Quantity is already 0");            
            return state;
        }
        console.log("Quantity before decrease:", mergedItem[0].itemQuantity);
        console.log("Quantity after decrease:", mergedItem[0].itemQuantity - 1);
        return {
            ...state,
            allProductModelInfoMergeStockItemReqs: state.allProductModelInfoMergeStockItemReqs.map((item) => {
                if (item.productModelId === action.productModelId) {
                    return {
                        ...item,
                        itemQuantity: item.itemQuantity - 1,
                        totalItemRequestPrice: item.unitRequestPrice * (item.itemQuantity - 1),
                        afterRequestQuantity: item.currentQuantity + (item.itemQuantity - 1)
                    };
                }
                return item;
            })
        };
    }),

    on(providerStockManagementActions.increaseStockRequestQuantity, (state, action) => {
        if (state.allProductModelInfoMergeStockItemReqs.length === 0 || state.allProductModelInfoMergeStockItemReqs === null) {
            return state;
        }
        let mergedItem = state.allProductModelInfoMergeStockItemReqs.filter((mergedItem) => mergedItem.productModelId === action.productModelId);
        if (mergedItem.length !== 1) { 
            alert("Product model id is duplicate") 
            return state;
        }
        console.log("Quantity before increase:", mergedItem[0].itemQuantity);
        console.log("Quantity after increase:", mergedItem[0].itemQuantity - 1);
        return {
            ...state,
            allProductModelInfoMergeStockItemReqs: state.allProductModelInfoMergeStockItemReqs.map((item) => {
                if (item.productModelId === action.productModelId) {
                    return {
                        ...item,
                        itemQuantity: item.itemQuantity + 1,
                        totalItemRequestPrice: item.unitRequestPrice * (item.itemQuantity + 1),
                        afterRequestQuantity: item.currentQuantity + (item.itemQuantity + 1)
                    };
                }
                return item;
            })
        };
    })
);
