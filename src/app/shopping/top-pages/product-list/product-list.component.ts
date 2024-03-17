import { Component } from "@angular/core";

@Component({
    selector: 'esa-product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent {
    productCardView: boolean = true;

    toggleViewMode() {
        this.productCardView = !this.productCardView;
    }
}