import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'esa-full-page-notification',
    templateUrl: './full-page-notification.component.html',
    styleUrls: ['./full-page-notification.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FullPageNotificationComponent {
    @Input() notifyIconName!: string; 
    // Valid Name(in svg-definition.component) of the icon to be displayed
    // If none is passed in, this have no main image
    constructor() { 
    }
    
    ngOnInit() {
    }
}