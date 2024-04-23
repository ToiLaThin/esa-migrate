import { Component } from "@angular/core";
import { ColorSvgNames } from "../../share-components/svg-definitions/color-svg-names.enum";

@Component({
    selector: "esa-option-vertical",
    templateUrl: "./option-vertical.component.html",
})
export class OptionVerticalComponent {
    get ColorSvgNames() {
        return ColorSvgNames;
    }
    
    constructor() {}

    log() {
        console.log('OptionVerticalComponent');
    }

}