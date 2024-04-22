import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { cartActions } from './shopping/state/cart/cart.actions';
import { orderActions } from './shopping/state/order/order.actions';
import { authActions } from './auth/state/auth.actions';
import { TranslateService } from '@ngx-translate/core';
import { managementActions } from './management/state/management/management.actions';
import { selectorThemeSelected } from './management/state/management/management.selectors';
import { managementFeatureKey } from './management/state/management/management.reducers';
import { IManagementState } from './management/state/management/managementState.interface';
import { ThemeType } from './core/ui-models/theme-type';
import { tap } from 'rxjs';

@Component({
    selector: 'esa-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'esa-migrate';

    constructor(private _store: Store, private _translateService: TranslateService) {
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
        
        this._translateService.setDefaultLang('en');
        this._store.dispatch(managementActions.loadLanguageFromStorage());
    }

    toggleTheme() {
        let currentTheme!: ThemeType;
        let currentThemeSub = this._store
            .select((state) =>
                selectorThemeSelected(state as { [managementFeatureKey]: IManagementState })
            )
            .pipe(tap((theme) => (currentTheme = theme)))
            .subscribe();
        currentThemeSub.unsubscribe();

        if (currentTheme == ThemeType.LIGHT) {
            this._store.dispatch(managementActions.changeTheme({ newTheme: ThemeType.DARK }));
            return;
        }
        this._store.dispatch(managementActions.changeTheme({ newTheme: ThemeType.LIGHT }));
    }
}
