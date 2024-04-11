import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorSvgNames } from '../../../../share-components/svg-definitions/color-svg-names.enum';
import { OrdersNumberPerPage } from '../../../../core/ui-models/order-filter-data';

//local ui-models
class OrderListNumberPerPageUIModel {
    constructor(
        public numberPerPage: number,
        public title: string,
        public iconName: ColorSvgNames
    ) {}
}
@Component({
    selector: 'esa-order-list-num-per-page',
    templateUrl: './order-list-num-per-page.component.html',
    styleUrls: ['./order-list-num-per-page.component.scss']
})
export class OrderListNumPerPageComponent {
    @Input({required: true}) selectedNumberPerPage!: number | null;
    @Output() numberPerPageSelected: EventEmitter<number> = new EventEmitter<number>();

    orderListNumberPerPageUIModels: OrderListNumberPerPageUIModel[] = [
        new OrderListNumberPerPageUIModel(OrdersNumberPerPage.five, '5', ColorSvgNames.NumberPerPage5),
        new OrderListNumberPerPageUIModel(OrdersNumberPerPage.ten, '10', ColorSvgNames.NumberPerPage10),
        new OrderListNumberPerPageUIModel(OrdersNumberPerPage.fifteen, '15', ColorSvgNames.NumberPerPage15),
    ]
    get OrdersNumberPerPage() {
        return OrdersNumberPerPage;
    }
    get ColorSvgNames() {
        return ColorSvgNames;
    }

    selectNumberPerPage(numberPerPage: number) {
        this.numberPerPageSelected.emit(numberPerPage);
    }
}
