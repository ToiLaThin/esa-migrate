import { Component } from "@angular/core";
import { I18NCommonIdSelector } from "../../../../core/translation-loader/i18n-common-id";
import { LayoutClassName } from "../../../class/layout-class";
import { I18NIndexIdSelector } from "../../../translate-ids/i18n-index-id";

@Component({
    selector: 'esa-banner',
    styleUrls: ['./banner.component.scss'], 
    templateUrl: './banner.component.html'
})
export class BannerComponent {
    get I18NCommonIds() {
        return I18NCommonIdSelector;
    }

    get I18NIndexIds() {
        return I18NIndexIdSelector;
    }

    get LayoutClassName() {
        return LayoutClassName;
    }
}