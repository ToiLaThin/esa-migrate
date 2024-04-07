import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICatalog, ISubCatalog } from '../../../../core/models/catalog.interface';
import {
    selectorAllCatalogs,
    selectorCatalogSelectedId,
    selectorSelectedSubCatalogs,
    selectorSubCatalogSelectedIds
} from '../../../state/management/product-catalog-share-management.selectors';
import { managementFeatureKey } from '../../../state/management/management.reducers';
import { IManagementState } from '../../../state/management/managementState.interface';
import {
    catalogManagementActions,
    productManagementActions
} from '../../../state/management/management.actions';

@Component({
    selector: 'esa-management-product-list-advance-filter',
    templateUrl: './product-list-advance-filter.component.html',
    styleUrls: ['./product-list-advance-filter.component.scss']
})
export class ProductListAdvanceFilterComponent implements OnInit {
    allCatalogs$!: Observable<ICatalog[]>;
    subCatalogsOfSelectedCatalog$!: Observable<ISubCatalog[]>;
    selectedCatalogId$!: Observable<string>;
    selectedSubcatalogIds$!: Observable<string[]>;

    fromPrice: number = 0;
    toPrice: number = 10000000;

    //since this is called from the modal, we inject store here so we do not have to pass it from parent(we also have output events to parent)
    constructor(private _store: Store) {
        this._store.dispatch(catalogManagementActions.reloadCatalogs());
    }

    ngOnInit(): void {
        this.allCatalogs$ = this._store.select((state) =>
            selectorAllCatalogs(state as { [managementFeatureKey]: IManagementState })
        );
        this.subCatalogsOfSelectedCatalog$ = this._store.select((state) =>
            selectorSelectedSubCatalogs(state as { [managementFeatureKey]: IManagementState })
        );
        this.selectedCatalogId$ = this._store.select((state) =>
            selectorCatalogSelectedId(state as { [managementFeatureKey]: IManagementState })
        );
        this.selectedSubcatalogIds$ = this._store.select((state) =>
            selectorSubCatalogSelectedIds(state as { [managementFeatureKey]: IManagementState })
        );
    }

    onCatalogChange() {
        let catalogId = (document.getElementById('catalog') as HTMLSelectElement).value;
        this._store.dispatch(
            catalogManagementActions.loadSubCatalogsOfCatalog({ catalogId: catalogId })
        );
    }

    onSubCatalogSelectionChange(targetSelect: EventTarget | null) {
        const selectEle: HTMLInputElement = targetSelect as HTMLInputElement;
        const subCatalogId: string = selectEle.value;
        if (selectEle.checked) {
            this._store.dispatch(
                catalogManagementActions.subCatalogSelected({ selectedSubCatalogId: subCatalogId })
            );
            return;
        }
        this._store.dispatch(
            catalogManagementActions.subCatalogDeselected({ deselectedSubCatalogId: subCatalogId })
        );
    }

    onPriceRangeChange() {
        const fromPrice: number = this.fromPrice;
        const toPrice: number = this.toPrice;
        if (fromPrice > toPrice) {
            alert('Please enter valid price range');
            return;
        }
        this._store.dispatch(
            productManagementActions.priceRangeChanged({
                fromPrice: fromPrice,
                toPrice: toPrice
            })
        );
    }
}
