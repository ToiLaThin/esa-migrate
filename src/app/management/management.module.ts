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

@NgModule({
    imports: [
        RouterModule.forChild(managementRoutes),
        ShareComponentsModule,
        CommonModule,

        MatSidenavModule,
        NzToolTipModule,
        NzModalModule,
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
        CouponListManagementComponent,
        CouponAddModalComponent
    ],
    exports: []
})
export class ManagementModule {}
