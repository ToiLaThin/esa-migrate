import { NgModule } from "@angular/core";
import { shoppingRoutes } from "./shopping.routes";
import { RouterModule } from "@angular/router";
import { HeaderTopbarComponent } from "./layout/header-topbar.component";
import { FooterComponent } from "./layout/footer.component";
import { ShoppingComponent } from "./shopping.component";

@NgModule({
    imports: [
        RouterModule.forChild(shoppingRoutes)
    ],
    declarations: [
        ShoppingComponent,
        HeaderTopbarComponent,
        FooterComponent
    ],
    exports: [],
})
export class ShoppingModule {
}

