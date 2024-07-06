import { Component, OnInit } from '@angular/core';
import {
    ITableRow,
    OrderStatus,
    PaymentMode
} from '../../sale-coupon/sale-list-table/sale-list-table.component';
import { PillType } from '../../../../core/ui-models/pill-type';
import { Store } from '@ngrx/store';
import {
    IProduct,
    OrderType,
    ProductPerPage,
    SortBy
} from '../../../../core/models/product.interface';
import { Observable, map } from 'rxjs';
import { managementFeatureKey } from '../../../state/management/management.reducers';
import { IManagementState } from '../../../state/management/managementState.interface';
import { DiscountType } from '../../../../core/models/sale-item.interface';
import { productManagementActions } from '../../../state/management/management.actions';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProductListAdvanceFilterComponent } from '../product-list-advance-filter/product-list-advance-filter.component';
import {
    selectorAllCatalogs,
    selectorDisplayingProductsManagement,
    selectorPageCountManagement,
    selectorSelectedPageNum,
    selectorSelectedSubCatalogs
} from '../../../state/management/product-catalog-share-management.selectors';
import { ICatalog, ISubCatalog } from '../../../../core/models/catalog.interface';
import { OutlineSvgNames } from '../../../../share-components/svg-definitions/outline-svg-names.enum';
import { ProductUpdatePriceModalManagementComponent } from '../product-update-price-modal/product-update-price-modal.component';

@Component({
    selector: 'esa-management-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductManagementListComponent implements OnInit {
    get OrderStatus() {
        return OrderStatus;
    }

    get PillType() {
        return PillType;
    }

    get DiscountType() {
        return DiscountType;
    }

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }

    displayingProducts$!: Observable<IProduct[]>;
    selectedPageNum$!: Observable<number>;
    totalPage$!: Observable<number>;
    totalPageAsArray$!: Observable<number[]>;

    allCatalogs$!: Observable<ICatalog[]>;
    subCatalogsOfSelectedCatalog$!: Observable<ISubCatalog[]>;
    
    constructor(private _store: Store, private _modalService: NzModalService) {
        this._store.dispatch(productManagementActions.reloadProducts());
    }

    ngOnInit(): void {
        this.displayingProducts$ = this._store.select((state) =>
            selectorDisplayingProductsManagement(
                state as { [managementFeatureKey]: IManagementState }
            )
        );
        this.selectedPageNum$ = this._store.select((state) =>
            selectorSelectedPageNum(state as { [managementFeatureKey]: IManagementState })
        );
        this.totalPage$ = this._store.select((state) =>
            selectorPageCountManagement(state as { [managementFeatureKey]: IManagementState })
        );
        this.totalPageAsArray$ = this.totalPage$.pipe(
            map((totalPage) =>
                Array(totalPage)
                    .fill(1)
                    .map((x, i) => i + 1)
            )
        );
        this.allCatalogs$ = this._store.select((state) =>
            selectorAllCatalogs(state as { [managementFeatureKey]: IManagementState })
        );
        this.subCatalogsOfSelectedCatalog$ = this._store.select((state) =>
            selectorSelectedSubCatalogs(state as { [managementFeatureKey]: IManagementState })
        );
    }

    changeProductPerPage(productPerPage: ProductPerPage) {
        this._store.dispatch(
            productManagementActions.numProductsPerPageChanged({
                selectedProductPerPage: productPerPage
            })
        );
    }

    changeSortBy(sortBy: SortBy) {
        this._store.dispatch(
            productManagementActions.sortProductsByChanged({ selectedSortBy: sortBy })
        );
    }

    changeOrderType(orderType: OrderType) {
        this._store.dispatch(
            productManagementActions.productsOrderTypeChanged({ selectedOrderType: orderType })
        );
    }

    openAdvanceFilter() {
        this._modalService.create({
            nzContent: ProductListAdvanceFilterComponent,
            nzClosable: true,
            nzFooter: null,
            nzWidth: 500,
        });
    }

    changePage(pageNum: number) {
        this._store.dispatch(productManagementActions.pageChanged({ selectedPage: pageNum }));
    }

    updateProductModelPrice(p: IProduct) {
        this._modalService.create({
            nzTitle: undefined,
            nzContent: ProductUpdatePriceModalManagementComponent,
            nzClosable: true,
            nzFooter: null,
            nzWidth: 500,
            nzData: {
                productId: p.productId,
                productModelId: p.productModels[0].productModelId,
                currPrice: p.productModels[0].price
            }
        });
    }
}
