import { Component, Input } from "@angular/core";
import { IProduct } from "../../core/models/product.interface";

@Component({
    selector: 'esa-product-card',
    templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
    @Input() product!: IProduct;
}