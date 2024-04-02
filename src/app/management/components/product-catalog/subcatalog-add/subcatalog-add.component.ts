import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ICatalog, ISubCatalog } from '../../../../core/models/catalog.interface';
import { Observable } from 'rxjs';
import { productCatalogManagementActions } from '../../../state/product-catalog-management/product-catalog-management.actions';
import { selectorAllCatalogs } from '../../../state/product-catalog-management/product-catalog-management.selectors';
import { productCatalogManagementFeatureKey } from '../../../state/product-catalog-management/product-catalog-management.reducers';
import { IProductCatalogManagementState } from '../../../state/product-catalog-management/productCatalogManagementState.interface';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
    selector: 'esa-subcatalog-add',
    templateUrl: './subcatalog-add.component.html',
    styleUrls: ['./subcatalog-add.component.scss']
})
export class SubCatalogAddManagementComponent implements OnInit {
    newSubCatalog!: ISubCatalog;
    allCatalogs$!: Observable<ICatalog[]>;
    newSubCatalogFrmGrp = new FormGroup({
        selectedCatalogId: new FormControl(),
        subCatalogName: new FormControl(),
        subCatalogDescription: new FormControl(),
        subCatalogImage: new FormControl()
    });
    @Input({required: false}) inputCatalogId!: string;
    constructor(private _store: Store) {}

    ngOnInit(): void {
        this.allCatalogs$ = this._store.select((state) =>
            selectorAllCatalogs(
                state as { [productCatalogManagementFeatureKey]: IProductCatalogManagementState }
            )
        );
        this.newSubCatalog = {
            subCatalogName: '',
            subCatalogDescription: '',
          }
    }

    addSubCatalog() {
        this.newSubCatalog.subCatalogName = this.newSubCatalogFrmGrp.value.subCatalogName;
        this.newSubCatalog.subCatalogDescription =
            this.newSubCatalogFrmGrp.value.subCatalogDescription;
        this.newSubCatalog.subCatalogImage = this.newSubCatalogFrmGrp.value.subCatalogImage;

        const selectedCatalogId = this.newSubCatalogFrmGrp.value.selectedCatalogId;
        this._store.dispatch(
            productCatalogManagementActions.addNewSubcatalog({
                subcatalog: this.newSubCatalog,
                selectedCatalogId: selectedCatalogId
            })
        );
        this.resetFormValues();
    }

    resetFormValues() {
        this.newSubCatalogFrmGrp.patchValue({
            selectedCatalogId: '',
            subCatalogName: '',
            subCatalogDescription: '',
            subCatalogImage: ''
        });
    }
}
