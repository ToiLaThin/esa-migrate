import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { IPaginatedProduct, IProductLazyLoadRequest } from './../../../core/models/product.interface';

export const productActions = createActionGroup({
    source: "Product Events In Shopping Module",
    events: {
        "Reload Products": emptyProps(),
        "Products Loaded Successfull": props<{ paginatedProducts: IPaginatedProduct }>(),
        "Products Loaded Failed": props<{ error: string}>()
    }
})