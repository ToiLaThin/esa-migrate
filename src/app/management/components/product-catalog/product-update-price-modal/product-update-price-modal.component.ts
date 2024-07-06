import { Component, Inject, OnInit } from "@angular/core";
import { IProductModelUpdatePriceRequest } from "../../../../core/models/product.interface";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { productCatalogManagementActions } from "../../../state/product-catalog-management/product-catalog-management.actions";
import { NZ_MODAL_DATA, NzModalRef } from "ng-zorro-antd/modal";

@Component({
    selector: 'esa-management-product-update-price-modal',
    templateUrl: './product-update-price-modal.component.html',
    styleUrls: ['./product-update-price-modal.component.scss']
})
export class ProductUpdatePriceModalManagementComponent implements OnInit {
    productModelUpdatePriceRequest!: IProductModelUpdatePriceRequest;

    updateProductModelPriceFrmGrp = new FormGroup({
        productId: new FormControl({value: '', disabled: true}, Validators.required),
        productModelId: new FormControl({value: '', disabled: true}, Validators.required),
        newPrice: new FormControl(0, [Validators.required, Validators.min(0)])
    });

    constructor(
        private _store: Store,
        private _modalRef: NzModalRef,
        @Inject(NZ_MODAL_DATA)
        public data: { productId: string; productModelId: string; currPrice: number }
    ) {}

    ngOnInit(): void {
        //avoid productModelUpdatePriceRequest is undefined
        this.productModelUpdatePriceRequest = {
            productId: '',
            productModelId: '',
            newPrice: 0
        };
        this.resetFormValues();
    }

    resetFormValues() {
        this.updateProductModelPriceFrmGrp.patchValue({
            productId: this.data.productId,
            productModelId: this.data.productModelId,
            newPrice: this.data.currPrice
        });
    }

    updateProductModelPrice() {
        // this.productModelUpdatePriceRequest.productId = this.updateProductModelPriceFrmGrp.value.productId as string;
        // this.productModelUpdatePriceRequest.productModelId = this.updateProductModelPriceFrmGrp.value.productModelId as string;
        // since these 2 prop is disabled, no updateProductModelPriceFrmGrp.value.productId and updateProductModelPriceFrmGrp.value.productModelId exist

        this.productModelUpdatePriceRequest.productId = this.data.productId;
        this.productModelUpdatePriceRequest.productModelId = this.data.productModelId;
        this.productModelUpdatePriceRequest.newPrice = this.updateProductModelPriceFrmGrp.value.newPrice as number;
        
        this._store.dispatch(
            productCatalogManagementActions.updateProductModelPrice({
                updateProductModelPriceReq: this.productModelUpdatePriceRequest
            })
        );
        this.resetFormValues();
    }
}