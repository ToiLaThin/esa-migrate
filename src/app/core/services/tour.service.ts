import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GuidedTour, GuidedTourService, Orientation, TourStep } from 'ngx-guided-tour';
import { LayoutClassName } from '../../shopping/class/layout-class';
import { Subject, takeUntil } from 'rxjs';
import { selectorHorizontalOptionExpanded } from '../../shopping/state/ui/ui.selectors';
import { uiShoppingFeatureKey } from '../../shopping/state/ui/ui.reducers';
import { IUIState } from '../../shopping/state/ui/uiState.inteface';
import { tourActions } from '../../shopping/state/tour/tour.actions';
import { authFeatureKey } from '../../auth/state/auth.reducers';
import { IAuthState } from '../../auth/state/authState.interface';
import { selectorAuthStatus } from '../../auth/state/auth.selectors';
import { ProductClassName } from '../../shopping/class/product-class';
import { CartClassName } from '../../shopping/class/cart-class';

@Injectable({
    providedIn: 'root'
})
export class TourService implements OnDestroy {
    //wrapper for ngx-guided-tour service
    constructor(
        private _store: Store,
        private _tourService: GuidedTourService,
        private _router: Router
    ) {
        this.init();
    }

    destroy$: Subject<void> = new Subject<void>();
    optionHorizontalExpanded: boolean = false;
    userLoggedIn: boolean = false;
    completeAllStepsProductTour: boolean = false;

    private init() {
        this._store
            .select((state) =>
                selectorHorizontalOptionExpanded(state as { [uiShoppingFeatureKey]: IUIState })
            )
            .pipe(takeUntil(this.destroy$))
            .subscribe((optHorizontalExpanded) => {
                this.optionHorizontalExpanded = optHorizontalExpanded;
            });
        
        this._store
            .select((state) => selectorAuthStatus(state as { [authFeatureKey]: IAuthState }))
            .pipe(takeUntil(this.destroy$))
            .subscribe((authStatus) => {
                if (authStatus) {
                    this.userLoggedIn = true;
                } else {
                    this.userLoggedIn = false;
                }
            });
    }

    //https://angular.io/api/core/OnDestroy for service
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    //later we can move this to a different file, all callback will be assign in the service
    //since service have dependencies to execute some actions like store and router
    private readonly navBarTour: GuidedTour = {
        tourId: 'navBarTour',
        useOrb: false, //hover on the orb will start tour
        steps: []
    };
    stepsAccessibilities: TourStep[] = [
        {
            title: 'This is the theme toggle',
            content: 'Click here to change theme normal to higher contrast.',
            selector: '.' + LayoutClassName.ShoppingThemeBtn,
            orientation: Orientation.Bottom
        },
        {
            title: '',
            content: 'Now you can toggle theme available for higher contrast',
            selector: '.' + LayoutClassName.ShoppingThemeBtn,
            orientation: Orientation.Bottom
        },
        {
            title: 'This is language toggle',
            content: 'Click here to change language to English or Vietnamese.',
            selector: '.' + LayoutClassName.LanguageBtn,
            orientation: Orientation.Bottom
        },
        {
            title: '',
            content: 'You can see the language changed to English or Vietnamese.',
            selector: '.' + LayoutClassName.LanguageBtn,
            orientation: Orientation.Bottom
        },
        {
            title: '',
            content: 'See!',
            selector: '.' + LayoutClassName.LangChangedText,
            orientation: Orientation.Bottom
        },
        {
            title: 'This is currency toggle',
            content: 'Click here to change currency to USD or VND.',
            selector: '.' + LayoutClassName.CurrencyBtn,
            orientation: Orientation.Bottom
        },
        {
            title: '',
            content: 'You can see the currency changed to USD or VND.',
            selector: '.' + LayoutClassName.CurrencyBtn,
            orientation: Orientation.Bottom
        },
        {
            title: '',
            content: 'See!',
            selector: '.' + LayoutClassName.CurrencyChanged,
            orientation: Orientation.Bottom
        }
    ];
    stepsIfOptionHorizontalNotExpanded: TourStep[] = [
        {
            title: '',
            content: 'Click here to view more actions.',
            selector: '.' + LayoutClassName.BurgerShoppingBtnColor,
            orientation: Orientation.Bottom
        },
        {
            title: '',
            content: 'Now you can see more actions.',
            selector: '.' + LayoutClassName.BurgerShoppingBtnColor,
            orientation: Orientation.Bottom
        }
    ];
    stepsActionsInOptionHorizontal: TourStep[] = [        
        {
            title: 'This is your order',
            content: 'Click here to view your current orders and the one that you bought.',
            selector: '.' + LayoutClassName.YourOrders,
            orientation: Orientation.Bottom
        },
        {
            title: 'This is compare list',
            content: 'Click here to view product you added for comparision.',
            selector: '.' + LayoutClassName.CompareList,
            orientation: Orientation.Bottom
        },
        {
            title: 'This is your bookmarked products',
            content: 'Click here to view product you saved for later.',
            selector: '.' + LayoutClassName.BookmarkProducts,
            orientation: Orientation.Bottom
        }
    ]
    cartStep: TourStep = {
        title: 'This is your cart',
        content: 'Click here to view product you added to cart.',
        selector: '.' + LayoutClassName.CartBtn,
        orientation: Orientation.Bottom
    }
    startShoppingStep: TourStep = {
        title: '',
        content: 'Click here to start shopping.',
        selector: '.' + LayoutClassName.ShoppingNowBtn,
        orientation: Orientation.Bottom
    }

