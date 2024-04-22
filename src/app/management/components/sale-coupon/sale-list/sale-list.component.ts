import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { managementActions, productManagementActions } from "../../../state/management/management.actions";
import { Store } from "@ngrx/store";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Observable, map } from "rxjs";
import { IProduct } from "../../../../core/models/product.interface";
import { selectorDisplayingProductsCount, selectorDisplayingProductsManagement, selectorPageCountManagement } from "../../../state/management/product-catalog-share-management.selectors";
import { managementFeatureKey } from "../../../state/management/management.reducers";
import { IManagementState } from "../../../state/management/managementState.interface";
import { OutlineSvgNames } from "../../../../share-components/svg-definitions/outline-svg-names.enum";

@Component({
    selector: 'esa-management-coupon-list',
    templateUrl: 'sale-list.component.html',
    styleUrls: ['sale-list.component.scss']
})
export class SaleListManagementComponent {
    @ViewChild('rightCol', {read: ElementRef, static: true}) rightCol!: ElementRef;
    currentViewModeTable: boolean = false;
    collapsed: boolean = false;

    
    displayingProducts$!: Observable<IProduct[]>;
    displayingProductsCount$!: Observable<number>;
    totalPage$!: Observable<number>;
    totalPageAsArray$!: Observable<number[]>;

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
    constructor(private _renderer: Renderer2, 
        private _store: Store,
        private _notificationService: NzNotificationService) {
            this._store.dispatch(productManagementActions.reloadProducts());
        }

    closeRightPart() {
        this._renderer.addClass(this.rightCol.nativeElement, 'collapse');
        this.collapsed = true;
    }

    openRightPart() {
        this._renderer.removeClass(this.rightCol.nativeElement, 'collapse');
        this.collapsed = false;
    }

    toggleViewMode() {
        this.currentViewModeTable = !this.currentViewModeTable;
        this._notificationService.create('success', 'View Mode have changed', '');
    }

    addNewSaleModal() {}       

    ngOnInit(): void {
        this.displayingProducts$ = this._store.select((state) =>
            selectorDisplayingProductsManagement(state as { [managementFeatureKey]: IManagementState })
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
        this.displayingProductsCount$ = this._store.select((state) =>
            selectorDisplayingProductsCount(state as { [managementFeatureKey]: IManagementState })
        );
    }    

    changePage(pageNum: number) {
        this._store.dispatch(productManagementActions.pageChanged({ selectedPage: pageNum }));
    }
}