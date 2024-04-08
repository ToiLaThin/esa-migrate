import { Component, OnInit } from "@angular/core";
import { ColorSvgNames } from "../../../../share-components/svg-definitions/color-svg-names.enum";

@Component({
    selector: "esa-order-tracking-customer-info",
    templateUrl: "./order-tracking-customer-info.component.html",
    styleUrls: ["./order-tracking-customer-info.component.scss"]
    
})
export class OrderTrackingCustomerInfoComponent implements OnInit {
  constructor() {}
  ngOnInit() {}

  get ColorSvgNames() {
    return ColorSvgNames;
  }
}