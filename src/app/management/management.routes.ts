import { Routes } from "@angular/router";
import { ManagementComponent } from "./management.component";
import { ProductCatalogComponent } from "./tabs/product-catalog/product-catalog.component";
import { ProductManagementListComponent } from "./components/product-catalog/product-list/product-list.component";

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
                    }
                ]
            }
        ]
    }
]