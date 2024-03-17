import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { productActions } from "../../state/product/product.actions";
import { IPaginatedProduct } from "../../../core/models/product.interface";
import { Observable } from "rxjs";
import { productFeatureKey } from "../../state/product/product.reducers";
import { IProductState } from "../../state/product/productState.interface";
import { selectorPaginatedProducts, selectorProductLazyLoadRequest } from "../../state/product/product.selectors";
import { state } from "@angular/animations";

@Component({
    selector: 'esa-product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
    productCardView: boolean = true;
    paginatedProducts$!: Observable<IPaginatedProduct>;

    constructor(private _store: Store) {
        this._store.dispatch(productActions.reloadProducts())
    }

    ngOnInit(): void {
        this.paginatedProducts$ = this._store.select((state) => selectorPaginatedProducts(state  as { [productFeatureKey]: IProductState}))
    }

    toggleViewMode() {
        this.productCardView = !this.productCardView;
    }
}