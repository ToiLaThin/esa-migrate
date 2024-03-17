import { Routes } from "@angular/router";
import { ShoppingComponent } from "./shopping.component";
import { IndexComponent } from "./top-pages/index/index.component";

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
            }
        ]
    }
]