    startNavBarTour() {
        this.stepsAccessibilities[1].action = () => {
            let themeBtn = document.querySelector('.' + LayoutClassName.ShoppingThemeBtn) as HTMLElement;
            themeBtn.click();
        }
        this.stepsAccessibilities[3].action = () => {
            let langBtn = document.querySelector('.' + LayoutClassName.LanguageBtn) as HTMLElement;
            langBtn.click();
        }
        this.stepsAccessibilities[5].action = () => {
            let currencyBtn = document.querySelector('.' + LayoutClassName.CurrencyBtn) as HTMLElement;
            currencyBtn.click();
        }

        this.stepsIfOptionHorizontalNotExpanded[1].action = () => {
            let burgerBtn = document.querySelector('.' + LayoutClassName.BurgerShoppingBtnColor) as HTMLElement;
            burgerBtn.click();
        }

        this.navBarTour.steps = [];
        this.navBarTour.steps = [...this.stepsAccessibilities];
        if (!this.optionHorizontalExpanded) {
            this.navBarTour.steps.splice(this.stepsAccessibilities.length, 0, ...this.stepsIfOptionHorizontalNotExpanded);
        }
        if (this.userLoggedIn) {
            this.navBarTour.steps.push(this.cartStep);
        }
        this.navBarTour.steps.push(...this.stepsActionsInOptionHorizontal);
        this.navBarTour.steps.push(this.startShoppingStep);

        this.navBarTour.completeCallback = () => {
            // this._router.navigate(['/shopping/product-list']); //or this could reside in the effect, which is cleaner, endNavBarTour() will trggier start productTour
            this._store.dispatch(tourActions.endNavBarTour())
        }
        this.navBarTour.skipCallback = () => {
            this._store.dispatch(tourActions.endNavBarTour());
        }
        
        this._tourService.startTour(this.navBarTour);
    }


    private readonly productTour: GuidedTour = {
        tourId: 'productTour',
        useOrb: false,
        steps: []
    };
    stepsProductList: TourStep[] = [
        {
            title: '',
            content: 'This is where all products display.',
            selector: '.' + ProductClassName.ProductListContainer,
            orientation: Orientation.TopLeft
        },
        {
            title: '',
            content: 'Here is where to apply filter products by categories.',
            selector: '.' + ProductClassName.ProductListFilterByContainer,
            orientation: Orientation.TopRight
        },
        {
            title: '',
            content: 'This is all the pages for product.',
            selector: '.' + ProductClassName.ProductListPagination,
            orientation: Orientation.Top
        },
        {
            title: '',
            content: 'This is where to sort and order products.',
            selector: '.' + ProductClassName.ProductListSortOrder,
            orientation: Orientation.Top
        },
        {
            title: '',
            content: 'Click to change view mode.',
            selector: '.' + ProductClassName.ProductListViewModeToggler,
            orientation: Orientation.Bottom
        },
        {
            title: '',
            content: 'View Mode has changed, see.',
            selector: '.' + ProductClassName.ProductListContainer,
            orientation: Orientation.Bottom
        },
        {
            title: '',
            content: 'This is the product card. Click to view the product',
            selector: '.' + ProductClassName.ProductCard,
            orientation: Orientation.Bottom
        },
        {
            title: '',
            content: 'Click to quick view product.',
            selector: '.' + ProductClassName.ProductCard, //first element
            orientation: Orientation.Bottom
        }
    ]

