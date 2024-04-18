import { NgModule } from "@angular/core";
import { shoppingRoutes } from "./shopping.routes";
import { RouterModule } from "@angular/router";
import { HeaderTopbarComponent } from "./layout/header-topbar.component";
import { FooterComponent } from "./layout/footer.component";
import { ShoppingComponent } from "./shopping.component";
import { IndexComponent } from "./top-pages/index/index.component";
import { BannerComponent } from "./components/index/banner/banner.component";
import { CatalogCardComponent } from "./components/index/catalog-card/catalog-card.component";
import { ProductCardComponent } from "./share-components/product-card.component";
import { TestimonialCardComponent } from "./components/index/testimonial-card/testimonial-card.component";
import { FeatureCardComponent } from "./components/index/feature-card/feature-card.component";
import { ProductListComponent } from "./top-pages/product-list/product-list.component";
import { ProductFilterByComponent } from "./components/product/product-list-filter-by/product-filter-by.component";
import { ProductListCardComponent } from "./share-components/product-list-card.component";
import { BreadCrumbComponent } from "./share-components/breadcrumb.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NzNotificationModule } from 'ng-zorro-antd/notification'
import { ProductDetailComponent } from "./top-pages/product-detail/product-detail.component";
import { ProductQuickviewComponent } from "./top-pages/product-quickview/product-quickview.component";
import { ProductInfoComponent } from "./components/product/product-info/product-info.component";
import { ShareComponentsModule } from "../share-components/share-components.module";
import { ProductPolicyComponent } from "./components/product/product-policy/product-policy.component";
import { CartComponent } from "./top-pages/cart/cart.component";
import { OrderProcessComponent } from "./top-pages/order-process/order-process.component";
import { OrderListComponent } from "./top-pages/order-list/order-list.component";
import { OrderTrackingCustomerInfoComponent } from "./components/order-process/order-tracking-customer-info/order-tracking-customer-info.component";
import { OrderTrackingNotifyCustomerComponent } from "./components/order-process/order-tracking-notify-customer/order-tracking-notify-customer.component";
import { OrderTrackingPaymentMethodsComponent } from "./components/order-process/order-tracking-payment-methods/order-tracking-payment-methods.component";
import { OrderTrackingStepperComponent } from "./components/order-process/order-tracking-stepper/order-tracking-stepper.component";
import { OrderListCardComponent } from "./components/order-list/order-list-card/order-list-card.component";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { OrderListSortByComponent } from "./components/order-list/order-list-sort-by/order-list-sort-by.component";
import { OrderListSortTypeComponent } from "./components/order-list/order-list-sort-type/order-list-sort-type.component";
import { OrderListNumPerPageComponent } from "./components/order-list/order-list-num-per-page/order-list-num-per-page.component";
import { OrderListPaymentMethodComponent } from "./components/order-list/order-list-payment-method/order-list-payment-method.component";
import { OrderListPaginationComponent } from "./components/order-list/order-list-pagination/order-list-pagination.component";
import { ProductCommentComponent } from "./components/product/product-comment/product-comment.component";
import { ProductCommentFormComponent } from "./components/product/product-comment-form/product-comment-form.component";
import { ProductInfoRatingComponent } from "./components/product/product-info-rating/product-info-rating.component";
import { ReactiveCurrencyPipe } from "../core/pipes/reactive-currency.pipe";
import { OrderDetailDrawerComponent } from "./components/order-list/order-detail-drawer/order-detail-drawer.component";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { OrderDetailModalComponent } from "./components/order-process/order-detail-modal/order-detail-modal.component";
import { NzModalModule } from "ng-zorro-antd/modal";
import { TranslateLoader, TranslateModule, TranslatePipe } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MultiFilesTranslationLoader } from "../core/translation-loader/multi-files-translation.loader";

@NgModule({
    //https://github.com/ngx-translate/core/issues/1193
    imports: [
        //pipes
        ReactiveCurrencyPipe,
        //so that translate pipe can be used in template
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => {
                    return new MultiFilesTranslationLoader(http, {
                        transfiles: [
                            {
                                prefix: 'assets/i18n/shopping',
                                suffix: 'layout',
                                extension: 'json'
                            }
                        ],
                        includeCommonFile: true,
                    });
                },
                deps: [HttpClient]
            },
            //extend the parent module translation
            //when we switch language, the module is not reloaded
            //so the transfile of the new language is not loaded
            // extend: true,

            //follow this post: https://medium.com/@TuiZ/how-to-split-your-i18n-file-per-lazy-loaded-module-with-ngx-translate-3caef57a738f
            //we have multiple translation service instance for each module, and use state management
            //so when we switch language, we need to notify all module reload the module to get the new translation
            //see in the shopping.component.ts, we can make root module import nothing, all import happen in the lazy modules
            isolate: true
        }),

        RouterModule.forChild(shoppingRoutes),
        CommonModule, //to have async pipe
        FormsModule, //have ngModel
        ReactiveFormsModule,
        ShareComponentsModule,
        NzNotificationModule,
        NzToolTipModule,
        NzDropDownModule,
        NzCheckboxModule,
        NzDrawerModule,
        NzModalModule
    ],
    declarations: [
        ShoppingComponent,
        HeaderTopbarComponent,
        FooterComponent,
        IndexComponent,
        BannerComponent,
        CatalogCardComponent,
        ProductCardComponent,
        ProductListCardComponent,
        BreadCrumbComponent,
        TestimonialCardComponent,
        FeatureCardComponent,

        ProductListComponent,
        ProductFilterByComponent,

        ProductDetailComponent,
        ProductQuickviewComponent,
        ProductInfoComponent,
        ProductInfoRatingComponent,
        ProductPolicyComponent,
        ProductCommentComponent,
        ProductCommentFormComponent,

        CartComponent,
        OrderProcessComponent,
        OrderTrackingCustomerInfoComponent,
        OrderTrackingNotifyCustomerComponent,
        OrderTrackingPaymentMethodsComponent,
        OrderTrackingStepperComponent,

        OrderListComponent,
        OrderListCardComponent,
        OrderListSortByComponent,
        OrderListSortTypeComponent,
        OrderListPaymentMethodComponent,
        OrderListNumPerPageComponent,
        OrderListPaginationComponent,
        OrderDetailDrawerComponent,
        OrderDetailModalComponent
    ],
    exports: []
})
export class ShoppingModule {}

