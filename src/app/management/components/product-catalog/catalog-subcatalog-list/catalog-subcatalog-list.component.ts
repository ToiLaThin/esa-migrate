import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ISubCatalog } from "../../../../core/models/catalog.interface";
import { NzModalService } from "ng-zorro-antd/modal";
import { SubCatalogAddWithInputManagementComponent } from "./subcatalog-add-input.component";

@Component({
    selector: 'esa-management-catalog-subcatalog-list',
    templateUrl: './catalog-subcatalog-list.component.html',
    styleUrls: ['./catalog-subcatalog-list.component.scss']

})
export class CatalogSubCatalogListManagementComponent {

    @Input({required: true}) catalogId!: string;
    @Input({required: true}) subCatalogs!: ISubCatalog[];
    @Output() closedSubCatalogsList: EventEmitter<void> = new EventEmitter<void>();
    constructor(private _modalService: NzModalService) {}

    emitCloseSubCatalogsList() {
        this.closedSubCatalogsList.emit();
    }

    openAddSubCatalogModal(catalogId: string): void {
        this._modalService.create({
            nzContent: SubCatalogAddWithInputManagementComponent,
            nzData: {
                inputCatalogId: catalogId
            },
            nzFooter: null,
        });
    }
}