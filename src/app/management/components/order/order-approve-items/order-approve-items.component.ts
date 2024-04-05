import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IItemStock } from "../../../../core/models/order-approve.model";

@Component({
    selector: 'esa-management-order-approve-items',
    templateUrl: './order-approve-items.component.html',
    styleUrls: ['./order-approve-items.component.scss']
})
export class OrderApproveItemsManagementComponent implements OnInit{
    @Input({required: true}) itemStockLookUp!: IItemStock[];
    @Input({required: true}) displayMode: 'table' | 'list' = 'table';
    @Output() displayModeToggled: EventEmitter<void> = new EventEmitter<void>();

    constructor() {}

    ngOnInit(): void {        
    }

    toggleDisplayMode() {
        this.displayModeToggled.emit();
    }
}