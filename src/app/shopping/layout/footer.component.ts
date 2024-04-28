import { Component } from "@angular/core";
import { I18NLayoutIdSelector } from "../translate-ids/i18n-layout-id";

@Component({
    selector: 'esa-shopping-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent {
    get I18NLayoutIds() {
        return I18NLayoutIdSelector;
    }
}