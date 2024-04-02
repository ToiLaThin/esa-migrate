import { Component, Input } from "@angular/core";
import { IProduct } from "../../../../core/models/product.interface";

@Component({
    selector: 'esa-sale-list-management-product-chip',
    templateUrl: './product-chip.component.html',
    styleUrls: ['./product-chip.component.scss']
})
export class SaleListManagementProductChipComponent {
    @Input({required: true}) product!: IProduct;
}