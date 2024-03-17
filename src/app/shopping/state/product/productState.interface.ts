import { IPaginatedProduct, IProductLazyLoadRequest } from "../../../core/models/product.interface";

export interface IProductState {
    productLazyLoadRequest: IProductLazyLoadRequest;
    paginatedProducts: IPaginatedProduct
}