    stepsProductQuickView: TourStep[] = [
        {
            title: '',
            content: 'Click to close the quick view.',
            selector: '.' + ProductClassName.ProductQuickViewClose,
            orientation: Orientation.Bottom
        },
        {
            title: '',
            content: 'Click here to expand the product detail.',
            selector: '.' + ProductClassName.ProductQuickViewExpand,
            orientation: Orientation.Bottom
        },
        {
            title: '',
            content: 'Now we are in the product detail page',
            selector: undefined,
            orientation: Orientation.Bottom
        }
    ]

    stepsProductRating: TourStep[] = [
        {
            title: '',
            content: 'Here are the rating section. Click one star to rate the product.',
            selector: '.' + ProductClassName.ProductRating,
            orientation: Orientation.Top
        }
    ]
    stepsProductDetailInteractions: TourStep[] = [
        {
            title: '',
            content: 'Here are interaction you can make with this product.',
            selector: '.' + ProductClassName.ProductInfoInteractionContainer,
            orientation: Orientation.Top
        },
        {
            title: '',
            content: 'Click here to bookmark | unbookmark the product.',
            selector: '.' + ProductClassName.ProductInfoBookmarkBtn,
            orientation: Orientation.Top
        },
        {
            title: '',
            content: 'Click here to like | dislike | unlike the product.',
            selector: '.' + ProductClassName.ProductInfoLikeInteractionBtn,
            orientation: Orientation.Top
        },
        {
            title: '',
            content: 'Click here to add the product to compare list.',
            selector: '.' + ProductClassName.ProductInfoCompareInteractionBtn,
            orientation: Orientation.Top
        }
    ]

    stepsProductInfoAddToCart: TourStep[] = [
        {
            title: '',
            content: 'Here is product current qty you will add to cart.',
            selector: '.' + ProductClassName.ProductInfoQtyInput,
            orientation: Orientation.Top
        },
        {
            title: '',
            content: 'Increase the quantity you want to add to cart by clicking arrow.',
            selector: '.' + ProductClassName.ProductInfoQtyInput,
            orientation: Orientation.Top
        }, 
        {
            title: '',
            content: 'Click here to add the product to cart.',
            selector: '.' + ProductClassName.ProductInfoAddToCartBtn,
            orientation: Orientation.Top
        },        
    ]


    startProductTour() {
        this.stepsProductList[5].action = () => {
            let productListViewModeToggler = document.querySelector('.' + ProductClassName.ProductListViewModeToggler) as HTMLElement; //first element
            productListViewModeToggler.click();
        }
        this.stepsProductList[7].action = () => {
            let productCard = document.querySelector('.' + ProductClassName.ProductCard) as HTMLElement; //first element
            productCard.click();
        }
        this.stepsProductQuickView[2].action = () => {
            let productQuickViewExpand = document.querySelector('.' + ProductClassName.ProductQuickViewExpand) as HTMLElement;
            productQuickViewExpand.click();
        }
        this.stepsProductInfoAddToCart[1].action = () => {
            let productInfoQtyInput = document.querySelector('.' + ProductClassName.ProductInfoQtyInput) as HTMLInputElement;
            productInfoQtyInput.value = '2';
        }
        this.stepsProductInfoAddToCart[2].action = () => {
            let productInfoAddToCart = document.querySelector('.' + ProductClassName.ProductInfoAddToCartBtn) as HTMLInputElement;
            productInfoAddToCart.click();
        }
        this.productTour.steps = [];
        this.productTour.steps = [...this.stepsProductList];        
        this.productTour.steps.push(...this.stepsProductQuickView);
        //wait for some time to let the page render, otherwise the tour will not work since it cannot find the selector
        setTimeout(() => {
            this._tourService.startTour(this.productTour);
        }, 2000);

        if (this.userLoggedIn) {
            this.productTour.steps.push(...this.stepsProductRating);
        }
        this.productTour.steps.push(...this.stepsProductDetailInteractions);
        this.productTour.steps.push(...this.stepsProductInfoAddToCart);
        this.productTour.completeCallback = () => {
            this.completeAllStepsProductTour = true;
            this._store.dispatch(tourActions.endProductTour());
        }
        this.productTour.skipCallback = () => {
            this.completeAllStepsProductTour = false;
            this._store.dispatch(tourActions.endProductTour());
        }
    }


