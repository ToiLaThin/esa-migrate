import { ICatalog, ISubCatalog } from "../../../core/models/catalog.interface";
import { IPaginatedProduct, IProductLazyLoadRequest } from "../../../core/models/product.interface";
import { IUserRewardPoint } from "../../../core/models/reward-point.interface";
import { Currency } from "../../../core/types/currency.enum";
import { SidebarMode } from "../../../core/types/sidebar-mode.enum";
import { ThemeType } from "../../../core/ui-models/theme-type";

export interface IManagementState {
    topbarOpened: boolean,
    navigationLeftOpened: boolean, //when nav left is closed, no action can be performed except toggle nav left
    sidebarOpened: boolean,
    sidebarFixed: boolean, //when sidebarfixed it will also be toggled
    sidebarMode: SidebarMode,

    //share state product (product list, sale list) (this is copy of shopping module)
    productLazyLoadRequest: IProductLazyLoadRequest,
    paginatedProducts: IPaginatedProduct,
    allCatalogs: ICatalog[],
    allSubCatalogs: ISubCatalog[],
    subCatalogsOfSelectedCatalog: ISubCatalog[],

    //these are needed to not only load catalogs & sub but know which were 
    // selected by user in previous filter
    subCatalogSelectedIds: string[],
    catalogSelectedId: string,


    currency: Currency,
    language: 'en' | 'vi';
    userRewardPoints: IUserRewardPoint | null, //null means not login
    theme: ThemeType,

}