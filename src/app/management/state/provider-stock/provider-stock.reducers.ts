import { createReducer, on } from '@ngrx/store';
import { IProviderStockManagementState } from './providerStockManageState.interface';
import { providerStockManagementActions } from './provider-stock.actions';

export const providerStockManagementFeatureKey = 'providerStockManagementFeature';
export const initialProviderStockManagementState: IProviderStockManagementState = {
    allProviderRequirements: [],
    selectedProviderRequirement: null,
    //make it more generic, so we can use this same state for 2 page add stock and provider detail
    displayingProductModelInfosWithStockSub: [],
    displayingProductModelInfoMergeStockItemReqs: [],
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
            displayingProductModelInfosWithStockSub:
                action.loadedProductModelsInfoWithStock,
            displayingProductModelInfoMergeStockItemReqs:
                action.transformedProductModelInfoMergeStockItemReqs
        })
    ),
    on(providerStockManagementActions.decreaseStockRequestQuantity, (state, action) => {
        if (state.displayingProductModelInfoMergeStockItemReqs.length === 0 || state.displayingProductModelInfoMergeStockItemReqs === null) {
            return state;
        }
        let mergedItem = state.displayingProductModelInfoMergeStockItemReqs.filter((mergedItem) => mergedItem.productModelId === action.productModelId);
        if (mergedItem.length !== 1) { 
            alert("Product model id is duplicate") 
            return state;
        }
        if (mergedItem[0].itemQuantity === 0) {
            alert("Quantity is already 0");            
            return state;
        }
        console.log("Quantity before decrease:", mergedItem[0].itemQuantity);
        console.log("Quantity after decrease:", mergedItem[0].itemQuantity - action.quantityChange);
        if (mergedItem[0].itemQuantity - action.quantityChange < 0) {
            alert("Quantity request cannot be negative");
            return state;
        }
        return {
            ...state,
            displayingProductModelInfoMergeStockItemReqs: state.displayingProductModelInfoMergeStockItemReqs.map((item) => {
                if (item.productModelId === action.productModelId) {
                    return {
                        ...item,
                        itemQuantity: item.itemQuantity - action.quantityChange,
                        totalItemRequestPrice: item.unitRequestPrice * (item.itemQuantity - action.quantityChange),
                        afterRequestQuantity: item.currentQuantity + (item.itemQuantity - action.quantityChange)
                    };
                }
                return item;
            })
        };
    }),

    on(providerStockManagementActions.increaseStockRequestQuantity, (state, action) => {
        if (state.displayingProductModelInfoMergeStockItemReqs.length === 0 || state.displayingProductModelInfoMergeStockItemReqs === null) {
            return state;
        }
        let mergedItem = state.displayingProductModelInfoMergeStockItemReqs.filter((mergedItem) => mergedItem.productModelId === action.productModelId);
        if (mergedItem.length !== 1) { 
            alert("Product model id is duplicate") 
            return state;
        }
        console.log("Quantity before increase:", mergedItem[0].itemQuantity);
        console.log("Quantity after increase:", mergedItem[0].itemQuantity + action.quantityChange);
        return {
            ...state,
            displayingProductModelInfoMergeStockItemReqs: state.displayingProductModelInfoMergeStockItemReqs.map((item) => {
                if (item.productModelId === action.productModelId) {
                    return {
                        ...item,
                        itemQuantity: item.itemQuantity + action.quantityChange,
                        totalItemRequestPrice: item.unitRequestPrice * (item.itemQuantity + action.quantityChange),
                        afterRequestQuantity: item.currentQuantity + (item.itemQuantity + action.quantityChange)
                    };
                }
                return item;
            })
        };
    }),

    on(providerStockManagementActions.afterLoadAllRequestRequireProductModelInfosWithStockSubAndTransformToProductModelMergeStockItemRequestSuccess, 
        (state, action) => ({
            ...state,
            displayingProductModelInfosWithStockSub: action.loadedProductModelsInfoWithStock,
            displayingProductModelInfoMergeStockItemReqs: action.transformedProductModelInfoMergeStockItemReqs
        })
    )
);