import { ICatalog, ISubCatalog } from "../../../core/models/catalog.interface";
import { IComment } from "../../../core/models/order.interface";
import { IBookmarkProduct, ILikeProduct } from "../../../core/models/product-interactions.interface";
import { IPaginatedProduct, IProductLazyLoadRequest } from "../../../core/models/product.interface";

export interface IProductState {
    productLazyLoadRequest: IProductLazyLoadRequest;
    paginatedProducts: IPaginatedProduct,
    allCatalogs: ICatalog[],
    allSubCatalogs: ISubCatalog[]
    subCatalogsOfSelectedCatalog: ISubCatalog[],

    selectedProductComments: IComment[],
    userProductBookmarkMappings: IBookmarkProduct[],
    userProductLikeMappings: ILikeProduct[]
}