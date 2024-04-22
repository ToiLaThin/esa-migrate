import { Component } from "@angular/core";
import { OutlineSvgNames } from "../../../share-components/svg-definitions/outline-svg-names.enum";

@Component({
    selector: 'esa-management-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent {
    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
}