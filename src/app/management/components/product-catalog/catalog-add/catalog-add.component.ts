import { Component, OnInit } from '@angular/core';
import { ICatalog } from '../../../../core/models/catalog.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { productCatalogManagementActions } from '../../../state/product-catalog-management/product-catalog-management.actions';

@Component({
    selector: 'esa-catalog-add',
    templateUrl: './catalog-add.component.html',
    styleUrls: ['./catalog-add.component.scss']
})
export class CatalogAddManagementComponent implements OnInit {
    newCatalog!: ICatalog;

    newCatalogFrmGrp = new FormGroup({
        catalogName: new FormControl(),
        catalogDescription: new FormControl(),
        catalogImage: new FormControl()
    });

    constructor(private _store: Store) {}

    ngOnInit(): void {
        this.newCatalog = {
            //these two are required
            catalogName: '',
            catalogDescription: ''
        };
    }


    resetFormValues() {
        this.newCatalogFrmGrp.patchValue({
            catalogName: '',
            catalogDescription: '',
            catalogImage: ''
        });
    }

    addCatalog() {
        this.newCatalog.catalogName = this.newCatalogFrmGrp.value.catalogName;
        this.newCatalog.catalogDescription = this.newCatalogFrmGrp.value.catalogDescription;
        this.newCatalog.catalogImage = this.newCatalogFrmGrp.value.catalogImage;
        this.newCatalog.subCatalogs = [];
        this._store.dispatch(
            productCatalogManagementActions.addNewCatalog({
                catalog: this.newCatalog
            })
        );
        this.resetFormValues();
    }
}
