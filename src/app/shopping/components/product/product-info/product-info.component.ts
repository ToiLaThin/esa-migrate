import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IProduct, IProductModel } from "../../../../core/models/product.interface";
import { Store } from "@ngrx/store";
import { cartActions } from "../../../state/cart/cart.actions";
import { authActions } from "../../../../auth/state/auth.actions";
import { productActions } from "../../../state/product/product.actions";

@Component({
    selector: 'esa-product-info',
    templateUrl: './product-info.component.html',
    styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
    @Input({required: true}) product!: IProduct;
    @Input({required: true}) isProductBookmarked!: boolean | null;
    @Output() productBookmarkToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor( private _store: Store) {
        console.log(this.isProductBookmarked);
        
    }

    addModelToCart(event: Event, model: IProductModel) {
        //get the quantity from the input
        console.log("add model to cart");
        event.preventDefault();
        let submitBtn = event.target as HTMLButtonElement;
        let modelContainer = submitBtn.parentElement?.closest('div') as HTMLDivElement;
        let modelQuantity = modelContainer.querySelector(
            'input[name="quantity"]'
        ) as HTMLInputElement;

        //construct the cartItem to add to cart
        let cartItem = {
            productId: this.product?.productId,
            productModelId: model.productModelId,
            businessKey: this.product?.businessKey,
            quantity: parseInt(modelQuantity.value),
            isOnSale: model.isOnSaleModel,
            saleItemId: model.saleItemId,
            saleType: model.saleType,
            saleValue: model.saleValueModel,
            unitPrice: model.price,
            finalPrice: model.price * parseInt(modelQuantity.value),
            unitAfterSalePrice: model.isOnSaleModel === false ? undefined : model.priceOnSaleModel,
            finalAfterSalePrice:
                model.isOnSaleModel === false
                    ? undefined
                    : model.priceOnSaleModel === undefined
                    ? undefined
                    : model.priceOnSaleModel * parseInt(modelQuantity.value)
        };

        //reset the quantity input
        modelQuantity.value = '1';

        this._store.dispatch(
            cartActions.cartItemUpsert({
                upsertCartItem: cartItem
            })
        );
    }

    login() {
        this._store.dispatch(authActions.loginAttempted());
    }

    toggleProductBookmark(isBookmarked: boolean) {
        this.productBookmarkToggled.emit(isBookmarked);
    }
}