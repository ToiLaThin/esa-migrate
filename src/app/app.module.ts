import { CommonModule } from "@angular/common";
import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./app.routes";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
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