import { Component, Input } from "@angular/core";

@Component({
    selector: 'esa-testimonial-card',
    templateUrl: './testimonial-card.component.html',
})
export class TestimonialCardComponent {
    @Input() imgLink!: string;
    @Input() name!: string;
    @Input() designation!: string;
    @Input() description!: string;
    constructor() { }
}