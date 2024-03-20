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
@NgModule({
    imports: [
        RouterModule.forChild(shoppingRoutes),
        CommonModule, //to have async pipe
        FormsModule, //have ngModel
        ReactiveFormsModule,
        
        ShareComponentsModule,
        NzNotificationModule,
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
        ProductPolicyComponent
    ],
    exports: [],
})
export class ShoppingModule {
}

