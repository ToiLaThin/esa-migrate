import { Component } from "@angular/core";
import { OutlineSvgNames } from "../../../share-components/svg-definitions/outline-svg-names.enum";

@Component({
    selector: 'esa-management-provider-stock',
    templateUrl: './provider-stock.component.html',
    styleUrls: ['./provider-stock.component.scss']
})
export class ProviderStockComponent {
    constructor() {}

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
}