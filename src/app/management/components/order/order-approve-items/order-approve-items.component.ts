import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IStockLookupItem } from "../../../../core/models/order-approve.model";
import { OutlineSvgNames } from "../../../../share-components/svg-definitions/outline-svg-names.enum";

@Component({
    selector: 'esa-management-order-approve-items',
    templateUrl: './order-approve-items.component.html',
    styleUrls: ['./order-approve-items.component.scss']
})
export class OrderApproveItemsManagementComponent implements OnInit{
    @Input({required: true}) itemStockLookUp!: IStockLookupItem[];
    @Input({required: true}) displayMode: 'table' | 'list' = 'table';
    @Output() displayModeToggled: EventEmitter<void> = new EventEmitter<void>();

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
    constructor() {}

    ngOnInit(): void {        
    }

    toggleDisplayMode() {
        this.displayModeToggled.emit();
    }
}