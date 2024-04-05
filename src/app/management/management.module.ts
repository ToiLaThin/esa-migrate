import { NgModule } from '@angular/core';
import { managementRoutes } from './management.routes';
import { RouterModule } from '@angular/router';
import { ShareComponentsModule } from '../share-components/share-components.module';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management.component';
import { ManagementTopbarComponent } from './layout/management-topbar.component';
import { ManagementNavigationComponent } from './layout/management-navigation.component';
import { ManagementLayoutComponent } from './layout/management-layout.component';
import { ProductCatalogComponent } from './tabs/product-catalog/product-catalog.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { CatalogManagementListComponent } from './components/product-catalog/catalog-list/catalog-list.component';
import { ProductManagementListComponent } from './components/product-catalog/product-list/product-list.component';
import { CatalogAddManagementComponent } from './components/product-catalog/catalog-add/catalog-add.component';
import { SubCatalogAddManagementComponent } from './components/product-catalog/subcatalog-add/subcatalog-add.component';
import { SaleCouponComponent } from './tabs/sale-coupon/sale-coupon.component';
import { CouponListManagementComponent } from './components/sale-coupon/coupon-list/coupon-list.component';
import { SaleListManagementComponent } from './components/sale-coupon/sale-list/sale-list.component';
import { NzModalModule } from 'ng-zorro-antd/modal'
import { CouponAddModalComponent } from './components/sale-coupon/coupon-add-modal/coupon-add-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaleListManagementProductChipComponent } from './components/sale-coupon/sale-list-product-chip/product-chip.component';
import { SaleListPaginationComponent } from './components/sale-coupon/sale-list/sale-list-pagination.component';
import { SaleListFilterTopManagementComponent } from './components/sale-coupon/sale-list/sale-list-filter-top.component';
import { SaleListTableComponent } from './components/sale-coupon/sale-list-table/sale-list-table.component';
import { CouponListAdvanceFilterComponent } from './components/sale-coupon/coupon-list/coupon-list-advance-filter.component';
import { CouponListFilterComponent } from './components/sale-coupon/coupon-list/coupon-list-filter.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CouponListCouponPlaceholderComponent } from './components/sale-coupon/coupon-list-coupon-placeholder/coupon-placeholder.component';
import { CouponListCouponComponent } from './components/sale-coupon/coupon-list-coupon/coupon.component';
import { CatalogSubCatalogListManagementComponent } from './components/product-catalog/catalog-subcatalog-list/catalog-subcatalog-list.component';
import { SubCatalogAddWithInputManagementComponent } from './components/product-catalog/catalog-subcatalog-list/subcatalog-add-input.component';
import { ProviderStockComponent } from './tabs/provider-stock/provider-stock.component';
import { ProviderListManagementComponent } from './components/provider-stock/provider-list/provider-list.component';
import { ProviderDetailManagementComponent } from './components/provider-stock/provider-detail/provider-detail.component';
import { OrderComponent } from './tabs/order/order.component';
import { OrderApproveItemsManagementComponent } from './components/order/order-approve-items/order-approve-items.component';
import { OrderApproveManagementComponent } from './components/order/order-approve/order-approve.component';
import { OrderApproveListManagementComponent } from './components/order/order-approve-list/order-approve-list.component';
import { OrderApproveOrderManagementComponent } from './components/order/order-approve-order/order-approve-order.component';
const importNzModules = [
    NzButtonModule,
    NzDropDownModule,
    NzIconModule,
    NzDatePickerModule,
    NzCheckboxModule,
    NzModalModule,
    NzSliderModule,
    NzLayoutModule
]
@NgModule({
    imports: [
        RouterModule.forChild(managementRoutes),
        ShareComponentsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        
        MatSidenavModule,
        NzToolTipModule,
        NzModalModule,
        importNzModules
    ],
    declarations: [
        ManagementComponent,
        ManagementTopbarComponent,
        ManagementNavigationComponent,
        ManagementLayoutComponent,

        ProductCatalogComponent,
        CatalogManagementListComponent,
        CatalogSubCatalogListManagementComponent,
        SubCatalogAddWithInputManagementComponent, //one with input and one without input (so one we go to from router, one we open from nz modal service)
        SubCatalogAddManagementComponent,
        CatalogAddManagementComponent,
        ProductManagementListComponent,

        SaleCouponComponent,
        SaleListManagementComponent,
        SaleListPaginationComponent,
        SaleListManagementProductChipComponent,
        SaleListFilterTopManagementComponent,
        SaleListTableComponent,
        
        CouponListManagementComponent,
        CouponListCouponComponent,
        CouponListCouponPlaceholderComponent,
        CouponListAdvanceFilterComponent,
        CouponListFilterComponent,
        CouponAddModalComponent,

        ProviderStockComponent,
        ProviderListManagementComponent,
        ProviderDetailManagementComponent,

        OrderComponent,
        OrderApproveManagementComponent,
        OrderApproveListManagementComponent,
        OrderApproveItemsManagementComponent,
        OrderApproveOrderManagementComponent
    ],
    exports: []
})
export class ManagementModule {}
