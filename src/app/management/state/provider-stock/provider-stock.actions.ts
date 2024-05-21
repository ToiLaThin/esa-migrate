import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
    IProductModelInfoMergeStockItemRequest,
    IProductModelInfoWithStockAggregate,
    IProviderRequirement
} from '../../../core/models/provider.interface';

export const providerStockManagementActions = createActionGroup({
    source: 'Provider Stock Events In Management Module',
    events: {
        'Load All Provider Requirements': emptyProps(),
        'Load All Provider Requirements Success': props<{
            loadedProviderRequirements: IProviderRequirement[];
        }>(),
        'Load All Provider Requirements Failed': props<{ error: any }>(),

        'Select Provider Requirement': props<{ providerRequirementId: string }>(),
        'After Select Loaded Product Models With Stock Of Provider And Transform to Product Model Merge Stock Item Request Success':
            props<{
                loadedProductModelsInfoWithStock: IProductModelInfoWithStockAggregate[];
                transformedProductModelInfoMergeStockItemReqs: IProductModelInfoMergeStockItemRequest[];
            }>(),
        'After Select Loaded Product Models With Stock Of Provider And Transform to Product Model Merge Stock Item Request Failed':
            props<{ error: any }>(),

        'Load All Request Require Product Models With Stock Sub': emptyProps(),
        'After Load All Request Require Product Model Infos With Stock Sub And Transform to Product Model Merge Stock Item Request Success': 
            props<{
                loadedProductModelsInfoWithStock: IProductModelInfoWithStockAggregate[];
                transformedProductModelInfoMergeStockItemReqs: IProductModelInfoMergeStockItemRequest[];
            }>(),
        'After Load All Request Require Product Model Infos With Stock Sub And Transform to Product Model Merge Stock Item Request Failed': 
            props<{ error: any }>(),

        'Decrease Stock Request Quantity': props<{ productModelId: string, quantityChange: number }>(),
        'Increase Stock Request Quantity': props<{ productModelId: string, quantityChange: number }>(),

        'Confirm Stock Request To Provider': emptyProps(),
        'Confirm Stock Request To Provider Failed': props<{error: string}>(),
        'Clear All Stock Requests To Provider': props<{ selectingProviderRequirementId: string }>(),     
        'Clear All Stock Requests Require Request': emptyProps(),   
    }
});
