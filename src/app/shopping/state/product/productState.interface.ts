import { ICatalog, ISubCatalog } from "../../../core/models/catalog.interface";
import { IComment } from "../../../core/models/order.interface";
import { IPaginatedProduct, IProductLazyLoadRequest } from "../../../core/models/product.interface";

export interface IProductState {
    productLazyLoadRequest: IProductLazyLoadRequest;
    paginatedProducts: IPaginatedProduct,
    allCatalogs: ICatalog[],
    allSubCatalogs: ISubCatalog[]
    subCatalogsOfSelectedCatalog: ISubCatalog[],

    selectedProductComments: IComment[]
}