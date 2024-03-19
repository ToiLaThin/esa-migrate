import { Component, Input } from "@angular/core";

@Component({
    selector: 'svg-icon',
    templateUrl: './svg-icon.component.html'
})
export class SvgIconComponent {
    @Input() size: number = 16;
    @Input() widthEqualHeight: boolean = true;
    @Input() hSize: number = 16;
    @Input() iconName!: string;
    @Input() fillColor = 'currentColor' //inherit

    get iconUrl() {
        return `${window.location.href}#${this.iconName}`
    }
}