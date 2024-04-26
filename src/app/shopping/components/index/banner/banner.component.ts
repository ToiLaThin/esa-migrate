import { Component } from "@angular/core";
import { I18NCommonIdSelector } from "../../../../core/translation-loader/i18n-common-id";
import { LayoutClassName } from "../../../class/layout-class";

@Component({
    selector: 'esa-banner',
    templateUrl: './banner.component.html'
})
export class BannerComponent {
    get I18NCommonIds() {
        return I18NCommonIdSelector;
    }

    get LayoutClassName() {
        return LayoutClassName;
    }
}