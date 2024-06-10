import { Component } from "@angular/core";
import { OutlineSvgNames } from "../../../share-components/svg-definitions/outline-svg-names.enum";

@Component({
    selector: 'esa-management-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
}