import { Component, Input } from "@angular/core";
import { IProduct } from "../../core/models/product.interface";

@Component({
    selector: 'esa-product-list-card',
    templateUrl: './product-list-card.component.html'
})
export class ProductListCardComponent {
    @Input() product!: IProduct;
    
    constructor() { }
}