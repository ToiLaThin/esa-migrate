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

@NgModule({
    imports: [
        RouterModule.forChild(shoppingRoutes)
    ],
    declarations: [
        ShoppingComponent,
        HeaderTopbarComponent,        
        FooterComponent,
        IndexComponent,
        BannerComponent,
        CatalogCardComponent,
        ProductCardComponent,
        TestimonialCardComponent,
        FeatureCardComponent
    ],
    exports: [],
})
export class ShoppingModule {
}

