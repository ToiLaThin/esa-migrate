import { Component, Input } from "@angular/core";
import { IProduct } from "../../../../core/models/product.interface";

@Component({
    selector: 'esa-product-info',
    templateUrl: './product-info.component.html',
    styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
    @Input() product!: IProduct;

}