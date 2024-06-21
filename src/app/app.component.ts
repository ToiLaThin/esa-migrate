import { Component, Inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { cartActions } from './shopping/state/cart/cart.actions';
import { orderActions } from './shopping/state/order/order.actions';
import { authActions } from './auth/state/auth.actions';
import { TranslateService } from '@ngx-translate/core';
import { managementActions } from './management/state/management/management.actions';
import { productActions } from './shopping/state/product/product.actions';
import { ProgressIndicatorLocation } from 'ngx-guided-tour';
import { ActivatedRoute, NavigationEnd, Router, RouterState } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { GgAnalyticsService } from './core/services/gg-analytics.service';
import { Subscription } from 'rxjs';
import { OnInit } from '@angular/core';

declare var gtag : any;

@Component({
    selector: 'esa-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'esa-migrate'; //this will be replaced by the title service

    get ProgressIndicatorLocation() {
        return ProgressIndicatorLocation;
    }
    
    routerEventsSubscription!: Subscription;
    constructor(
        private _store: Store, 
        private _translateService: TranslateService, 
        private _analyticsService: GgAnalyticsService,
        private _router: Router,
        private _titleService: Title,
        @Inject(DOCUMENT) private document: Document) 
    {
        // or we can use interval rxjs operator 
        // in auth.effects.ts startCheckSessionEffect
        
        // setInterval(() => {
        //     console.log('checking session');
        //     this._store.dispatch(authActions.checkSession());
        // }, env.loginCheckInterval);
        this._store.dispatch(authActions.bootstrapAuth());
        this._store.dispatch(cartActions.loadCartItemsFromStorage());
        this._store.dispatch(orderActions.loadTrackingOrderFromStorage());
        this._store.dispatch(managementActions.loadThemeFromStorage());
        this._store.dispatch(managementActions.loadCurrencyFromStorage());
        this._store.dispatch(productActions.loadProductCompareIdListFromStorage());
        
        this._translateService.setDefaultLang('en');
        this._store.dispatch(managementActions.loadLanguageFromStorage());        
        
    }

    ngOnDestroy(): void {
        this.routerEventsSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.handleRouterEvents();
    }

    handleRouterEvents() {
        this.routerEventsSubscription = this._router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            const title = this.getTitleSegments(
                this._router.routerState, 
                this._router.routerState.root
            ).join('-');
            this._titleService.setTitle(title);
            this._analyticsService.viewPage(
                title, 
                event.urlAfterRedirects, 
                this.document.location.href
            );            
          }
        });
      }

    //[parent, child, child, child]
    private getTitleSegments(state: RouterState, parent: ActivatedRoute): string[] {
        const data = [];
        if (parent && parent.snapshot.data && parent.snapshot.data['title']) {
          data.push(parent.snapshot.data['title']);
        }
        if (state && parent && parent.firstChild) {
          data.push(...this.getTitleSegments(state, parent.firstChild));
        }
        return data;
      }
}
