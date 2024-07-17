import { Component, OnInit } from '@angular/core';
import { ICatalog, ISubCatalog } from '../../../../core/models/catalog.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catalogActions, productActions } from '../../../state/product/product.actions';
import {
    selectorAllCatalogs,
    selectorSelectedSubCatalogs
} from '../../../state/product/product.selectors';
import { productFeatureKey } from '../../../state/product/product.reducers';
import { IProductState } from '../../../state/product/productState.interface';
import { I18NProductIdSelector } from '../../../translate-ids/i18n-product-id';

@Component({
    selector: 'esa-product-filter-by',
    templateUrl: './product-filter-by.component.html',
    styleUrls: ['./product-filter-by.component.scss']
})
export class ProductFilterByComponent implements OnInit {
    allCatalogs$!: Observable<ICatalog[]>;
    subCatalogsOfSelectedCatalog$!: Observable<ISubCatalog[]>;

    fromPrice: number = 1000;
    toPrice: number = 1000000;

    get I18NProductIds() {
        return I18NProductIdSelector;
    }
    
    constructor(private _store: Store) {
        this._store.dispatch(catalogActions.reloadCatalogs());
    }

    ngOnInit(): void {
        this.allCatalogs$ = this._store.select((state) =>
            selectorAllCatalogs(state as { [productFeatureKey]: IProductState })
        );
        this.subCatalogsOfSelectedCatalog$ = this._store.select((state) =>
            selectorSelectedSubCatalogs(state as { [productFeatureKey]: IProductState })
        );
    }

    onCatalogChange() {
        let catalogId = (document.getElementById('catalog') as HTMLSelectElement).value;
        this._store.dispatch(catalogActions.loadSubCatalogsOfCatalog({ catalogId: catalogId }));
    }

    onSubCatalogSelectionChange(targetSelect: EventTarget | null) {
        const selectEle: HTMLInputElement = targetSelect as HTMLInputElement;
        const subCatalogId: string = selectEle.value;
        if (selectEle.checked) {
            this._store.dispatch(
                catalogActions.subCatalogSelected({ selectedSubCatalogId: subCatalogId })
            );
            return;
        }
        this._store.dispatch(
            catalogActions.subCatalogDeselected({ deselectedSubCatalogId: subCatalogId })
        );
    }

    onPriceRangeChange() {
        const fromPrice: number = this.fromPrice;
        const toPrice: number = this.toPrice;
        if (fromPrice > toPrice)  {
            alert("Please enter valid price range");
            return;
        }
        this._store.dispatch(productActions.priceRangeChanged({
            fromPrice: fromPrice,
            toPrice: toPrice
        }))
    }
}
