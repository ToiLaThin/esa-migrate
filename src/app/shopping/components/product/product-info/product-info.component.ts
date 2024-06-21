import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IProduct, IProductModel } from "../../../../core/models/product.interface";
import { Store } from "@ngrx/store";
import { cartActions } from "../../../state/cart/cart.actions";
import { authActions } from "../../../../auth/state/auth.actions";
import { ICartItem } from "../../../../core/models/cart-item.interface";
import { ProductClassName } from "../../../class/product-class";
import { I18NProductIdSelector } from "../../../translate-ids/i18n-product-id";
import { I18NCommonIdSelector } from "../../../../core/translation-loader/i18n-common-id";
import { Router } from "@angular/router";

@Component({
    selector: 'esa-product-info',
    templateUrl: './product-info.component.html',
    styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
    @Input({required: true}) product!: IProduct;
    @Input({required: true}) isProductBookmarked!: boolean | null;
    @Input({required: true}) isProductLiked!: boolean | null;
    @Input({required: true}) isProductDisliked!: boolean | null;
    @Output() productBookmarkToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() productLikeToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() productDislikeToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() productAddedToCompareList: EventEmitter<string> = new EventEmitter<string>(); //productId
    @Output() modelAddedToCart: EventEmitter<ICartItem> = new EventEmitter<ICartItem>();
    @Output() modelBuyedNow: EventEmitter<ICartItem> = new EventEmitter<ICartItem>();
    get ProductClassName() {
        return ProductClassName;
    }
    
    get I18NProductIds() {
        return I18NProductIdSelector;
    }

    get I18NCommonIds() {
        return I18NCommonIdSelector;
    }
    
    constructor( private _store: Store) {
        console.log(this.isProductBookmarked);
        console.log(this.isProductLiked);
        console.log(this.isProductDisliked);
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
                    : model.priceOnSaleModel * parseInt(modelQuantity.value),
            productName: this.product.productName,
            productImage: this.product.productCoverImage,
            subCatalogName: this.product.subCatalogName,
        };

        //reset the quantity input
        modelQuantity.value = '1';
        this.modelAddedToCart.emit(cartItem as ICartItem); //try to type assertion so if there is a missing field / undefined, it will throw an error        
    }

    buyNowModel(event: Event, model: IProductModel) {
        //clear the old items in cart and local storage first
        this._store.dispatch(cartActions.cartClear());

        //get the quantity from the input
        console.log("buy now product model");
        event.preventDefault();
        let submitBtn = event.target as HTMLButtonElement;
        let modelContainer = submitBtn.parentElement?.closest('div') as HTMLDivElement;
        let modelQuantity = modelContainer.querySelector(
            'input[name="quantity"]'
        ) as HTMLInputElement;

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

        //reset the quantity input
        modelQuantity.value = '1';
        this.modelBuyedNow.emit(cartItem as ICartItem); //try to type assertion so if there is a missing field / undefined, it will throw an error        
    }

    login() {
        this._store.dispatch(authActions.loginAttempted());
    }

    toggleProductBookmark(isBookmarked: boolean) {
        this.productBookmarkToggled.emit(isBookmarked);
    }

    toggleProductLike(isLiked: boolean) {
        // (this.isProductLiked === false && this.isProductDisliked === false): if you logged in and you didn't like or dislike the product, this is valid
        if(this.isProductLiked === true && this.isProductDisliked === true) {
            alert("Error: like and dislike the product at the same time");
            return;
        }
        console.log("toggleProductLike:", isLiked);
        this.productLikeToggled.emit(isLiked);
    }

    toggleProductDislike(isDisliked: boolean) {
        // (this.isProductLiked === false && this.isProductDisliked === false): if you logged in and you didn't like or dislike the product, this is valid
        if(this.isProductLiked === true && this.isProductDisliked === true) {
            alert("Error: like and dislike the product at the same time");
            return;
        }
        console.log("toggleProductDislike:", isDisliked);
        this.productDislikeToggled.emit(isDisliked);
    }

    addProductToCompareList() {
        this.productAddedToCompareList.emit(this.product.productId);
    }
}