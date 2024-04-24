import { Component, OnDestroy, OnInit } from '@angular/core';
import { OutlineSvgNames } from '../../../share-components/svg-definitions/outline-svg-names.enum';
import { IProduct } from '../../../core/models/product.interface';
import { ProductCompareService } from '../../../core/services/product-compare.service';
import { Observable, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectorProductCompareList } from '../../state/product/product.selectors';
import { productFeatureKey } from '../../state/product/product.reducers';
import { IProductState } from '../../state/product/productState.interface';
import { productActions } from '../../state/product/product.actions';

@Component({
    selector: 'esa-product-compare',
    templateUrl: './product-compare.component.html',
    styleUrls: ['./product-compare.component.scss']
})
export class ProductCompareComponent implements OnInit, OnDestroy {
    get OutlineSvgNames() {
        return OutlineSvgNames;
    }

    productCompareListSubscription!: Subscription;
    productCompareList!: IProduct[];

    constructor(private _store: Store) {}

    ngOnDestroy(): void {
        this.productCompareListSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.productCompareListSubscription = this._store
            .select((state) =>
                selectorProductCompareList(state as { [productFeatureKey]: IProductState })
            )
            .pipe(tap((proCompareList) => (this.productCompareList = proCompareList)))
            .subscribe();
    }

    removeProductFromCompareList(productId: string) {
        this._store.dispatch(productActions.removeProductFromCompareList({ productId }));
    }
}
