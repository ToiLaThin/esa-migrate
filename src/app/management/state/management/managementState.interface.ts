import { ICatalog, ISubCatalog } from "../../../core/models/catalog.interface";
import { IPaginatedProduct, IProductLazyLoadRequest } from "../../../core/models/product.interface";
import { SidebarMode } from "../../../core/types/sidebar-mode.enum";

export interface IManagementState {
    topbarOpened: boolean,
    navigationLeftOpened: boolean, //when nav left is closed, no action can be performed except toggle nav left
    sidebarOpened: boolean,
    sidebarFixed: boolean, //when sidebarfixed it will also be toggled
    sidebarMode: SidebarMode,

    //share state product (product list, sale list) (this is copy of shopping module)
    productLazyLoadRequest: IProductLazyLoadRequest;
    paginatedProducts: IPaginatedProduct,
    allCatalogs: ICatalog[],
    allSubCatalogs: ISubCatalog[]
    subCatalogsOfSelectedCatalog: ISubCatalog[]

}