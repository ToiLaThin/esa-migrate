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
    isLoadingProducts: false,
    paginatedProducts: {
        products: [],
        pageCount: 0,
        pageNumber: 0
    },    
    productCompareIdList: [],
    productSearchMatched: null,
    allCatalogs: [],
    allSubCatalogs: [],
    selectedCatalogId: '',
    subCatalogsOfSelectedCatalog: [],

    selectedProductComments: [],
    userProductBookmarkMappings: [],
    userProductLikeMappings: [],
    userProductRateMappings: [],
    recommendedProducts: [],
    isLoadingRecommendedProducts: false,
    crossSellingProducts: []
};

export const productFeatureKey = 'productFeature';
export const productReducer = createReducer(
    initialProductState,
    on(productActions.reloadProducts, (state) => ({
        ...state,
        isLoadingProducts: true
    })),
    on(productActions.productsLoadedSuccessfull, (state, action) => ({
        ...state,
        isLoadingProducts: false,
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
    on(catalogActions.loadSubCatalogsOfCatalog, (state, action) => ({
        ...state,
        selectedCatalogId: action.catalogId
    })),
    on(catalogActions.subCatalogOfCatalogLoadedSuccessfull, (state, action) => ({
        ...state,
        subCatalogsOfSelectedCatalog: action.loadedSubCatalogOfCatalog,
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
    }),

    on(productActions.productCommentsLoadedSuccessfully, (state, action) => {
        return {
            ...state,
            selectedProductComments: action.comments
        }
    }),

    on(productActions.productBookmarkMappingsLoadedSuccessfully, (state, action) => {
        return {
            ...state,
            userProductBookmarkMappings: action.bookmarkedProductMappings
        }
    }),

    on(productActions.productLikeMappingsLoadedSuccessfully, (state, action) => {
        return {
            ...state,
            userProductLikeMappings: action.likedProductMappings
        }
    }),

    on(productActions.productRateMappingsLoadedSuccessfully, (state, action) => {
        return {
            ...state,
            userProductRateMappings: action.ratedProductMappings
        }
    }),
    on(productActions.productCompareIdListLoadedSuccessfully, (state, action) => {
        return {
            ...state,
            productCompareIdList: action.productCompareIdList
        }
    }),
    on(productActions.productsSearchedSuccessfully, (state, action) => {
        return {
            ...state,
            productSearchMatched: action.matchingProducts
        }
    }),
    on(productActions.clearSearchProducts, (state) => {
        return {
            ...state,
            productSearchMatched: null
        }
    }),
    
    on(productActions.loadProductRecommendationMetaDatasOfUser, (state, action) => {
        return {
            ...state,
            isLoadingRecommendedProducts: true
        }
    }),
    on(productActions.recommendedProductLoadedSuccessfully, (state, action) => {
        return {
            ...state,
            recommendedProducts: action.products,
            isLoadingRecommendedProducts: false
        }
    }),

    on(productActions.crossSellingProductsLoadedSuccessfully, (state, action) => {
        return {
            ...state,
            crossSellingProducts: action.loadedProducts
        }
    }),
);
