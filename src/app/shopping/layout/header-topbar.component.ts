import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { AuthStatus } from '../../core/types/auth-status.enum';
import { Store } from '@ngrx/store';
import {
    selectorAuthStatus,
    selectorUserId,
    selectorUserName,
    selectorUserRole
} from '../../auth/state/auth.selectors';
import { authFeatureKey } from '../../auth/state/auth.reducers';
import { IAuthState } from '../../auth/state/authState.interface';
import { authActions } from '../../auth/state/auth.actions';
import { selectorItemsInCartCount } from '../state/cart/cart.selectors';
import { cartFeatureKey } from '../state/cart/cart.reducers';
import { ICartState } from '../state/cart/cartState.interface';
import { IOrderAggregateCart } from '../../core/models/order.interface';
import { selectorTrackingOrder } from '../state/order/order.selectors';
import { IOrderState } from '../state/order/orderState.interface';
import { orderFeatureKey } from '../state/order/order.reducers';
import { orderActions } from '../state/order/order.actions';
import { ColorSvgNames } from '../../share-components/svg-definitions/color-svg-names.enum';
import { Router } from '@angular/router';
import { currencyDatas } from '../../core/ui-models/currency-data';
import { Currency } from '../../core/types/currency.enum';
import {
    selectorCurrencySelected,
    selectorLanguageSelected,
    selectorThemeSelected,
    selectorUserRewardPoints
} from '../../management/state/management/management.selectors';
import { managementFeatureKey } from '../../management/state/management/management.reducers';
import { IManagementState } from '../../management/state/management/managementState.interface';
import { managementActions } from '../../management/state/management/management.actions';
import { I18NLayoutIdSelector } from '../translate-ids/i18n-layout-id';
import { ThemeType } from '../../core/ui-models/theme-type';
import { selectorHorizontalOptionExpanded } from '../state/ui/ui.selectors';
import { uiShoppingFeatureKey } from '../state/ui/ui.reducers';
import { IUIState } from '../state/ui/uiState.inteface';
import { uiShoppingActions } from '../state/ui/ui.actions';
import { OutlineSvgNames } from '../../share-components/svg-definitions/outline-svg-names.enum';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
    selector: 'esa-shopping-header-topbar',
    templateUrl: './header-topbar.component.html'
})
export class HeaderTopbarComponent implements OnInit, OnDestroy, AfterViewInit {
    userName$!: Observable<string>;
    userRole$!: Observable<string>;
    userId!: string;
    currentTheme!: ThemeType;
    authStatus$!: Observable<AuthStatus>;
    itemsInCartCount$!: Observable<number>;

    optionHorizontalExpanded$!:Observable<boolean>;
    optionVerticalOpened: boolean = false;
    trackingOrder$!: Observable<IOrderAggregateCart | null>;
    currencyDatas = currencyDatas;

    destroy$: Subject<void> = new Subject<void>(); //for unsubscribing
    drawerRef: NzDrawerRef | null = null;
    selectedCurrency!: Currency;
    selectedLanguage!: string;
    rewardPoints$!: Observable<number | undefined>;

    @ViewChild('userAvatar', {read: ElementRef}) userAvatar!: ElementRef;
    @ViewChild('optionVertical', {read: ElementRef}) optionVertical!: ElementRef;
    @ViewChild('verticalNavTemplate') verticalNavTemplate!: TemplateRef<any>;

    get AuthStatus() {
        return AuthStatus;
    } //for template to use enum

    get ColorSvgNames() {
        return ColorSvgNames;
    }

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
    get ThemeType() {
        return ThemeType;
    }

    get I18NLayoutIds() {
        return I18NLayoutIdSelector;
    }

    constructor(
        private _store: Store,
        private _router: Router,
        private _renderer: Renderer2,
        private _drawerService: NzDrawerService
    ) {}

