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
            },
            {
                path: 'cart',
                component: CartComponent
            },
            {
                path: 'order-list',
                component: OrderListComponent
            },
            {
                path: 'order-process',
                component: OrderProcessComponent,
                children: [
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