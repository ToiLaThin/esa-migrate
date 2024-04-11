import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ColorSvgNames } from "../../../../share-components/svg-definitions/color-svg-names.enum";
import { OrdersSortBy } from "../../../../core/ui-models/order-filter-data";

//local ui-models
class OrderListSortByUIModel {
    constructor(public sortBy: OrdersSortBy, public title: string, public iconName: ColorSvgNames) {}
}

@Component({
    selector: 'esa-order-list-sort-by',
    templateUrl: './order-list-sort-by.component.html',
    styleUrls: ['./order-list-sort-by.component.scss']
})
export class OrderListSortByComponent {
    
    orderListSortByUIModels: OrderListSortByUIModel[] = [
        new OrderListSortByUIModel(OrdersSortBy.id, 'Id', ColorSvgNames.SortById),
        new OrderListSortByUIModel(OrdersSortBy.subTotal, 'SubTotal', ColorSvgNames.SortByPrice),
        new OrderListSortByUIModel(OrdersSortBy.dateCreatedDraft, 'Date', ColorSvgNames.SortByDate)
    ];

    @Input({required: true}) selectedSortBy!: OrdersSortBy | null;
    @Output() sortBySelected: EventEmitter<OrdersSortBy> = new EventEmitter<OrdersSortBy>();
    
    get OrdersSortBy() {
        return OrdersSortBy;
    }

    get ColorSvgNames() {
        return ColorSvgNames;
    }
    

    constructor() {}

    selectSortBy(sortBy: OrdersSortBy) {
        this.sortBySelected.emit(sortBy);
    }
}