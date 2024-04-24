import { Component, Input } from "@angular/core";
import { ColorSvgNames } from "../../share-components/svg-definitions/color-svg-names.enum";

@Component({
    selector: "esa-option-horizontal",
    templateUrl: "./option-horizontal.component.html",
})
export class OptionHorizontalComponent {

    get ColorSvgNames() {
        return ColorSvgNames;
    }

    @Input({required: true}) optionHorizontalExpanded: boolean = false;

    constructor() {}
}