import { Routes } from "@angular/router";
import { ManagementComponent } from "./management.component";
import { ProductCatalogComponent } from "./tabs/product-catalog/product-catalog.component";
import { CatalogManagementListComponent } from "./components/product-catalog/catalog-list/catalog-list.component";
import { ProductManagementListComponent } from "./components/product-catalog/product-list/product-list.component";
import { CatalogAddManagementComponent } from "./components/product-catalog/catalog-add/catalog-add.component";
import { SubCatalogAddManagementComponent } from "./components/product-catalog/subcatalog-add/subcatalog-add.component";
import { SaleCouponComponent } from "./tabs/sale-coupon/sale-coupon.component";
import { CouponListManagementComponent } from "./components/sale-coupon/coupon-list/coupon-list.component";
import { SaleListManagementComponent } from "./components/sale-coupon/sale-list/sale-list.component";
import { ProviderStockComponent } from "./tabs/provider-stock/provider-stock.component";
import { ProviderListManagementComponent } from "./components/provider-stock/provider-list/provider-list.component";
import { ProviderDetailManagementComponent } from "./components/provider-stock/provider-detail/provider-detail.component";
import { OrderComponent } from "./tabs/order/order.component";
import { OrderApproveManagementComponent } from "./components/order/order-approve/order-approve.component";
import { AddStockManagementComponent } from "./components/provider-stock/add-stock/add-stock.component";
import { DashboardComponent } from "./tabs/dashboard/dashboard.component";
import { CartItemDashboardManagementComponent } from "./components/dashboard/cart-item-dashboard/cart-item-dashboard.component";
import { CartOrderDashboardManagementComponent } from "./components/dashboard/cart-order-dashboard/cart-order-dashboard.component";
import { RoleAdminGuard } from "../core/guards/role-admin.guard";

export const managementRoutes: Routes = [
    {
        canActivate: [RoleAdminGuard],
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
                    },
                    {
                        path: 'subcatalog-add',
                        component: SubCatalogAddManagementComponent,
                        outlet: 'primary'
                    }
                ]
            },
            {
                path: 'sale-coupon',
                component: SaleCouponComponent,
                outlet: 'primary',
                children: [
                    {
                        path: '',
                        redirectTo: 'coupon-list',
                        pathMatch: 'full'
                    },
                    {
                        path: 'coupon-list',
                        component: CouponListManagementComponent,
                        outlet: 'primary'
                    },
                    {
                        path: 'sale-list',
                        component: SaleListManagementComponent,
                        outlet: 'primary'
                    }
                ]
            },
            {
                path: 'provider-stock',
                component: ProviderStockComponent,
                outlet: 'primary',
                children: [
                    {
                        path: '',
                        redirectTo: 'provider-list',
                        pathMatch: 'full'
                    },
                    {
                        path: 'provider-list',
                        component: ProviderListManagementComponent,
                        outlet: 'primary'
                    },
                    {
                        path: 'provider-detail',
                        component: ProviderDetailManagementComponent,
                        outlet: 'primary'
                    },
                    {
                        path: 'add-stock',
                        component: AddStockManagementComponent,
                        outlet: 'primary'
                    }
                ]
            }, 
            {
                path: 'order',
                component: OrderComponent,
                outlet: 'primary',
                children: [
                    {
                        path: '',
                        redirectTo: 'order-approve',
                        pathMatch: 'full'
                    },
                    {
                        path: 'order-approve',
                        component: OrderApproveManagementComponent,
                        outlet: 'primary'
                    },
                ]
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                outlet: 'primary',
                children: [
                    {
                        path: '',
                        redirectTo: 'cart-item-dashboard',
                        pathMatch: 'full'
                    },
                    {
                        path: 'cart-item-dashboard',
                        component: CartItemDashboardManagementComponent,
                        outlet: 'primary'
                    },
                    {
                        path: 'cart-order-dashboard',
                        component: CartOrderDashboardManagementComponent,
                        outlet: 'primary'
                    }
                ]
            }
        ]
    }
]