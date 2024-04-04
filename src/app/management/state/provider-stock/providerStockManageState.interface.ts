import { IProductModelInfoMergeStockItemRequest, IProductModelInfoWithStockAggregate, IProviderRequirement } from "../../../core/models/provider.interface";

export interface IProviderStockManagementState {
    allProviderRequirements: IProviderRequirement[];
    selectedProviderRequirement: IProviderRequirement | null;
    allSelectedProviderProductModelInfosWithStockSub: IProductModelInfoWithStockAggregate[];
    allProductModelInfoMergeStockItemReqs: IProductModelInfoMergeStockItemRequest[];
}