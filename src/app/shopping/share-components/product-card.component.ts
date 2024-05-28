import { Component, Input } from "@angular/core";
import { IProduct } from "../../core/models/product.interface";
import { OutlineSvgNames } from "../../share-components/svg-definitions/outline-svg-names.enum";
import { Store } from "@ngrx/store";
import { cartActions } from "../state/cart/cart.actions";
import { Router } from "@angular/router";
import { ICartItem } from "../../core/models/cart-item.interface";
import { I18NCommonIdSelector } from "../../core/translation-loader/i18n-common-id";

@Component({
    selector: 'esa-product-card',
    templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
    @Input() product!: IProduct;

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }

    get I18NCommonIds() {
        return I18NCommonIdSelector;
    }
    
    constructor(private _store: Store, private _router:Router) {}

    buyNow() {
        //clear the old items in cart and local storage first
        this._store.dispatch(cartActions.cartClear());
        console.log("buy now product model");

        let model = this.product.productModels[0];
        if (model === undefined) {
            alert('Product model is undefined');
            return;
        }

        //construct the cartItem to buy now, then redirect to cart page immediately
        let cartItem = {
            productId: this.product?.productId,
            productModelId: model.productModelId,
            businessKey: this.product?.businessKey,
            quantity: 1,
            isOnSale: model.isOnSaleModel,
            saleItemId: model.saleItemId,
            saleType: model.saleType,
            saleValue: model.saleValueModel,
            unitPrice: model.price,
            finalPrice: model.price,
            unitAfterSalePrice: model.isOnSaleModel === false ? undefined : model.priceOnSaleModel,
            finalAfterSalePrice:
                model.isOnSaleModel === false
                    ? undefined
                    : model.priceOnSaleModel === undefined
                    ? undefined
                    : model.priceOnSaleModel * 1,
            productName: this.product.productName,
            productImage: this.product.productCoverImage,
            subCatalogName: this.product.subCatalogName,
        };

        this._store.dispatch(
            cartActions.cartItemUpsert({
                upsertCartItem: cartItem as ICartItem //try to type assertion so if there is a missing field / undefined, it will throw an error
            })
        );

        this._router.navigateByUrl('/shopping/cart');
    }
}