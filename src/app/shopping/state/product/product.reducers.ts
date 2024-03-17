import { createReducer, on } from "@ngrx/store";
import { OrderType, ProductPerPage, SortBy } from "../../../core/models/product.interface";
import { productActions } from "./product.actions";
import { IProductState } from "./productState.interface";

export const initialProductState: IProductState = {
    productLazyLoadRequest: {
        pageOffset: 1,
        productPerPage: ProductPerPage.Sixteen,
        sortBy: SortBy.Id,
        orderType: OrderType.Ascending,
        filterRequests: []
    },
    paginatedProducts: {
        products: [],
        pageCount: 0,
        pageNumber: 0
    }
}

export const productFeatureKey = "productFeature";
export const productReducer = createReducer(
    initialProductState,
    on(productActions.productsLoadedSuccessfull, (
        (state, action) => ({
            ...state,
            paginatedProducts: action.paginatedProducts
        })
    )),
)