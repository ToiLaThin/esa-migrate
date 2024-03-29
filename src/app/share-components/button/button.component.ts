import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() className: string = 'btn-primary';
    @Input() isActive!: boolean;
    @Input() type: string = 'button';

    @Input() iconName!: string;
    @Input() iconSize: number = 18;
}