import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ProductPerPage, SortBy, OrderType } from "../../../../core/models/product.interface";
import { Store } from "@ngrx/store";
import { OutlineSvgNames } from "../../../../share-components/svg-definitions/outline-svg-names.enum";

@Component({
    selector: 'esa-management-product-list-filter',
    templateUrl: './product-list-filter.component.html',
    styleUrls: ['./product-list-filter.component.scss']
})
export class ProductListFilterComponent {

    @Output() changedProductPerPage = new EventEmitter<ProductPerPage>();
    @Output() changedOrderType = new EventEmitter<OrderType>();
    @Output() changedSortBy = new EventEmitter<SortBy>();
    @Output() openedAdvanceFilter = new EventEmitter<void>();
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
    
    constructor(private _store: Store) { }

    ngOnInit() {
    }

    changeSortBy(target: EventTarget | null) {
        const selectedElement: HTMLInputElement = target as HTMLInputElement;
        const sortBy: SortBy = parseInt(selectedElement.value);
        this.changedSortBy.emit(sortBy);        
    }

    changeOrderType(target: EventTarget | null) {
        const selectedElement: HTMLInputElement = target as HTMLInputElement;
        const orderType: OrderType = parseInt(selectedElement.value);
        this.changedOrderType.emit(orderType);
        
    }

    changeProductPerPage(target: EventTarget | null) {
        const selectedElement: HTMLInputElement = target as HTMLInputElement;
        const productPerPage: ProductPerPage = parseInt(selectedElement.value);
        this.changedProductPerPage.emit(productPerPage);        
    }

    openAdvanceFilter() {
        this.openedAdvanceFilter.emit();
    }
}