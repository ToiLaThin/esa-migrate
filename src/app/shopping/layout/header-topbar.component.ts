import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
    OnInit,
    Renderer2,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { AuthStatus } from '../../core/types/auth-status.enum';
import { Store } from '@ngrx/store';
import {
    selectorAuthStatus,
    selectorUserId,
    selectorUserInfo,
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
import { ICatalog, ISubCatalog } from '../../core/models/catalog.interface';
import { selectorAllCatalogs, selectorProductMatchedSearch } from '../state/product/product.selectors';
import { productFeatureKey } from '../state/product/product.reducers';
import { IProductState } from '../state/product/productState.interface';
import { catalogActions, productActions } from '../state/product/product.actions';
import { LayoutClassName } from '../class/layout-class';
import { tourActions } from '../state/tour/tour.actions';
import { IProduct } from '../../core/models/product.interface';
import { IUserInfo } from '../../core/models/account.interface';
import { GgAnalyticsService } from '../../core/services/gg-analytics.service';

@Component({
    selector: 'esa-shopping-header-topbar',
    templateUrl: './header-topbar.component.html'
})
export class HeaderTopbarComponent implements OnInit, OnDestroy, AfterViewInit {
    userName$!: Observable<string>;
    userRole$!: Observable<string>;
    userInfo$!: Observable<IUserInfo | null>;
    userId!: string;
    currentTheme!: ThemeType;
    authStatus$!: Observable<AuthStatus>;
    itemsInCartCount$!: Observable<number>;

    optionHorizontalExpanded$!: Observable<boolean>;
    optionVerticalOpened: boolean = false;
    megaMenuRendered = false;
    trackingOrder$!: Observable<IOrderAggregateCart | null>;
    currencyDatas = currencyDatas;

    destroy$: Subject<void> = new Subject<void>(); //for unsubscribing
    drawerRef: NzDrawerRef | null = null;
    selectedCurrency!: Currency;
    selectedLanguage!: string;
    rewardPoints$!: Observable<number | undefined>;
    allCatalog$!: Observable<ICatalog[]>;

    matchingProductsSearched$!: Observable<IProduct[] | null>;
    @ViewChild('userAvatar', { read: ElementRef }) userAvatar!: ElementRef;
    @ViewChild('optionVertical', { read: ElementRef }) optionVertical!: ElementRef;
    @ViewChild('verticalNavTemplate') verticalNavTemplate!: TemplateRef<any>;

    get LayoutClassName() {
        return LayoutClassName;
    }

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

    get xlScreen() {
        return 1200;
    }
    get lgScreen() {
        return 1024;
    }
    get mdScreen() {
        return 768;
    }
    get smScreen() {
        return 576;
    }

    get windowWidth() {
        return window.innerWidth;
    }

    constructor(
        private _store: Store,
        private _router: Router,
        private _renderer: Renderer2,
        private _drawerService: NzDrawerService,
        private _analyticsService: GgAnalyticsService
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
            if (
                this.optionVerticalOpened &&
                this.optionVertical.nativeElement.contains(event.target)
            ) {
                this.closeOptionHorizontal();
                return;
            }
            if (this.userAvatar.nativeElement.contains(event.target)) {
                this.openOptionHorizontal();
                return;
            }
            this.closeOptionHorizontal();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnInit(): void {
        this.allCatalog$ = this._store.select((state) =>
            selectorAllCatalogs(state as { [productFeatureKey]: IProductState })
        );
        // this.userName$ = this._store.select((state) =>
        //     selectorUserName(state as { [authFeatureKey]: IAuthState })
        // );
        this.userRole$ = this._store.select((state) =>
            selectorUserRole(state as { [authFeatureKey]: IAuthState })
        );
        this.userInfo$ = this._store.select((state) =>
            selectorUserInfo(state as { [authFeatureKey]: IAuthState })
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

        this.matchingProductsSearched$ = this._store.select((state) =>
            selectorProductMatchedSearch(state as { [productFeatureKey]: IProductState })
        );
        console.log('userId', this.userId);

        this._store.dispatch(catalogActions.reloadCatalogs());
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

    renderMegaMenu(render: boolean) {
        this.megaMenuRendered = render;
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
                padding: '0px'
            }
        });
    }
    hideCatalogContainer() {
        let catalogsContainer = document.querySelector('.catalogs-container');
        if (!catalogsContainer) {
            return;
        }
        if (catalogsContainer.classList.contains('h-0')) {
            catalogsContainer.classList.remove('h-0');
            return;
        }
        catalogsContainer.classList.add('h-0');
    }
    toggleSubCatalogsMobileSidebarVertical(event: MouseEvent) {
        let allSubCatalogContainer = document.querySelectorAll('.display-when-click');
        allSubCatalogContainer.forEach((subCatalogContainer) => {
            if (!subCatalogContainer.classList.contains('h-0')) {
                subCatalogContainer.classList.add('h-0');
            }
        });

        let targetCatalog = event.target as HTMLElement;
        let subCatalogs = targetCatalog.querySelector('.display-when-click');
        if (!subCatalogs) {
            return;
        }
        if (subCatalogs.classList.contains('h-0')) {
            subCatalogs.classList.remove('h-0');
            return;
        }
        subCatalogs.classList.add('h-0');
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

    navigateToProductWishList() {
        console.log('navigateToProductWishList');
        this._router.navigate(['/shopping/product-wishlist']);
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

    startTour() {
        this._store.dispatch(tourActions.startNavBarTour());
    }

    searchProduct() {
        let searchInput = document.querySelector('.' + LayoutClassName.GlobalSearchInput) as HTMLInputElement;
        if (!searchInput) {
            return;
        }
        let searchValue = searchInput.value;
        if (searchValue === '') {
            return;
        }
        this._analyticsService.searchFor(searchValue);
        this._store.dispatch(productActions.searchProducts({ searchTerm: searchValue }));
    }

    clearSearch() {
        this._store.dispatch(productActions.clearSearchProducts());
    }

    openProductDetail(productId: string) {
        this._router.navigate(['shopping', 'product-quickview', productId]);
    }
}
