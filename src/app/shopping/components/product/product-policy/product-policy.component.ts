import { Component } from "@angular/core";
import { OutlineSvgNames } from "../../../../share-components/svg-definitions/outline-svg-names.enum";

@Component({
    selector: 'esa-product-policy',
    templateUrl: './product-policy.component.html',
    styleUrls: ['./product-policy.component.scss']
})
export class ProductPolicyComponent {
    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
}