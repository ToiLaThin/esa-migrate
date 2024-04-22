import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { SortBy, OrderType, ProductPerPage } from "../../../../core/models/product.interface";
import { productManagementActions } from "../../../state/management/management.actions";
import { OutlineSvgNames } from "../../../../share-components/svg-definitions/outline-svg-names.enum";

@Component({
    selector: 'esa-management-sale-list-filter-top',
    templateUrl: 'sale-list-filter-top.component.html',
    styleUrls: ['sale-list-filter-top.component.scss']
})
export class SaleListFilterTopManagementComponent {
    @Input({required: true}) currentViewModeTable!: boolean;
    @Input({required: true}) collapsed!: boolean;
    @Output() openRightPart: EventEmitter<void> = new EventEmitter<void>();

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
                
    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
    
    constructor(private _renderer: Renderer2, private _store: Store) {}

    toggleViewMode() {}

    openRightPartEventEmit() {
        this.openRightPart.emit();
    }

    changeSortBy(target: EventTarget | null) {
        const selectedElement: HTMLInputElement = target as HTMLInputElement;
        const sortBy: SortBy = parseInt(selectedElement.value);
        this._store.dispatch(productManagementActions.sortProductsByChanged({ selectedSortBy: sortBy }));
    }

    changeOrderType(target: EventTarget | null) {
        const selectedElement: HTMLInputElement = target as HTMLInputElement;
        const orderType: OrderType = parseInt(selectedElement.value);
        this._store.dispatch(
            productManagementActions.productsOrderTypeChanged({ selectedOrderType: orderType })
        );
    }

    changeProductPerPage(target: EventTarget | null) {
        const selectedElement: HTMLInputElement = target as HTMLInputElement;
        const productPerPage: ProductPerPage = parseInt(selectedElement.value);
        this._store.dispatch(
            productManagementActions.numProductsPerPageChanged({ selectedProductPerPage: productPerPage })
        );
    }
}