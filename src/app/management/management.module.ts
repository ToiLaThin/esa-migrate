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
import { SubCatalogAddManagementComponent } from './components/product-catalog/subcatalog-add/subcatalog-addcomponent';
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
        ProductManagementListComponent,
        CatalogAddManagementComponent,
        SubCatalogAddManagementComponent,

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

    ],
    exports: []
})
export class ManagementModule {}
