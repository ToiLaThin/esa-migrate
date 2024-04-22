import { Component, Input } from "@angular/core";
import { IProduct } from "../../../../core/models/product.interface";
import { OutlineSvgNames } from "../../../../share-components/svg-definitions/outline-svg-names.enum";

@Component({
    selector: 'esa-sale-list-management-product-chip',
    templateUrl: './product-chip.component.html',
    styleUrls: ['./product-chip.component.scss']
})
export class SaleListManagementProductChipComponent {
    @Input({required: true}) product!: IProduct;

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
}