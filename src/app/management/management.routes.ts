import { Routes } from "@angular/router";
import { ManagementComponent } from "./management.component";
import { ProductCatalogComponent } from "./tabs/product-catalog/product-catalog.component";
import { CatalogManagementListComponent } from "./components/product-catalog/catalog-list/catalog-list.component";
import { ProductManagementListComponent } from "./components/product-catalog/product-list/product-list.component";
import { CatalogAddManagementComponent } from "./components/product-catalog/catalog-add/catalog-add.component";

export const managementRoutes: Routes = [
    {
        path: '',
        component: ManagementComponent,
        children: [
            {
                path: 'product-catalog',
                component: ProductCatalogComponent,
                outlet: 'primary',                
                children: [
                    {
                        path: '',
                        redirectTo: 'product-list',
                        pathMatch: 'full'
                    },
                    {                                                
                        path: 'product-list',
                        component: ProductManagementListComponent,
                        outlet: 'primary'
                    },
                    {                                                
                        path: 'catalog-list',
                        component: CatalogManagementListComponent,
                        outlet: 'primary'
                    },
                    {
                        path: 'catalog-add',
                        component: CatalogAddManagementComponent,
                        outlet: 'primary'
                    }
                ]
            }
        ]
    }
]