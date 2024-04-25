import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GuidedTour, GuidedTourService, Orientation } from 'ngx-guided-tour';
import { LayoutClassName } from '../../shopping/class/layout-class';

@Injectable({
    providedIn: 'root'
})
export class TourService {
    //wrapper for ngx-guided-tour service
    constructor(
        private _store: Store,
        private _tourService: GuidedTourService,
        private _router: Router
    ) {}

    //later we can move this to a different file, all callback will be assign in the service
    //since service have dependencies to execute some actions like store and router
    private readonly navBarTour: GuidedTour = {
        tourId: 'navBarTour',
        useOrb: false, //hover on the orb will start tour
        steps: [
            {
                title: 'This is the theme toggle',
                content: 'Click here to change theme normal to higher contrast.',
                selector: '.' + LayoutClassName.ShoppingThemeBtn,
                orientation: Orientation.Bottom
            },
            {
                title: '',
                content: 'Now you can toggle theme available for higher contrast',
                selector: '.' + LayoutClassName.ShoppingThemeBtn,
                orientation: Orientation.Bottom
            }
        ]
    };

    startNavBarTour() {
        this.navBarTour.completeCallback = () => {
            alert('completeCallback');
        }
        this.navBarTour.skipCallback = () => {
            alert('skipCallback');
        }
        this.navBarTour.steps[1].action = () => {
            let themeBtn = document.querySelector('.' + LayoutClassName.ShoppingThemeBtn) as HTMLElement;
            themeBtn.click();
        }
        this._tourService.startTour(this.navBarTour);
        this._tourService.startTour(this.navBarTour);
    }
}
