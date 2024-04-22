import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ICatalog } from '../../../../core/models/catalog.interface';
import { Store } from '@ngrx/store';
import { catalogManagementActions } from '../../../state/management/management.actions';
import { selectorAllCatalogs } from '../../../state/product-catalog-management/product-catalog-management.selectors';
import { IProductCatalogManagementState } from '../../../state/product-catalog-management/productCatalogManagementState.interface';
import { productCatalogManagementFeatureKey } from '../../../state/product-catalog-management/product-catalog-management.reducers';
import { CatalogSubCatalogListManagementComponent } from '../catalog-subcatalog-list/catalog-subcatalog-list.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OutlineSvgNames } from '../../../../share-components/svg-definitions/outline-svg-names.enum';

@Component({
    selector: 'esa-management-catalog-list',
    templateUrl: './catalog-list.component.html',
    styleUrls: ['./catalog-list.component.scss']
})
export class CatalogManagementListComponent implements OnInit {
    allCatalogs$!: Observable<ICatalog[]>;
    @ViewChild('subcatalogList', { read: CatalogSubCatalogListManagementComponent}) subcatalogList!: CatalogSubCatalogListManagementComponent;
    showSubCatalogs = false;

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
    
    constructor(private _store: Store) {
        this._store.dispatch(catalogManagementActions.reloadCatalogs());
    }

    ngOnInit(): void {
        this.allCatalogs$ = this._store.select((state) =>
            selectorAllCatalogs(state as { [productCatalogManagementFeatureKey]: IProductCatalogManagementState })
        );
    }

    viewCatalogSubCatalogs(catalog: ICatalog): void {
        this.subcatalogList.subCatalogs = catalog.subCatalogs!;
        this.subcatalogList.catalogId = catalog.catalogId!;
        this.showSubCatalogs = true;
    }

    closeSubCatalogsList(): void {
        this.showSubCatalogs = false;
    }    
}
