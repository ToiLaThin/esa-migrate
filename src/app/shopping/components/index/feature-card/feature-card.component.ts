import { Component, Input } from "@angular/core";

@Component({
    selector: 'esa-feature',
    templateUrl: './feature-card.component.html',
})
export class FeatureCardComponent {
    @Input() heading!: string;
    @Input() iconClass!: string;
    @Input() description!: string;
}