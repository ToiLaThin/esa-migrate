import { ICatalog } from "./catalog.interface";

export interface IStockItemRequestMeta {
    productId: string;
    productModelId: string;
    businessKey: string;
    unitRequestPrice: number;
    quantityToRequestMoreFromProvider: number;
    quantityToNotify: number;
}

export interface IProviderRequirement {
    providerRequirementId: string;
    providerName: string;
    minPriceToBeAccepted: number;
    minQuantityToBeAccepted: number;
    providerBusinessKey: string;
    revision: number;
    isUsed: boolean;
    availableStockItemRequestMetas: IStockItemRequestMeta[];
    availableProviderCatalogIds: string[]
}

export interface IProviderRequirementWithCatalogsAggregate {
    providerRequirement: IProviderRequirement;
    availableProviderCatalogs: ICatalog[];
}

export interface IProductModelInfoWithStockAggregate {
    productModelId: string;
    productId: string;
    businessKey: string;
    productModelName: string;
    productCoverImage: string;
    price: number;
    unitRequestPrice: number;
    currentQuantity: number;
    quantityToRequestMoreFromProvider: number;
    quantityToNotify: number;
}

export interface IStockItemRequest {
    productId: string;
    productModelId: string;
    businessKey: string;
    unitRequestPrice: number;
    itemQuantity: number;
    totalItemRequestPrice: number;
    currentItemQuantityInStockBeforeThisStockRequest: number;
    distanceToReachNotifyQuantityLevelBeforeThisStockRequest: number;
    distanceToReachOrderMoreQuantityLevelBeforeThisStockRequest: number;
}

export interface IProductModelInfoMergeStockItemRequest {
    productModelId: string;
    productId: string;
    businessKey: string;
    productModelName: string;
    productCoverImage: number;
    price: number;
    unitRequestPrice: number;
    currentQuantity: number;
    quantityToRequestMoreFromProvider: number;
    quantityToNotify: number;
    itemQuantity: number;
    totalItemRequestPrice: number;
    afterRequestQuantity: number;
}

export interface IStockRequestTransaction {
    //all ? prop will be calc or gen in server-side
    stockRequestTransactionId?: string;
    providerRequirementId: string;
    providerBusinessKey: string;
    totalTransactionPrice?: number;
    totalQuantity?: number;
    dateCreated?: Date;
    stockItemRequests: IStockItemRequest[];
}