import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
    IPaginatedProduct,
    IProductLazyLoadRequest,
    OrderType,
    SortBy
} from './../../../core/models/product.interface';
import { ICatalog, ISubCatalog } from '../../../core/models/catalog.interface';

export const productActions = createActionGroup({
    source: 'Product Events In Shopping Module',
    events: {
        'Reload Products': emptyProps(),
        'Products Loaded Successfull': props<{ paginatedProducts: IPaginatedProduct }>(),
        'Products Loaded Failed': props<{ error: string }>(),
        'Num Products Per Page Changed': props<{ selectedProductPerPage: number }>(),
        'Sort Products By Changed': props<{ selectedSortBy: SortBy }>(),
        'Products Order Type Changed': props<{ selectedOrderType: OrderType }>(),
        'Page Changed': props<{ selectedPage: number }>(),
        'Price Range Changed': props<{ fromPrice: number, toPrice: number}>()
    }
});

export const catalogActions = createActionGroup({
    source: 'Catalog Events In Shopping Module',
    events: {
        'Reload Catalogs': emptyProps(),
        'Catalogs Loaded Successfull': props<{ loadedCatalogs: ICatalog[] }>(),
        'Catalogs Loaded Failed': props<{ error: string }>(),
        'Load SubCatalogs Of Catalog': props<{ catalogId: string }>(),
        'SubCatalog Of Catalog Loaded Successfull': props<{ loadedSubCatalogOfCatalog: ISubCatalog[] }>(),
        'SubCatalog Of Catalog Loaded Failed': props<{ error: string }>(),
        'SubCatalog Selected': props<{ selectedSubCatalogId: string }>(),
        'SubCatalog Deselected': props<{ deselectedSubCatalogId: string }>(),
    }
})
