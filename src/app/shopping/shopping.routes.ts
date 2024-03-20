import { Routes } from "@angular/router";
import { ShoppingComponent } from "./shopping.component";
import { IndexComponent } from "./top-pages/index/index.component";
import { ProductListComponent } from "./top-pages/product-list/product-list.component";
import { ProductDetailComponent } from "./top-pages/product-detail/product-detail.component";
import { ProductQuickviewComponent } from "./top-pages/product-quickview/product-quickview.component";

export const shoppingRoutes: Routes = [
    {
        path: '',
        component: ShoppingComponent,
        children: [
            {
                path: '',
                redirectTo: 'index',
                pathMatch: 'full'
            },
            {
                path: 'index',
                component: IndexComponent
            },
            {
                path: 'product-list',
                component: ProductListComponent
            },
            {
                path: 'product-detail/:productId',
                component: ProductDetailComponent,
                pathMatch: 'full'
            },
            {
                path: 'product-quickview/:productId',
                component: ProductQuickviewComponent
            }
        ]
    }
]