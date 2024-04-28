import { Component } from "@angular/core";
import { I18NCommonIdSelector } from "../../../core/translation-loader/i18n-common-id";
import { LayoutClassName } from "../../class/layout-class";
import { I18NIndexIdSelector } from "../../translate-ids/i18n-index-id";
import { TranslateService } from "@ngx-translate/core";
import { OutlineSvgNames } from "../../../share-components/svg-definitions/outline-svg-names.enum";

@Component({
    selector: 'esa-index',
    templateUrl: './index.component.html'

})
export class IndexComponent {
    constructor(private _translateService: TranslateService) { }

    get I18NCommonIds() {
        return I18NCommonIdSelector;
    }

    get I18NIndexIds() {
        return I18NIndexIdSelector;
    }
    
    get LayoutClassName() {
        return LayoutClassName;
    }

    get OutlineSvgNames() {
        return OutlineSvgNames;
    
    }

    get FreeShippingDesc() {
        return this._translateService.instant(I18NIndexIdSelector.BodyFreeShippingDesc, {price: 1000000})
    }
}