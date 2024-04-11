import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ColorSvgNames } from "../../../../share-components/svg-definitions/color-svg-names.enum";
import { PaymentMethod } from "../../../../core/types/payment-method.enum";

//local ui-models
class OrderListPaymentMethodUIModel {
    constructor(public paymentMethod: PaymentMethod, public title: string, public iconName: ColorSvgNames) {}
}
@Component({
    selector: 'esa-order-list-payment-method',
    templateUrl: './order-list-payment-method.component.html',
    styleUrls: ['./order-list-payment-method.component.scss']
})
export class OrderListPaymentMethodComponent {
    orderListPaymentMethodUIModels: OrderListPaymentMethodUIModel[] = [
        new OrderListPaymentMethodUIModel(PaymentMethod.COD, 'Cash on deliver', ColorSvgNames.CashPayment),
        new OrderListPaymentMethodUIModel(PaymentMethod.Momo, 'Momo', ColorSvgNames.PigPayment),
        new OrderListPaymentMethodUIModel(PaymentMethod.CreditCard, 'Credit card', ColorSvgNames.CreditPayment)
    ];

    @Input({required: true}) selectedPaymentMethod!: PaymentMethod | null;
    @Output() paymentMethodSelectedOrDeselected: EventEmitter<PaymentMethod | null> = new EventEmitter<PaymentMethod | null>();

    get ColorSvgNames() {
        return ColorSvgNames;
    }

    get PaymentMethod() {
        return PaymentMethod;
    }

    selectOrDeSelectPaymentMethod(paymentMethod: PaymentMethod) {
        if (this.selectedPaymentMethod === null) {
            //the first one to select
            this.paymentMethodSelectedOrDeselected.emit(paymentMethod);
            return;
        }

        if (this.selectedPaymentMethod === paymentMethod) {
            this.paymentMethodSelectedOrDeselected.emit(null);
            return;
        }
        if (this.selectedPaymentMethod !== paymentMethod) {
            //deselect the current selected payment method
            //then select the new payment method (or override the current selected payment method with the new one)
            this.paymentMethodSelectedOrDeselected.emit(paymentMethod);
        }
    }
        
}