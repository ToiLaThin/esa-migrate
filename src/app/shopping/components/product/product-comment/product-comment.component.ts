import { Component, Input } from "@angular/core";
import { IComment } from "../../../../core/models/order.interface";

@Component({
    selector: 'esa-product-comment',
    templateUrl: './product-comment.component.html',
    styleUrls: ['./product-comment.component.scss']
})
export class ProductCommentComponent {
    @Input({required: true}) comment!: IComment;
}