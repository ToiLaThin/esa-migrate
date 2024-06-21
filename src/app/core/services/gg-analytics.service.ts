import { Injectable } from "@angular/core";
import { IProduct } from "../models/product.interface";
import { ICartConfirmRequest, ICartItem } from "../models/cart-item.interface";
import { IOrderAggregateCart } from "../models/order.interface";

declare var gtag : any;

@Injectable({
    providedIn: 'root'
})
export class GgAnalyticsService {
    constructor() {}

    //TODO can define a model for gg analytics event, metadata, etc.
    viewPage(pageTitle: string, pagePath: string, pageLocation: string) {
        gtag('event', 'page_view', {
            page_title: pageTitle,
            page_path: pagePath,
            page_location: pageLocation
        });
        console.log('gtag page_view for page...' + pageTitle);
    }

    viewProduct(product: IProduct) {
        gtag('event', 'view_item', {
            currency: 'VND',
            value: product.productModels[0].price,
            items: [{
                item_id: product.businessKey,
                item_name: product.productName,
                item_brand: product.productInfo?.productBrand,
                item_category: product.subCatalogName,
                price: product.productModels[0].price,
                quantity: 1
            }]
        });
        console.log('gtag view_item for product...' + product.productName);
    }

    addToCart(cartItem: ICartItem) {
        gtag('event', 'add_to_cart', {
            currency: 'VND',
            value: cartItem.finalPrice,
            items: [{
                item_id: cartItem.businessKey,
                item_name: cartItem.productName,
                //item_brand: ,
                item_category: cartItem.subCatalogName,
                price: cartItem.unitPrice,
                quantity: cartItem.quantity
            }]
        });
        console.log('gtag add_to_cart for product...' + cartItem.productName);
    }

    beginCheckout(cartConfirmReq: ICartConfirmRequest) {
        gtag('event', 'begin_checkout', {
            currency: 'VND',
            coupon: cartConfirmReq.couponCode || null,
            value: cartConfirmReq.cartItems.reduce((total, item) => total + item.finalPrice, 0),
            items: cartConfirmReq.cartItems.map(item => {
                return {
                    item_id: item.businessKey,
                    item_name: item.productName,
                    //item_brand: ,
                    item_category: item.subCatalogName,
                    price: item.unitPrice,
                    quantity: item.quantity
                }
            })
        });
    }

    purchase(orderAggregateCart: IOrderAggregateCart) {
        gtag('event', 'purchase', {
            currency: 'VND',
            transaction_id: orderAggregateCart.orderBusinessKey,
            value: orderAggregateCart.cart.totalPriceFinal,
            items: orderAggregateCart.cart.items.map(item => {
                return {
                    item_id: item.cartItemBusinessKey,
                    item_name: item.productName,
                    //item_brand: ,
                    item_category: item.subCatalogName,
                    price: item.unitPrice,
                    quantity: item.quantity
                }
            })
        });
    }

    addPaymentInfo(orderAggregateCart: IOrderAggregateCart, paymentMethod: string) {
        gtag('event', 'add_payment_info', {
            currency: 'VND',
            value: orderAggregateCart.cart.totalPriceFinal,
            items: orderAggregateCart.cart.items.map(item => {
                return {
                    item_id: item.cartItemBusinessKey,
                    item_name: item.productName,
                    //item_brand: ,
                    item_category: item.subCatalogName,
                    price: item.unitPrice,
                    quantity: item.quantity
                }
            }),
            payment_type: paymentMethod
        });
    }

    addShippingInfo(orderAggregateCart: IOrderAggregateCart) {
        gtag('event', 'add_shipping_info', {
            currency: 'VND',
            value: orderAggregateCart.cart.totalPriceFinal,
            items: orderAggregateCart.cart.items.map(item => {
                return {
                    item_id: item.cartItemBusinessKey,
                    item_name: item.productName,
                    //item_brand: ,
                    item_category: item.subCatalogName,
                    price: item.unitPrice,
                    quantity: item.quantity
                }
            }),
            shipping_tier: 'Ground'
        });
    }

    addToWishList(product: IProduct) {
        gtag('event', 'add_to_wishlist', {
            currency: 'VND',
            value: product.productModels[0].price,
            items: [{
                item_id: product.businessKey,
                item_name: product.productName,
                item_brand: product.productInfo?.productBrand,
                item_category: product.subCatalogName,
                price: product.productModels[0].price,
                quantity: 1
            }]
        });
    }

    searchFor(searchTerm: string) {
        gtag('event', 'search', {
            search_term: searchTerm
        });
    }
}