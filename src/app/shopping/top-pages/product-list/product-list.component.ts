import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { productActions } from "../../state/product/product.actions";

@Component({
    selector: 'esa-product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent {
    productCardView: boolean = true;

    constructor(private _store: Store) {
        this._store.dispatch(productActions.reloadProducts())
    }

    toggleViewMode() {
        this.productCardView = !this.productCardView;
    }
}