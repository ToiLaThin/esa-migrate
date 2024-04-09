import { OrderStatus } from "../types/order-status.enum";
import { DiscountType } from "./sale-item.interface";
import { PaymentMethod } from "../types/payment-method.enum";

export interface IOrderDraftViewModel {
    orderId: string;
    subTotal: number;
    totalDiscount: number;
}

export interface IOrderViewModel {
    orderId: string;
    orderStatus: OrderStatus;
    subTotal: number;
    totalDiscount: number;
}

export interface IComment {
    commentId: string;
    productBusinessKey: string;
    userId: string;
    commentDetail: string;
    dateModified: Date;
}

//this have some prop key different from ICartItem
//this also used in IOrderAggregateCartViewModel
export interface ICartItemViewModel {
    cartId?: string; //for receiving
    productId?: string;
    productModelId?: string;
    cartItemBusinessKey?: string;
    saleItemId: string;
    isOnSale?: boolean;
    saleType?: DiscountType;
    saleValue?: number;
    quantity: number;
    unitPrice: number;
    finalPrice: number;
    unitAfterSalePrice?: number;
    finalAfterSalePrice?: number;        
}

export interface ICartSummaryViewModel {
    cartPrimaryKey: string;
    userId: string;
    haveCouponApplied: boolean;
    couponId?: string;
    haveAnySaleItem: boolean;

    couponDiscountType?: DiscountType;
    couponDiscountAmount: number;
    couponDiscountValue: number;

    totalSaleDiscountAmount: number;
    totalPriceOriginal: number;
    totalPriceAfterSale: number;
    totalPriceAfterCouponApplied: number;
    totalPriceFinal: number;

    items : ICartItemViewModel[];
}

export interface IAddressViewModel {
    orderReferenceId: string;
    country: string;
    cityOrProvinceOrPlace: boolean;
    districtOrLocality: string;
    postalCode: string;
    street: string;
    fullAddressName: string;
}

export interface IOrderAggregateCart {
    orderId: string;
    cartId: string;
    orderBusinessKey: string;
    cart: ICartSummaryViewModel;
    address?: IAddressViewModel;
    phoneNumber: string;
    paymentMethod:PaymentMethod;

    
    orderStatus: OrderStatus;
    dateCreatedDraft: Date;
    dateCustomerInfoConfirmed?: Date;
    dateCheckouted?: Date;
    dateStockConfirmed?: Date;
    dateRefunded?: Date;
    dateCancelled?: Date;
    dateCompleted?: Date;
}