    ngAfterViewInit(): void {
        if (!this.userAvatar) {
            return;
        }
        // this._renderer.listen(this.userAvatar.nativeElement, 'click', () => {
        //     if (this.optionVerticalOpened) {
        //         this.closeOptionHorizontal();
        //         return;
        //     }
        //     this.openOptionHorizontal();
        // });
        this._renderer.listen('window', 'click', (event) => {
            if (event.target === this.userAvatar.nativeElement) {
                this.openOptionHorizontal();
                return;
            }    
            if (this.optionVerticalOpened && this.optionVertical.nativeElement.contains(event.target)) {
                this.closeOptionHorizontal();
                return;
            }
            if (this.userAvatar.nativeElement.contains(event.target)) {
                this.openOptionHorizontal();
                return;
            };
            this.closeOptionHorizontal();
        });
    }


    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnInit(): void {
        this.userName$ = this._store.select((state) =>
            selectorUserName(state as { [authFeatureKey]: IAuthState })
        );
        this.userRole$ = this._store.select((state) =>
            selectorUserRole(state as { [authFeatureKey]: IAuthState })
        );
        this.authStatus$ = this._store.select((state) =>
            selectorAuthStatus(state as { [authFeatureKey]: IAuthState })
        );
        this.itemsInCartCount$ = this._store.select((state) =>
            selectorItemsInCartCount(state as { [cartFeatureKey]: ICartState })
        );
        this.trackingOrder$ = this._store.select((state) =>
            selectorTrackingOrder(state as { [orderFeatureKey]: IOrderState })
        );
        this.optionHorizontalExpanded$ = this._store.select((state) =>
            selectorHorizontalOptionExpanded(state as { [uiShoppingFeatureKey]: IUIState })
        );
        this._store
            .select((state) =>
                selectorCurrencySelected(state as { [managementFeatureKey]: IManagementState })
            )
            .pipe(
                tap((currency) => (this.selectedCurrency = currency)),
                takeUntil(this.destroy$)
            )
            .subscribe();

        this._store
            .select((state) =>
                selectorThemeSelected(state as { [managementFeatureKey]: IManagementState })
            )
            .pipe(
                tap((theme) => (this.currentTheme = theme)),
                takeUntil(this.destroy$)
            )
            .subscribe();

        this._store
            .select((state) =>
                selectorLanguageSelected(state as { [managementFeatureKey]: IManagementState })
            )
            .pipe(
                tap((language) => (this.selectedLanguage = language)),
                takeUntil(this.destroy$)
            )
            .subscribe();

        this._store
            .select((state) => selectorUserId(state as { [authFeatureKey]: IAuthState }))
            .pipe(
                tap((uId) => (this.userId = uId)),
                takeUntil(this.destroy$)
            )
            .subscribe();

        this.rewardPoints$ = this._store.select((state) =>
            selectorUserRewardPoints(state as { [managementFeatureKey]: IManagementState })
        );

        console.log('userId', this.userId);

        if (this.userId && this.userId !== '') {
            this._store.dispatch(managementActions.loadUserRewardPoints({ userId: this.userId }));
        }
    }

    login() {
        this._store.dispatch(authActions.loginAttempted());
    }

    logout() {
        this._store.dispatch(authActions.logoutAttempted());
    }

    openOptionHorizontal() {
        if (this.optionVerticalOpened) {
            return;
        }
        this.optionVerticalOpened = true;
    }

    closeOptionHorizontal() {
        if (this.optionVerticalOpened === false) {
            return;
        }
        this.optionVerticalOpened = false;
    }

    toggleOptionHorizontal() {
        this._store.dispatch(uiShoppingActions.toggleOptionHorizontalExpanded());
    }

    toggleVerticalNav() {
        this.drawerRef = this._drawerService.create({
            nzClosable: false,
            nzTitle: undefined,
            nzContent: this.verticalNavTemplate,
            nzFooter: undefined,
            nzPlacement: 'left',
            nzWidth: '100%',
            nzBodyStyle: {
                'padding': '0px'
            }
        });
    }

    closeDrawerRef() {
        if (this.drawerRef) {
            this.drawerRef.close();
        }
        this.drawerRef = null;
    }

    continueOrderingProcess() {
        this._store.dispatch(orderActions.continueCurrentTrackingOrderProcess());
    }

    navigateToOrderList() {
        console.log('navigateToOrderList');
        this._router.navigate(['/shopping/order-list']);
    }

    changeTheme(newTheme: ThemeType) {
        if (this.currentTheme !== newTheme) {
            this._store.dispatch(managementActions.changeTheme({ newTheme: newTheme }));
        }
    }

    changeCurrency(clickedCurrency: Currency) {
        console.log('currenCurrency', this.selectedCurrency);
        console.log('changeCurrency', clickedCurrency);
        if (this.selectedCurrency !== clickedCurrency) {
            this._store.dispatch(
                managementActions.changeCurrency({ newCurrency: clickedCurrency })
            );
        }
    }

    changeLanguage(language: 'vi' | 'en') {
        console.log('currentLanguage', this.selectedLanguage);
        console.log('changeLanguage', language);
        if (this.selectedLanguage !== language) {
            this._store.dispatch(managementActions.changeLanguage({ newLanguage: language }));
        }
    }
}
