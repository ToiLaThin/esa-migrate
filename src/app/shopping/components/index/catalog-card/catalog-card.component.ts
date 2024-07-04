import { Component, Input } from "@angular/core";

@Component({
    selector: 'esa-catalog-card',
    templateUrl: './catalog-card.component.html',

})
export class CatalogCardComponent {
    // Add properties and methods here
    @Input({required: true}) catalogImageUrl!: string;
    @Input({required: true}) catalogTitle!: string;
}