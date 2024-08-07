import { Routes } from "@angular/router";
import { ShoppingComponent } from "./shopping.component";
import { IndexComponent } from "./top-pages/index/index.component";
import { ProductListComponent } from "./top-pages/product-list/product-list.component";
import { ProductDetailComponent } from "./top-pages/product-detail/product-detail.component";
import { ProductQuickviewComponent } from "./top-pages/product-quickview/product-quickview.component";
import { CartComponent } from "./top-pages/cart/cart.component";
import { OrderListComponent } from "./top-pages/order-list/order-list.component";
import { OrderProcessComponent } from "./top-pages/order-process/order-process.component";
import { OrderTrackingCustomerInfoComponent } from "./components/order-process/order-tracking-customer-info/order-tracking-customer-info.component";
import { OrderTrackingPaymentMethodsComponent } from "./components/order-process/order-tracking-payment-methods/order-tracking-payment-methods.component";
import { OrderTrackingNotifyCustomerComponent } from "./components/order-process/order-tracking-notify-customer/order-tracking-notify-customer.component";
import { AuthenticatedRequiredGuard } from "../core/guards/authenticated-required.guard";
import { ProductCompareComponent } from "./top-pages/product-compare/product-compare.component";
import { AccountComponent } from "./top-pages/account/account.component";
import { RoleAdminGuard } from "../core/guards/role-admin.guard";
import { ProductWishListComponent } from "./top-pages/product-wishlist/product-wishlist.component";
import { RoleInitRedirectGuard } from "../core/guards/role-init-redirect.guard";
import { CheckoutCreditRedirectComponent } from "./components/order-process/checkout-credit-redirect/checkout-credit-redirect.component";

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
                canActivate: [RoleInitRedirectGuard],
                component: IndexComponent
            },
            {                
                path: 'product-list',
                component: ProductListComponent
            },
            {
                path: 'product-compare',
                component: ProductCompareComponent
            },
            {
                canActivate: [AuthenticatedRequiredGuard],
                path: 'product-wishlist',
                component: ProductWishListComponent
            },
            {
                path: 'product-detail/:productId',
                component: ProductDetailComponent,
                pathMatch: 'full'
            },
            {
                path: 'product-quickview/:productId',
                component: ProductQuickviewComponent
            },
            {
                path: 'cart',
                component: CartComponent
            },
            {
                canActivate: [AuthenticatedRequiredGuard],
                path: 'order-list',
                component: OrderListComponent
            },
            {
                canActivate: [AuthenticatedRequiredGuard],
                path: 'account',
                component: AccountComponent
            },
            {
                canActivate: [AuthenticatedRequiredGuard],
                path: 'order-process',
                component: OrderProcessComponent,
                children: [
                    {
                        path: 'checkout-credit-redirect',
                        component: CheckoutCreditRedirectComponent
                    },
                    {
                        path: 'customer-info',
                        component: OrderTrackingCustomerInfoComponent
                    },
                    {
                        path: 'payment-methods',
                        component: OrderTrackingPaymentMethodsComponent
                    },
                    {
                        path: 'notify-customer',
                        component: OrderTrackingNotifyCustomerComponent
                    }

                ]
            }
        ]
    }
]