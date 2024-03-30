import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ICatalog, ISubCatalog } from "../../../core/models/catalog.interface";

export const productCatalogManagementActions = createActionGroup({
    source: 'Product Catalog Events in Management Module',
    events: {
        'Load All Catalogs': emptyProps(),
        'Load All Catalogs Success': props<{loadedCatalogs: ICatalog[]}>(),
        'Load All Catalogs Failed': props<{error: any}>(),

        'Add New Catalog': props<{catalog: ICatalog}>(),
        'Add New Catalog Success': props<{addedCatalog: ICatalog}>(),
        'Add New Catalog Failed': props<{error: any}>(),

        'Add New Subcatalog ': props<{subcatalog: ISubCatalog, selectedCatalogId: string}>(),
        'Add New Subcatalog Success': props<{info: string}>(),
        'Add New Subcatalog Failed': props<{error: any}>()
    }
})