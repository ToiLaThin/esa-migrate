import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
    IPaginatedProduct,
    IProductLazyLoadRequest,
    OrderType,
    SortBy
} from './../../../core/models/product.interface';

export const productActions = createActionGroup({
    source: 'Product Events In Shopping Module',
    events: {
        'Reload Products': emptyProps(),
        'Products Loaded Successfull': props<{ paginatedProducts: IPaginatedProduct }>(),
        'Products Loaded Failed': props<{ error: string }>(),
        'Num Products Per Page Changed': props<{ selectedProductPerPage: number }>(),
        'Sort Products By Changed': props<{ selectedSortBy: SortBy }>(),
        'Products Order Type Changed': props<{ selectedOrderType: OrderType }>(),
        'Page Changed': props<{ selectedPage: number }>()
    }
});
