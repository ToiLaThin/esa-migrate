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
@NgModule({
    imports: [
        RouterModule.forChild(managementRoutes),
        ShareComponentsModule,
        CommonModule,

        MatSidenavModule,
        NzToolTipModule
    ],
    declarations: [
        ManagementComponent,
        ManagementTopbarComponent,
        ManagementNavigationComponent,
        ManagementLayoutComponent,

        ProductCatalogComponent,
        CatalogManagementListComponent,
        ProductManagementListComponent,
        CatalogAddManagementComponent

    ],
    exports: []
})
export class ManagementModule {}
