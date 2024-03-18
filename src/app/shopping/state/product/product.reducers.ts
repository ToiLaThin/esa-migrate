import { createReducer, on } from '@ngrx/store';
import { OrderType, ProductPerPage, SortBy } from '../../../core/models/product.interface';
import { productActions } from './product.actions';
import { IProductState } from './productState.interface';

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
};

export const productFeatureKey = 'productFeature';
export const productReducer = createReducer(
    initialProductState,
    on(productActions.productsLoadedSuccessfull, (state, action) => ({
        ...state,
        paginatedProducts: action.paginatedProducts
    })),
    on(productActions.numProductsPerPageChanged, (state, action) => ({
        ...state,
        productLazyLoadRequest: {
            ...state.productLazyLoadRequest,
            productPerPage: action.selectedProductPerPage
        }
    })),
    on(productActions.productsOrderTypeChanged, (state, action) => ({
        ...state,
        productLazyLoadRequest: {
            ...state.productLazyLoadRequest,
            orderType: action.selectedOrderType
        }
    })),
    on(productActions.sortProductsByChanged, (state, action) => ({
        ...state,
        productLazyLoadRequest: {
            ...state.productLazyLoadRequest,
            sortBy: action.selectedSortBy
        }
    })),
    on(productActions.pageChanged, (state, action) => ({
        ...state,
        productLazyLoadRequest: {
            ...state.productLazyLoadRequest,
            pageOffset: action.selectedPage
        }
    }))
);
