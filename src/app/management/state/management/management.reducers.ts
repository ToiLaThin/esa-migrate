import { createReducer, on } from '@ngrx/store';
import { IManagementState } from './managementState.interface';
import { catalogManagementActions, managementActions, productManagementActions } from './management.actions';
import { SidebarMode } from '../../../core/types/sidebar-mode.enum';
import { ProductPerPage, SortBy, OrderType, FilterBy, IProductLazyLoadRequest } from '../../../core/models/product.interface';
import { Currency } from '../../../core/types/currency.enum';

export const managementFeatureKey = 'managementFeature';
export const initialManagementState: IManagementState = {
    topbarOpened: true,
    navigationLeftOpened: true,
    sidebarOpened: false,
    sidebarMode: SidebarMode.PUSH,
    sidebarFixed: false,

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
    subCatalogsOfSelectedCatalog: [],

    subCatalogSelectedIds: [],
    catalogSelectedId: '',
    currency: Currency.VND
};
export const managementReducer = createReducer(
    initialManagementState,
    on(managementActions.toggleSidebar, (state, action) => {
        if (state.sidebarFixed === true) {
            return { 
                ...state, 
                sidebarOpened: false
            };
        }
        return {
            ...state,
            sidebarOpened: !state.sidebarOpened
        };
    }),
    on(managementActions.switchModeSidebar, (state, action) => {
        if (state.sidebarFixed === true) {
            return {
                ...state,
                sidebarMode: SidebarMode.PUSH
            }    
        }
        return {
            ...state,
            sidebarMode: action.newSidebarMode
        }
    }),
    on(managementActions.toggleSidebarFixedPosition, (state, action) => {
        if (state.navigationLeftOpened == false) {
            return { ...state }
        }

        if (state.sidebarFixed === true) {
            return {
                ...state,
                sidebarFixed: false
            };
        }
        return {
            ...state,
            sidebarFixed: true,
            sidebarMode: SidebarMode.PUSH,
            sidebarOpened: true //later if we add the toggle, we can put this to false, the resizer will be display so user will know they now can toggle the sidebar
        };
    }),
    on(managementActions.toggleNavigationLeft, (state, action) => {
        return {
            ...initialManagementState,
            subCatalogSelectedIds: state.subCatalogSelectedIds,
            catalogSelectedId: state.catalogSelectedId,
            allCatalogs: state.allCatalogs,
            allSubCatalogs: state.allSubCatalogs,
            subCatalogsOfSelectedCatalog: state.subCatalogsOfSelectedCatalog,
            navigationLeftOpened: !state.navigationLeftOpened
        }
    }),
    on(managementActions.toggleTopbar, (state, action) => ({
        ...state,
        topbarOpened: !state.topbarOpened
    })),
    on(managementActions.changeCurrency, (state, action) => {
        return {
            ...state,
            currency: action.newCurrency
        }
    }),

    on(managementActions.resetManagementProductsAndCatalogState, (state, action) => ({
        ...state,
        productLazyLoadRequest: initialManagementState.productLazyLoadRequest,
        paginatedProducts: initialManagementState.paginatedProducts,
        allCatalogs: initialManagementState.allCatalogs,
        allSubCatalogs: initialManagementState.allSubCatalogs,
        subCatalogsOfSelectedCatalog: initialManagementState.subCatalogsOfSelectedCatalog,
        subCatalogSelectedIds: initialManagementState.subCatalogSelectedIds,
        catalogSelectedId: initialManagementState.catalogSelectedId
    })),
    on(productManagementActions.productsLoadedSuccessfull, (state, action) => ({
        ...state,
        paginatedProducts: action.paginatedProducts
    })),
    on(productManagementActions.numProductsPerPageChanged, (state, action) => ({
        ...state,
        productLazyLoadRequest: {
            ...state.productLazyLoadRequest,
            productPerPage: action.selectedProductPerPage
        }
    })),
    on(productManagementActions.productsOrderTypeChanged, (state, action) => ({
        ...state,
        productLazyLoadRequest: {
            ...state.productLazyLoadRequest,
            orderType: action.selectedOrderType
        }
    })),
    on(productManagementActions.sortProductsByChanged, (state, action) => ({
        ...state,
        productLazyLoadRequest: {
            ...state.productLazyLoadRequest,
            sortBy: action.selectedSortBy
        }
    })),
    on(productManagementActions.pageChanged, (state, action) => ({
        ...state,
        productLazyLoadRequest: {
            ...state.productLazyLoadRequest,
            pageOffset: action.selectedPage
        }
    })),
    on(productManagementActions.priceRangeChanged, (state, action) => {
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
    on(catalogManagementActions.catalogsLoadedSuccessfull, (state, action) => ({
        ...state,
        allCatalogs: action.loadedCatalogs
    })),
    //this is displatched when a catalog is selected on filter
    on(catalogManagementActions.loadSubCatalogsOfCatalog, (state, action) => ({
        ...state,
        catalogSelectedId: action.catalogId
    })),
    on(catalogManagementActions.subCatalogOfCatalogLoadedSuccessfull, (state, action) => ({
        ...state,
        subCatalogSelectedIds: [],
        subCatalogsOfSelectedCatalog: action.loadedSubCatalogOfCatalog
    })),
    on(catalogManagementActions.subCatalogSelected, (state, action) => {
        const filteredBySub = state.productLazyLoadRequest.filterRequests.find(
            (filterRequest) => filterRequest.filterBy == FilterBy.SubCatalogs
        );
        if (!filteredBySub) {
            return {
                ...state,                
                subCatalogSelectedIds: [...state.subCatalogSelectedIds, action.selectedSubCatalogId],
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
            subCatalogSelectedIds: [...state.subCatalogSelectedIds, action.selectedSubCatalogId],
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
    on(catalogManagementActions.subCatalogDeselected, (state, action) => {
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
                subCatalogSelectedIds: state.subCatalogSelectedIds.filter(
                    (subId) => subId != action.deselectedSubCatalogId
                ),
                //catalogSelectedId: '', still keep the catalogSelectedId
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
            subCatalogSelectedIds: state.subCatalogSelectedIds.filter(
                (subId) => subId != action.deselectedSubCatalogId
            ),
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
