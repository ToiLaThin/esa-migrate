import { createReducer, on } from '@ngrx/store';
import {
    FilterBy,
    IProductLazyLoadRequest,
    OrderType,
    ProductPerPage,
    SortBy
} from '../../../core/models/product.interface';
import { catalogActions, productActions } from './product.actions';
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
    },
    allCatalogs: [],
    allSubCatalogs: [],
    subCatalogsOfSelectedCatalog: []
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
    })),
    on(productActions.priceRangeChanged, (state, action) => {
        const newPriceMeta: string = JSON.stringify({
            fromPrice: action.fromPrice,
            toPrice: action.toPrice
        });
        const oldRequest:IProductLazyLoadRequest = state.productLazyLoadRequest;
        const filteredByPriceRange = oldRequest.filterRequests.some((filterRequest) => filterRequest.filterBy == FilterBy.Price);
        if (filteredByPriceRange === true) {
            console.log("filteredByPriceRange is already true");
            const indexOldFilterRequest = oldRequest.filterRequests.findIndex((filterRequest) => filterRequest.filterBy == FilterBy.Price);
            return {
                ...state,
                productLazyLoadRequest: {
                    ...state.productLazyLoadRequest,
                    filterRequests: [
                        ...oldRequest.filterRequests.slice(0, indexOldFilterRequest),
                        {
                            filterBy: FilterBy.Price,
                            Meta: newPriceMeta
                        },
                        ...oldRequest.filterRequests.slice(indexOldFilterRequest + 1)
                    ]
                }
            }
        }
        console.log("filteredByPriceRange is false");
        return {
            ...state,
            productLazyLoadRequest: {
                ...state.productLazyLoadRequest,
                filterRequests: [
                    ...oldRequest.filterRequests,
                    {
                        filterBy: FilterBy.Price,
                        Meta: newPriceMeta
                    }
                ]
            }
        }
    }),
    on(catalogActions.catalogsLoadedSuccessfull, (state, action) => ({
        ...state,
        allCatalogs: action.loadedCatalogs
    })),
    on(catalogActions.subCatalogOfCatalogLoadedSuccessfull, (state, action) => ({
        ...state,
        subCatalogsOfSelectedCatalog: action.loadedSubCatalogOfCatalog
    })),
    on(catalogActions.subCatalogSelected, (state, action) => {
        const filteredBySub = state.productLazyLoadRequest.filterRequests.find(
            (filterRequest) => filterRequest.filterBy == FilterBy.SubCatalogs
        );
        if (!filteredBySub) {
            return {
                ...state,
                productLazyLoadRequest: {
                    ...state.productLazyLoadRequest,
                    filterRequests: [
                        //do not use state.productLazyLoadRequest.filterRequest.push({}), it will cause err
                        //it mutate the state, instead we use array spread operator
                        ...state.productLazyLoadRequest.filterRequests,
                        {
                            filterBy: FilterBy.SubCatalogs,
                            Meta: JSON.stringify([action.selectedSubCatalogId])
                        }
                    ]
                }
            };
        }
        const oldRequest: IProductLazyLoadRequest = state.productLazyLoadRequest;
        const oldFilterRequest = oldRequest.filterRequests.filter(
            (filterRequest) => filterRequest.filterBy == FilterBy.SubCatalogs
        )[0];
        const indexOldFilterRequest = oldRequest.filterRequests.findIndex(
            (filterRequest) => filterRequest.filterBy == FilterBy.SubCatalogs
        );
        let newFilterRequest = {
            filterBy: oldFilterRequest.filterBy,
            Meta: JSON.stringify(
                JSON.parse(oldFilterRequest.Meta).concat([action.selectedSubCatalogId])
            )
        };
        return {
            ...state,
            productLazyLoadRequest: {
                ...state.productLazyLoadRequest,
                filterRequests: [
                    ...oldRequest.filterRequests.slice(0, indexOldFilterRequest),
                    newFilterRequest,
                    ...oldRequest.filterRequests.slice(indexOldFilterRequest + 1)
                ]
            }
        };
    }),
    on(catalogActions.subCatalogDeselected, (state, action) => {
        const oldRequest: IProductLazyLoadRequest = state.productLazyLoadRequest;
        const oldFilterRequest = oldRequest.filterRequests.filter(
            (filterRequest) => filterRequest.filterBy == FilterBy.SubCatalogs
        )[0];
        const indexOldFilterRequest = oldRequest.filterRequests.findIndex(
            (filterRequest) => filterRequest.filterBy == FilterBy.SubCatalogs
        );

        if (JSON.parse(oldFilterRequest.Meta).length === 1) {
            //remove filter request of subcatalog, not just remove subcatalogId in Meta
            return {
                ...state,
                productLazyLoadRequest: {
                    ...state.productLazyLoadRequest,
                    filterRequests: [
                        ...oldRequest.filterRequests.slice(0, indexOldFilterRequest),
                        ...oldRequest.filterRequests.slice(indexOldFilterRequest + 1)
                    ]
                }
            };
        }

        let newFilterRequest = {
            filterBy: oldFilterRequest.filterBy,
            Meta: JSON.stringify(
                JSON.parse(oldFilterRequest.Meta).filter(
                    (subId: string) => subId != action.deselectedSubCatalogId
                )
            )
        };
        return {
            ...state,
            productLazyLoadRequest: {
                ...state.productLazyLoadRequest,
                filterRequests: [
                    ...oldRequest.filterRequests.slice(0, indexOldFilterRequest),
                    newFilterRequest,
                    ...oldRequest.filterRequests.slice(indexOldFilterRequest + 1)
                ]
            }
        };
    })
);
