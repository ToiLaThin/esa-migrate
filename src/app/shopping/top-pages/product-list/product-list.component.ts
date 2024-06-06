import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { productActions } from '../../state/product/product.actions';
import {
    IProduct,
    OrderType,
    ProductPerPage,
    SortBy
} from '../../../core/models/product.interface';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { productFeatureKey } from '../../state/product/product.reducers';
import { IProductState } from '../../state/product/productState.interface';
import {
    selectorDisplayingProductCount,
    selectorDisplayingProducts,
    selectorPageCount,
    selectorRecommendedProducts,
    selectorSelectedCatalog
} from '../../state/product/product.selectors';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { ProductClassName } from '../../class/product-class';
import { ICatalog } from '../../../core/models/catalog.interface';
import { I18NProductIdSelector } from '../../translate-ids/i18n-product-id';
import { selectorUserId } from '../../../auth/state/auth.selectors';
import { authFeatureKey } from '../../../auth/state/auth.reducers';
import { IAuthState } from '../../../auth/state/authState.interface';

@Component({
    selector: 'esa-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    productCardView: boolean = true;
    displayingProducts$!: Observable<IProduct[]>;
    displayingProductsCount$!: Observable<number>;
    selectedCatalog$!: Observable<ICatalog | undefined>;
    totalPage$!: Observable<number>;
    totalPageAsArray$!: Observable<number[]>;
    recommendedProducts$!: Observable<IProduct[]>;
    userId!: string;
    destroy$ = new Subject<void>();

    numProductPerPageEnums = Object.keys(ProductPerPage)
        .filter((k) => !isNaN(parseInt(k)))
        .map((k) => ({
            key: k,
            value: k
        }));
    sortByEnums = Object.keys(SortBy)
        .filter((k) => !isNaN(parseInt(k)))
        .map((k) => ({
            key: k,
            value: SortBy[k as any]
        }));
    orderTypeEnums = Object.keys(OrderType)
        .filter((k) => !isNaN(parseInt(k)))
        .map((k) => ({
            key: k,
            value: OrderType[k as any]
        }));

    get ProductClassName() {
        return ProductClassName;
    }

    get I18NProductIds() {
        return I18NProductIdSelector;
    }
    
    constructor(
        private _store: Store,
        private _notificationService: NzNotificationService,
        private _router: Router
    ) {
        this._store.dispatch(productActions.reloadProducts());
    }

    ngOnInit(): void {
        this.displayingProducts$ = this._store.select((state) =>
            selectorDisplayingProducts(state as { [productFeatureKey]: IProductState })
        );
        this.totalPage$ = this._store.select((state) =>
            selectorPageCount(state as { [productFeatureKey]: IProductState })
        );
        this.totalPageAsArray$ = this.totalPage$.pipe(
            map((totalPage) =>
                Array(totalPage)
                    .fill(1)
                    .map((x, i) => i + 1)
            )
        );
        this.displayingProductsCount$ = this._store.select((state) =>
            selectorDisplayingProductCount(state as { [productFeatureKey]: IProductState })
        );
        this.selectedCatalog$ = this._store.select((state) =>
            selectorSelectedCatalog(state as { [productFeatureKey]: IProductState })
        );

        this.recommendedProducts$ = this._store.select((state) =>
            selectorRecommendedProducts(state as { [productFeatureKey]: IProductState })
        );
        this._store.select(state => selectorUserId(state as {[authFeatureKey]: IAuthState})).pipe(
            takeUntil(this.destroy$),
            tap(uId => {
                this.userId = uId;
            })
        ).subscribe();

        if (this.userId) {
            this._store.dispatch(productActions.loadProductRecommendationsOfUser({ userId: this.userId }));
        }

        
    }

    toggleViewMode() {
        this.productCardView = !this.productCardView;
        this._notificationService.create('success', 'View Mode have changed', '');
    }

    changeSortBy(target: EventTarget | null) {
        const selectedElement: HTMLInputElement = target as HTMLInputElement;
        const sortBy: SortBy = parseInt(selectedElement.value);
        this._store.dispatch(productActions.sortProductsByChanged({ selectedSortBy: sortBy }));
    }

    changeOrderType(target: EventTarget | null) {
        const selectedElement: HTMLInputElement = target as HTMLInputElement;
        const orderType: OrderType = parseInt(selectedElement.value);
        this._store.dispatch(
            productActions.productsOrderTypeChanged({ selectedOrderType: orderType })
        );
    }

    changeProductPerPage(target: EventTarget | null) {
        const selectedElement: HTMLInputElement = target as HTMLInputElement;
        const productPerPage: ProductPerPage = parseInt(selectedElement.value);
        this._store.dispatch(
            productActions.numProductsPerPageChanged({ selectedProductPerPage: productPerPage })
        );
    }

    changePage(pageNum: number) {
        this._store.dispatch(productActions.pageChanged({ selectedPage: pageNum }));
    }

    viewProductQuickView(productId: string | undefined) {
        this._router.navigate(['shopping', 'product-quickview', productId]);
    }
}
