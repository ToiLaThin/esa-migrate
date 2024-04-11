import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ColorSvgNames } from "../../../../share-components/svg-definitions/color-svg-names.enum";
import { OrdersSortType } from "../../../../core/ui-models/order-filter-data";

//local ui-models
class OrderListSortTypeUIModel {
    constructor(public sortType: OrdersSortType, public title: string, public iconName: ColorSvgNames) {}
}
@Component({
    selector: 'esa-order-list-sort-type',
    templateUrl: './order-list-sort-type.component.html',
    styleUrls: ['./order-list-sort-type.component.scss']
})
export class OrderListSortTypeComponent {

    orderListSortTypeUIModels: OrderListSortTypeUIModel[] = [
        new OrderListSortTypeUIModel(OrdersSortType.ascending, 'Ascending', ColorSvgNames.SortTypeAsc),
        new OrderListSortTypeUIModel(OrdersSortType.descending, 'Descending', ColorSvgNames.SortTypeDesc),
    ];

    @Input({required: true}) selectedSortType!: OrdersSortType | null;
    @Output() sortTypeSelected: EventEmitter<OrdersSortType> = new EventEmitter<OrdersSortType>();
    
    get OrdersSortType() {
        return OrdersSortType;
    }
    
    get ColorSvgNames() {
        return ColorSvgNames;
    }

    constructor() {}

    selectSortType(sortType: OrdersSortType) {
        this.sortTypeSelected.emit(sortType);
    }
        
}