import { NgModule } from "@angular/core";
import { shoppingRoutes } from "./shopping.routes";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        RouterModule.forChild(shoppingRoutes)
    ],
    declarations: [],
    exports: [],
})
export class ShoppingModule {
}

