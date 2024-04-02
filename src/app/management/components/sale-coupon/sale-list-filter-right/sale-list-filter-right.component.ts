import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";

@Component({
    selector: 'esa-management-sale-list-filter-right',
    templateUrl: 'sale-list-filter-right.component.html',
    styleUrls: ['sale-list-filter-right.component.scss']
})
export class SaleListFilterRightManagementComponent {
    constructor(private _renderer: Renderer2) {}    
}