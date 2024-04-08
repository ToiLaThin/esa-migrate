import { Component, ElementRef, OnInit, Renderer2, ViewChildren } from '@angular/core';
import { StepperData } from '../../../../core/ui-models/stepper-data';
import { ColorSvgNames } from '../../../../share-components/svg-definitions/color-svg-names.enum';

@Component({
    selector: 'esa-order-tracking-stepper',
    templateUrl: './order-tracking-stepper.component.html',
    styleUrls: ['./order-tracking-stepper.component.scss']
})
export class OrderTrackingStepperComponent implements OnInit {
    steppers: StepperData[] = [
        new StepperData('Created Draft', ColorSvgNames.ViewDetail, 'Your order has been created.','/shopping/order-process/'),
        new StepperData('Info Confirmed', ColorSvgNames.User, 'Your order info been confirmed.','/shopping/order-process/customer-info'),
        new StepperData('Payment Method Chosen', ColorSvgNames.PaymentMethods, 'Your order payment methods been chosen.','/shopping/order-process/payment-methods'),
        new StepperData('Approving Order', ColorSvgNames.Checkmakr, 'Your order is approving. Plese wait.','/shopping/order-process/'),
        new StepperData('Order Shipped', ColorSvgNames.Location, 'Your order has been ready to shipped.',''),
        new StepperData('Order Delivered', ColorSvgNames.Checkmakr, 'Your order has been delivered.','')
    ];
    constructor(private _renderer: Renderer2) {}
    @ViewChildren('container', { read: ElementRef }) containers!: ElementRef[];
    ngOnInit() {}

    addActiveClass(event: Event) {
        const clickedContainer = event.target as HTMLElement;
        this.containers.forEach((container) => {
            this._renderer.removeClass(container.nativeElement, 'active');
        });

        let isReached = false;
        this.containers.forEach((container) => {
            if (container.nativeElement !== clickedContainer.parentElement && !isReached) {
                this._renderer.addClass(container.nativeElement, 'active');
            } else if (container.nativeElement === clickedContainer.parentElement) {
                isReached = true;
            }
        });
        //clickedContainer.parentElement?.classList.toggle('active');
    }
}
