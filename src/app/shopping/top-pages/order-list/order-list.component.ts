import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IOrderAggregateCart } from '../../../core/models/order.interface';
import { ColorSvgNames } from '../../../share-components/svg-definitions/color-svg-names.enum';
import { Store } from '@ngrx/store';
import {
    OrderFilterData,
    OrdersSortBy,
    OrdersSortType
} from '../../../core/ui-models/order-filter-data';
import { orderActions } from '../../state/order/order.actions';
import { Observable, Subscription, map } from 'rxjs';
import {
    selectorCurrentPageNumOrderAggregateCartFilteredSortedPaginated,
    selectorIsLoadingInOrderState,
    selectorOrderAggregateCartFilteredSortedPaginatedList,
    selectorPageCountOrderAggregateCartFilteredSortedPaginated,
    selectorProductsForReorder
} from '../../state/order/order.selectors';
import { orderFeatureKey } from '../../state/order/order.reducers';
import { IOrderState } from '../../state/order/orderState.interface';
import { OrderStatus } from '../../../core/types/order-status.enum';
import { selectorOrderListFilterSortPaginateAggregateState } from './../../state/order/order.selectors';
import { PaymentMethod } from '../../../core/types/payment-method.enum';
import { IProduct } from '../../../core/models/product.interface';
import { cartActions } from '../../state/cart/cart.actions';
import { ICartItem } from '../../../core/models/cart-item.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'esa-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
    @ViewChild('cardContainer', { read: ElementRef<HTMLDivElement> })
    cardContainer!: ElementRef<HTMLDivElement>;
    isCardContainerOverflowing = false;
    isLoadingInOrderState$!: Observable<boolean>;

    orderFilterDatas: OrderFilterData[] = [
        new OrderFilterData(
            'Draft Created',
            ColorSvgNames.ViewDetail,
            'list all draft orders',
            OrderStatus.createdDraft
        ),
        new OrderFilterData(
            'Confirm Info',
            ColorSvgNames.User,
            'list all orders require confirm delivery info',
            OrderStatus.customerInfoConfirmed
        ),
        new OrderFilterData(
            'Checkouted',
            ColorSvgNames.PaymentMethods,
            'list all orders checkouted',
            OrderStatus.checkouted
        ),
        new OrderFilterData(
            'Stock Confirmed',
            ColorSvgNames.Lookup,
            'list all orders confirmed by admin that have stock to deliver',
            OrderStatus.stockConfirmed
        ),
        new OrderFilterData(
            'Delivering',
            ColorSvgNames.Location,
            'list all deliverying orders',
            OrderStatus.stockConfirmed
        ),
        new OrderFilterData(
            'Canceled',
            ColorSvgNames.PriceTagRed,
            'list all orders that been canceled',
            OrderStatus.cancelled
        ),
        new OrderFilterData(
            'Completed',
            ColorSvgNames.ViewDetail,
            'list all orders that completed',
            OrderStatus.completed
        )
    ];
    orderAggregateCartsFilteredSortedPaginated$!: Observable<IOrderAggregateCart[]>;
    selectedOrderListFilterSortBy$!: Observable<OrdersSortBy>;
    selectedOrderListFilterSortType$!: Observable<OrdersSortType>;
    selectedOrderListNumberPerPage$!: Observable<number>;
    selectedOrderListFilterPaymentMethod$!: Observable<PaymentMethod | null>;
    currentPageNum$!: Observable<number>;
    totalPagesAsArray$!: Observable<number[]>;

    productsForReorder$!: Observable<IProduct[]>;
    productsForReorderSubscription!: Subscription;
    currentWindowWidth!: number;
    get ColorSvgNames() {
        return ColorSvgNames;
    }

    //these are the breakpoints for the different screen sizes in tailwindcss
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
    constructor(private _store: Store, private _router: Router) {}

    ngOnDestroy(): void {
        this.productsForReorderSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.currentWindowWidth = window.innerWidth;
        this.isLoadingInOrderState$ = this._store.select((state) =>
            selectorIsLoadingInOrderState(state as { [orderFeatureKey]: IOrderState })
        );
        this.orderAggregateCartsFilteredSortedPaginated$ = this._store.select((state) =>
            selectorOrderAggregateCartFilteredSortedPaginatedList(
                state as { [orderFeatureKey]: IOrderState }
            )
        );
        this.selectedOrderListFilterSortBy$ = this._store.select(
            (state) =>
                //we can also pipe => map to get the value we want
                //current we have a big object with all the state, so we can easily get the value we want
                selectorOrderListFilterSortPaginateAggregateState(
                    state as { [orderFeatureKey]: IOrderState }
                ).orderListSortBy
        );
        this.selectedOrderListFilterSortType$ = this._store.select(
            (state) =>
                selectorOrderListFilterSortPaginateAggregateState(
                    state as { [orderFeatureKey]: IOrderState }
                ).orderListSortType
        );
        this.selectedOrderListNumberPerPage$ = this._store.select(
            (state) =>
                selectorOrderListFilterSortPaginateAggregateState(
                    state as { [orderFeatureKey]: IOrderState }
                ).orderListPageSize
        );
        this.selectedOrderListFilterPaymentMethod$ = this._store.select(
            (state) =>
                selectorOrderListFilterSortPaginateAggregateState(
                    state as { [orderFeatureKey]: IOrderState }
                ).orderListFilterPaymentMethod
        );
        this.currentPageNum$ = this._store.select((state) =>
            selectorCurrentPageNumOrderAggregateCartFilteredSortedPaginated(
                state as { [orderFeatureKey]: IOrderState }
            )
        );
        this.totalPagesAsArray$ = this._store
            .select((state) =>
                selectorPageCountOrderAggregateCartFilteredSortedPaginated(
                    state as { [orderFeatureKey]: IOrderState }
                )
            )
            .pipe(
                map((totalPage) =>
                    Array(totalPage)
                        .fill(1)
                        .map((x, i) => i + 1)
                )
            );

        this.productsForReorder$ = this._store.select((state) =>
            selectorProductsForReorder(state as { [orderFeatureKey]: IOrderState })
        );

        //for each 1 in the array len totalPage, map 1 => idx + 1
        this._store.dispatch(orderActions.loadOrderFitlerdSortedPaginatedListOfUser());
    }

    selectTab(event: MouseEvent, orderStatusToFilter: OrderStatus) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        console.log(target);

        const tabs = document.querySelectorAll('.tab');
        tabs.forEach((tab) => tab.classList.remove('active'));
        target.classList.add('active');
        this._store.dispatch(
            orderActions.filterOrderStatusBy({
                newOrderListFilterByOrderStatus: orderStatusToFilter
            })
        );
    }

    selectSortBy(sortBySelected: OrdersSortBy) {
        this._store.dispatch(
            orderActions.filterOrderSortBy({ newOrderListFilterBySortBy: sortBySelected })
        );
    }

    selectSortType(sortTypeSelected: OrdersSortType) {
        this._store.dispatch(
            orderActions.filterOrderSortType({ newOrderListFilterBySortType: sortTypeSelected })
        );
    }

    selectNumberPerPage(numberPerPageSelected: number) {
        this._store.dispatch(
            orderActions.numberPerPageSelected({ newOrderListNumberPerPage: numberPerPageSelected })
        );
    }

    selectOrDeselectPaymentMethod(paymentMethodSelectedOrDeselected: PaymentMethod | null) {
        this._store.dispatch(
            orderActions.paymentMethodSelectedOrDeselect({
                newOrderListPaymentMethod: paymentMethodSelectedOrDeselected
            })
        );
    }

    reOrder(productBusinessKeys: string[]) {
        //clear cart first
        this._store.dispatch(cartActions.cartClear());

        //after this is loaded, the state contain products for reorder
        this._store.dispatch(orderActions.loadProductsWithBusinessKeys({ productBusinessKeys }));

        this.productsForReorderSubscription = this.productsForReorder$.subscribe(
            (productsForReorder) => {
                productsForReorder.forEach((product) => {
                    let model = product.productModels[0];
                    let cartItem = {
                        productId: product?.productId,
                        productModelId: model.productModelId,
                        businessKey: product?.businessKey,
                        quantity: 1,
                        isOnSale: model.isOnSaleModel,
                        saleItemId: model.saleItemId,
                        saleType: model.saleType,
                        saleValue: model.saleValueModel,
                        unitPrice: model.price,
                        finalPrice: model.price * 1,
                        unitAfterSalePrice:
                            model.isOnSaleModel === false ? undefined : model.priceOnSaleModel,
                        finalAfterSalePrice:
                            model.isOnSaleModel === false
                                ? undefined
                                : model.priceOnSaleModel === undefined
                                ? undefined
                                : model.priceOnSaleModel * 1,
                        productName: product.productName,
                        productImage: product.productCoverImage,
                        subCatalogName: product.subCatalogName
                    };

                    this._store.dispatch(
                        cartActions.cartItemUpsert({ upsertCartItem: cartItem as ICartItem })
                    );
                });
            }
        );

        //wait until the cart is loaded, then navigate to cart page, clear the productsForReorder
        //do not use while + setTimeout, it will break the app, use setInterval instead
        let itemsInCartKey = 'itemsInCart'; //must match the key in cart service
        let timer = setInterval(() => {
            if (localStorage.getItem(itemsInCartKey) !== null) {
                clearInterval(timer);
                this._store.dispatch(orderActions.allProductsForReorderAddedToCart());
            }
        }, 200);
    }

    changePageNum(pageNum: number) {
        this._store.dispatch(orderActions.selectPageNumber({ selectedPageNum: pageNum }));
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.currentWindowWidth = event.target.innerWidth;
        // console.log(this.currentWindowWidth);
        // console.log(this.cardContainer.nativeElement.offsetWidth);
        // this only happen if there is scroll aka overflow: auto
        // with flex-wrap this is not necessary
        if (
            this.cardContainer.nativeElement.offsetWidth <
                this.cardContainer.nativeElement.scrollWidth &&
            this.currentWindowWidth > this.lgScreen
        ) {
            this.isCardContainerOverflowing = true;
        } else {
            this.isCardContainerOverflowing = false;
        }
    }
}
