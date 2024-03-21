import { Component, Input } from "@angular/core";
import { IProduct, IProductModel } from "../../../../core/models/product.interface";
import { Store } from "@ngrx/store";
import { cartActions } from "../../../state/cart/cart.actions";

@Component({
    selector: 'esa-product-info',
    templateUrl: './product-info.component.html',
    styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
    @Input() product!: IProduct;

    constructor( private _store: Store) {}

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
}