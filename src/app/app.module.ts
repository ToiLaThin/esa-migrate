import { CommonModule } from "@angular/common";
import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./app.routes";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ProductEffects } from "./shopping/state/product/product.effects";
import { productFeatureKey, productReducer } from "./shopping/state/product/product.reducers";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        StoreModule.forRoot({
            [productFeatureKey]: productReducer
        }),
        EffectsModule.forRoot([
            ProductEffects
        ]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: !isDevMode(),
            autoPause: true,
            traceLimit: 25
        })
    ],
    declarations: [AppComponent],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}