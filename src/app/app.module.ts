import { CommonModule, registerLocaleData } from "@angular/common";
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
import { HttpClientModule, provideHttpClient } from "@angular/common/http";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ShareComponentsModule } from "./share-components/share-components.module";
import { authFeatureKey, authReducer } from "./auth/state/auth.reducers";
import { AuthEffects } from "./auth/state/auth.effects";

registerLocaleData(en);

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        ShareComponentsModule,
        RouterModule.forRoot(appRoutes),
        StoreModule.forRoot({
            [productFeatureKey]: productReducer,
            [authFeatureKey]: authReducer
        }),
        EffectsModule.forRoot([
            ProductEffects,
            AuthEffects
        ]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: !isDevMode(),
            autoPause: true,
            traceLimit: 25
        }),
        FormsModule
    ],
    exports: [],
    bootstrap: [AppComponent],
    providers: [
      { provide: NZ_I18N, useValue: en_US },
      provideAnimationsAsync(),
      provideHttpClient()
    ]
})
export class AppModule {

}