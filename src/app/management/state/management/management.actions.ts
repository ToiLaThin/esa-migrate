import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { SidebarMode } from "../../../core/types/sidebar-mode.enum";
import { ICatalog, ISubCatalog } from "../../../core/models/catalog.interface";
import { IPaginatedProduct, SortBy, OrderType } from "../../../core/models/product.interface";
import { Currency } from "../../../core/types/currency.enum";
import { IUserRewardPoint } from "../../../core/models/reward-point.interface";

export const managementActions = createActionGroup({
    source: 'Management Events in Management Module',
    events: {
        'Toggle Sidebar': emptyProps(),
        'Toggle Topbar': emptyProps(),
        'Toggle Sidebar Fixed Position': emptyProps(),
        'Switch mode Sidebar': props<{ newSidebarMode: SidebarMode}>(),
        'Toggle Navigation Left': emptyProps(),
        'Reset Management Products And Catalog State': emptyProps(),
        'Change Currency': props<{ newCurrency: Currency }>(),
        'Load User Reward Points': props<{userId: string}>(),
        'Load User Reward Points Successfully': props<{ userRewardPoints: IUserRewardPoint }>(),
        'Load User Reward Points Failed': props<{ error: string }>(),
        'Clear User Reward Points After Logged Out': emptyProps(),
    }
})

export const productManagementActions = createActionGroup({
    source: 'Product Management Events In Management Module',
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

export const catalogManagementActions = createActionGroup({
    source: 'Catalog Events In Management Module',
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