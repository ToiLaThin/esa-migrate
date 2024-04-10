import { Component, OnInit } from '@angular/core';
import { ColorSvgNames } from '../../../../share-components/svg-definitions/color-svg-names.enum';
import { Store } from '@ngrx/store';
import { selectorTrackingOrder } from '../../../state/order/order.selectors';
import { orderFeatureKey } from '../../../state/order/order.reducers';
import { take, tap } from 'rxjs';
import { IOrderState } from '../../../state/order/orderState.interface';
import { IOrderAggregateCart } from '../../../../core/models/order.interface';
import { orderActions } from '../../../state/order/order.actions';

export enum PaymentMethod {
    COD = 0,
    Momo = 1,
    CreditCard = 2
}

@Component({
    selector: 'esa-order-tracking-payment-methods',
    templateUrl: './order-tracking-payment-methods.component.html',
    styleUrls: ['./order-tracking-payment-methods.component.scss']
})
export class OrderTrackingPaymentMethodsComponent implements OnInit {
    get ColorSvgNames() {
        return ColorSvgNames;
    }

    get PaymentMethod() {
        return PaymentMethod;
    }

    paymentMethodChoosen: 'none' | PaymentMethod = 'none';
    paymentMethodKeyArr = Object.keys(PaymentMethod)
        .map((p) => parseInt(p))
        .filter((x) => !isNaN(x));
    paymentMethodKeyValueArr = this.paymentMethodKeyArr.map((key) => {
        return {
            key,
            value: PaymentMethod[key]
        };
    });

    constructor(private _store: Store) {}

    ngOnInit() {
        console.log(this.paymentMethodKeyValueArr);
    }

    // if (click) is assigned to label element
    // choosenPaymentMethod(event: Event) {
    //   this.paymentMethodChoosen = true;
    //   let paymentMethodLabel = event.target as HTMLLabelElement;
    //   console.log(paymentMethodLabel.htmlFor);
    //   let paymentMethodInput = document.getElementById(paymentMethodLabel.htmlFor) as HTMLInputElement;
    //   paymentMethodInput.click();
    //   console.log(paymentMethodInput.checked);

    //   let paymentMethodLabels = document.getElementsByClassName('payment-method');
    //   for (let i = 0; i < paymentMethodLabels.length; i++) {
    //     if (paymentMethodLabels[i] !== paymentMethodLabel) {
    //       paymentMethodLabels[i].classList.remove('selected');
    //     }
    //   }

    //   paymentMethodLabel.classList.add('selected');
    // }

    //after the input is checked
    choosenPaymentMethod(event: Event) {
        let paymentMethodInput = event.target as HTMLInputElement;
        this.paymentMethodChoosen = parseInt(paymentMethodInput.value) as PaymentMethod;
        let paymentMethodLabel = paymentMethodInput.nextSibling as HTMLLabelElement;
        let allPaymentMethodLabels = document.getElementsByClassName('payment-method');
        for (let i = 0; i < allPaymentMethodLabels.length; i++) {
            if (allPaymentMethodLabels[i] !== paymentMethodLabel) {
                allPaymentMethodLabels[i].classList.remove('selected');
            }
        }
        paymentMethodLabel.classList.add('selected');
    }

    chooseThisPaymentMethod() {
        let chosenPaymentMethodInput = document.querySelector(
            'input[name="payment-method"]:checked'
        ) as HTMLInputElement;
        if (chosenPaymentMethodInput === null) {
            alert('Please choose a payment method');
            return;
        }
        let currentTrackingOrder: IOrderAggregateCart | null = null;
        let currentTrackingOrderSub = this._store
            .select((state) => selectorTrackingOrder(state as { [orderFeatureKey]: IOrderState }))
            .pipe(tap((trackingOrder) => (currentTrackingOrder = trackingOrder!)))
            .subscribe();
        currentTrackingOrderSub.unsubscribe();

        if (currentTrackingOrder === null) {
            alert('There is an error. Please try again later');
            return;
        }

        let selectedPaymentMethod = this.paymentMethodKeyValueArr.find(
            (p) => p.key === parseInt(chosenPaymentMethodInput.value)
        );
        switch (selectedPaymentMethod?.key) {
            case PaymentMethod.COD:
                //TODO: add an route guard before navigating to this component to make sure that the orderId is not undefined
                this._store.dispatch(orderActions.pickPaymentMethodCOD());
                break;
            case PaymentMethod.Momo:
                this._store.dispatch(orderActions.pickPaymentMethodEWallet());
                break;
            case PaymentMethod.CreditCard:
                this._store.dispatch(orderActions.pickPaymentMethodCreditCard());
                break;
        }
    }
}
