import { ICatalog, ISubCatalog } from "../../../core/models/catalog.interface";
import { IComment } from "../../../core/models/order.interface";
import { IBookmarkProduct, ILikeProduct, IRateProduct } from "../../../core/models/product-interactions.interface";
import { IPaginatedProduct, IProduct, IProductLazyLoadRequest } from "../../../core/models/product.interface";

export interface IProductState {
    productLazyLoadRequest: IProductLazyLoadRequest;
    isLoadingProducts: boolean;
    paginatedProducts: IPaginatedProduct,
    allCatalogs: ICatalog[],
    allSubCatalogs: ISubCatalog[]
    selectedCatalogId: string,
    subCatalogsOfSelectedCatalog: ISubCatalog[],

    selectedProductComments: IComment[],
    userProductBookmarkMappings: IBookmarkProduct[],
    userProductWishList: IProduct[],
    userProductLikeMappings: ILikeProduct[],
    userProductRateMappings: IRateProduct[],

    productCompareIdList: string[],
    productSearchMatched: IProduct[] | null,    
    recommendedProducts: IProduct[],
    isLoadingRecommendedProducts: boolean,
    crossSellingProducts: IProduct[];
    isLoadingCrossSellingProducts: boolean;
}