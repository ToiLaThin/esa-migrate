import { Component, OnInit } from "@angular/core";
import { ColorSvgNames } from "../../../../share-components/svg-definitions/color-svg-names.enum";

export enum PaymentMethod {
  COD = 0,
  Momo = 1,
  CreditCard = 2
}

@Component({
    selector: "esa-order-tracking-payment-methods",
    templateUrl: "./order-tracking-payment-methods.component.html",
    styleUrls: ["./order-tracking-payment-methods.component.scss"]
    
})
export class OrderTrackingPaymentMethodsComponent implements OnInit {
  get ColorSvgNames() {
    return ColorSvgNames;
  }

  get PaymentMethod() {
    return PaymentMethod;
  }

  paymentMethodChoosen: 'none' | PaymentMethod = 'none';
  paymentMethodKeyArr = Object.keys(PaymentMethod).map(p => parseInt(p)).filter(x => !isNaN(x));
  paymentMethodKeyValueArr = this.paymentMethodKeyArr.map((key) => {
    return {
      key,
      value: PaymentMethod[key]
    }
  });

  constructor() {}
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
    let paymentMethodInput = (event.target as HTMLInputElement);
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
}