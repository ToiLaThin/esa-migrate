import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
    selector: 'esa-input',
    templateUrl: 'input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent {

    @Input() iconName: string = '';
    @Input() iconSize: number = 18;
    @Input() placeholder: string = '';
    @Input() containerClassName: string = '';
    @Input() control!: FormControl;
    
    constructor() {}

    get iconContainerWidth():number {
        return this.iconSize * 2;
    }
}