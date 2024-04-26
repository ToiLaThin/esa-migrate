import { Component } from "@angular/core";
import { I18NCommonIdSelector } from "../../../core/translation-loader/i18n-common-id";
import { LayoutClassName } from "../../class/layout-class";

@Component({
    selector: 'esa-index',
    templateUrl: './index.component.html'

})
export class IndexComponent {
    constructor() { }

    get I18NCommonIds() {
        return I18NCommonIdSelector;
    }

    get LayoutClassName() {
        return LayoutClassName;
    }
}