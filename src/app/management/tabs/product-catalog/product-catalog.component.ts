import { Component } from "@angular/core";
import { OutlineSvgNames } from "../../../share-components/svg-definitions/outline-svg-names.enum";

@Component({
    selector: 'esa-management-product-catalog',
    templateUrl: './product-catalog.component.html',
    styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent {
    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
}