    private readonly cartTour: GuidedTour = {
        tourId: 'cartTour',
        useOrb: false,
        steps: []
    };
    stepsProductAddedToCart: TourStep[] = [
        {
            title: '',
            content: 'Notice the product has been added to cart. Click here to view the cart.',
            selector: '.' + LayoutClassName.CartBtn,
            orientation: Orientation.Bottom
        },
        {
            title: '',
            content: 'You can see the new product added to cart.',
            selector: '.' + CartClassName.CartItemCard,
            orientation: Orientation.Top
        },
        {
            title: '',
            content: 'Here is the summary of the cart.',
            selector: '.' + CartClassName.CartSummarySection,
            orientation: Orientation.Top
        },
        {
            title: '',
            content: 'Here is the section to apply coupon.',
            selector: '.' + CartClassName.ApplyCouponSection,
            orientation: Orientation.Top
        },
        {
            title: '',
            content: 'Click here to clear all item in the cart.',
            selector: '.' + CartClassName.ClearCartBtn,
            orientation: Orientation.Top
        },
        {
            title: '',
            content: 'Click here to confirm the cart.',
            selector: '.' + CartClassName.CartConfirmBtn,
            orientation: Orientation.Top
        },
        {
            title: '',
            content: 'Click here to remove this item from cart.',
            selector: '.' + CartClassName.RemoveCartItemBtn,
            orientation: Orientation.Top
        },
        {
            title: '',
            content: 'Item removed after click',
            selector: undefined,
            orientation: Orientation.Top
        },
        
    ]
    private stepsFromCartToProductList: TourStep[] = [
        {
            title: '',
            content: 'Click here to continue shopping.',
            selector: '.' + CartClassName.ContinueShoppingBtn,
            orientation: Orientation.Top
        },
        {
            title: '',
            content: 'Now you can add other product to cart.',
            selector: '.' + ProductClassName.ProductListContainer,
            orientation: Orientation.Top
        }
    ]

    startCartTour() {
        this.cartTour.steps = [];
        this.stepsProductAddedToCart[7].action = () => {
            let removeCartItemBtn = document.querySelector('.' + CartClassName.RemoveCartItemBtn) as HTMLElement;
            removeCartItemBtn.click();
        }
        this.stepsFromCartToProductList[0].action = () => {
            let continueShoppingBtn = document.querySelector('.' + CartClassName.ContinueShoppingBtn) as HTMLElement;
            continueShoppingBtn.click();
        }
        if (this.completeAllStepsProductTour) {
            this.cartTour.steps = [...this.stepsProductAddedToCart];
        }
        // if (this.completeAllStepsProductTour === false) {
        //     this._tourService.startTour(this.cartTour);
        //     return;
        // }

        // while (true) {
        //     let loadedCartItems = document.getElementsByClassName(CartClassName.CartItemCard).length > 0;
        //     if (!loadedCartItems) {
        //         setTimeout(() => {}, 2000);
        //         continue;
        //     } 
        //     break;
        // }
        this.cartTour.steps.push(...this.stepsFromCartToProductList);
        this.cartTour.completeCallback = () => {
            this._store.dispatch(tourActions.endCartTour());
        }
        this.cartTour.skipCallback = () => {
            this._store.dispatch(tourActions.endCartTour());
        }
        setTimeout(() => {
            this._tourService.startTour(this.cartTour);
        }, 1000);
    }

    private orderTour: GuidedTour = {
        tourId: 'orderTour',
        useOrb: false,
        steps: []
    }
    private stepsOrderTour: TourStep[] = [
        {
            title: 'This is your order',
            content: 'Click here to view your current orders and the one that you bought.',
            selector: '.' + LayoutClassName.YourOrders,
            orientation: Orientation.Bottom
        },
        {
            title: '',
            content: 'Now you can see your orders.',
            selector: undefined,
            orientation: Orientation.Bottom
        }                
    ]

    stepsComplete: TourStep[] = [
        {
            title: '',
            content: 'Click here to go back to index',
            selector: '.' + LayoutClassName.EsaLogo,
            orientation: Orientation.Bottom
        },
        {
            title: '',
            content: 'Now you are back to index page.',
            selector: undefined,
            orientation: Orientation.Bottom
        },
        {
            title: '',
            content: 'If you have any question. View Tour again by click here.',
            selector: '.' + LayoutClassName.TourBtn,
            orientation: Orientation.Bottom
        }
    ]

    startOrderTour() {        
        if (!this.optionHorizontalExpanded) {
            this.orderTour.steps.splice(0, 0, ...this.stepsIfOptionHorizontalNotExpanded);
        }
        if (this.userLoggedIn) {
            this.orderTour.steps.push(...this.stepsOrderTour);
        }

        this.orderTour.steps.push(...this.stepsComplete);
        this.orderTour.completeCallback = () => {
            this._store.dispatch(tourActions.endOrderTour());
        }
        this.orderTour.skipCallback = () => {
            this._store.dispatch(tourActions.endOrderTour());
        }
        setTimeout(() => {
            this._tourService.startTour(this.orderTour);
        }, 2000);
    }
}
