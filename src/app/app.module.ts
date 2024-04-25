import { CommonModule, registerLocaleData } from "@angular/common";
import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./app.routes";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ProductEffects } from "./shopping/state/product/product.effects";
import { productFeatureKey, productReducer } from "./shopping/state/product/product.reducers";
import { HttpClient, HttpClientModule, provideHttpClient } from "@angular/common/http";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ShareComponentsModule } from "./share-components/share-components.module";
import { authFeatureKey, authReducer } from "./auth/state/auth.reducers";
import { AuthEffects } from "./auth/state/auth.effects";
import { cartFeatureKey, cartReducer } from "./shopping/state/cart/cart.reducers";
import { CartEffects } from "./shopping/state/cart/cart.effects";
import { managementFeatureKey, managementReducer } from "./management/state/management/management.reducers";
import { SaleCouponManagementEffects } from "./management/state/sale-coupon-management/sale-coupon-management.effects";
import { ProductCatalogManagementEffects } from "./management/state/product-catalog-management/product-catalog-management.effects";
import { productCatalogManagementFeatureKey, productCatalogManagementReducer } from "./management/state/product-catalog-management/product-catalog-management.reducers";
import { ProductCatalogManagementShareEffects } from "./management/state/management/product-catalog-share-management.effect";
import { saleCouponManagementFeatureKey, saleCouponManagementReducer } from "./management/state/sale-coupon-management/sale-coupon-management.reducers";
import { ProviderStockManagementEffects } from "./management/state/provider-stock/provider-stock.effects";
import { providerStockManagementFeatureKey, providerStockManagementReducer } from "./management/state/provider-stock/provider-stock.reducers";
import { OrderManagementEffect } from "./management/state/order/order.effects";
import { orderManagementFeatureKey, orderManagementReducer } from "./management/state/order/order.reducers";
import { OrderEffects } from "./shopping/state/order/order.effects";
import { orderFeatureKey, orderReducer } from "./shopping/state/order/order.reducers";
import { ManagementEffects } from "./management/state/management/management.effects";
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MultiFilesTranslationLoader } from "./core/translation-loader/multi-files-translation.loader";
import { uiShoppingFeatureKey, uiShoppingReducer } from "./shopping/state/ui/ui.reducers";
import { GuidedTourModule, GuidedTourService } from "ngx-guided-tour";
import { TourEffects } from "./shopping/state/tour/tour.effects";
import { tourFeatureKey, tourReducer } from "./shopping/state/tour/tour.reducers";

registerLocaleData(en);

@NgModule({
    declarations: [AppComponent],
    //https://github.com/ngx-translate/core/issues/1193
    imports: [
        //translate ngx-translate
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                //factory method to create the loader
                useFactory: (http: HttpClient) => {
                    return new MultiFilesTranslationLoader(http, {
                        transfiles: [],
                        includeCommonFile: false,
                    });
                },
                deps: [HttpClient],
            },
            // isolate: false, //lazy module can extend the translation of parent
            isolate: true, //each module has its own translation
        }),

        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ShareComponentsModule,
        RouterModule.forRoot(appRoutes),
        StoreModule.forRoot({
            [productFeatureKey]: productReducer,
            [authFeatureKey]: authReducer,
            [cartFeatureKey]: cartReducer,
            [managementFeatureKey]: managementReducer,
            [productCatalogManagementFeatureKey]: productCatalogManagementReducer,
            [saleCouponManagementFeatureKey]: saleCouponManagementReducer,
            [providerStockManagementFeatureKey]: providerStockManagementReducer,
            [orderManagementFeatureKey]: orderManagementReducer,
            [orderFeatureKey]: orderReducer,
            [uiShoppingFeatureKey]: uiShoppingReducer,
            [tourFeatureKey]: tourReducer
        }),
        EffectsModule.forRoot([
            ProductEffects,
            AuthEffects,
            CartEffects,
            OrderEffects,
            SaleCouponManagementEffects,
            ProductCatalogManagementEffects,
            ProductCatalogManagementShareEffects,
            ProviderStockManagementEffects,
            OrderManagementEffect,
            ManagementEffects,
            TourEffects
        ]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: !isDevMode(),
            autoPause: true,
            traceLimit: 25
        }),
        FormsModule,    
        GuidedTourModule,    
    ],
    exports: [],
    bootstrap: [AppComponent],
    providers: [
        GuidedTourService,//ngx-guided-tour
        { provide: NZ_I18N, useValue: en_US },
        provideAnimationsAsync(),
        provideHttpClient(),
        //provideAnimationsAsync('noop') this line cause animation not working
    ]
})
export class AppModule {}