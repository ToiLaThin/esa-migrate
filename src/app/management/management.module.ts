import { NgModule } from "@angular/core";
import { managementRoutes } from "./management.routes";
import { RouterModule } from "@angular/router";
import { ShareComponentsModule } from "../share-components/share-components.module";
import { CommonModule } from "@angular/common";
import { ManagementComponent } from "./management.component";
import { ManagementHeaderComponent } from "./layout/management-header.component";
import { ManagementNavigationComponent } from "./layout/management-navigation.component";
import { ManagementLayoutComponent } from "./layout/management-layout.component";
import { ProductCatalogComponent } from "./tabs/product-catalog/product-catalog.component";
import { ProductManagementListComponent } from "./components/product-catalog/product-list/product-list.component";
import {MatSidenavModule} from '@angular/material/sidenav';
@NgModule({
    imports: [
        RouterModule.forChild(managementRoutes),
        ShareComponentsModule,
        CommonModule,

        MatSidenavModule,
    ],
    declarations: [
        ManagementComponent,
        ManagementHeaderComponent,
        ManagementNavigationComponent,
        ManagementLayoutComponent,

        ProductCatalogComponent,
        ProductManagementListComponent
    ],
    exports: [],
})
export class ManagementModule {
}

