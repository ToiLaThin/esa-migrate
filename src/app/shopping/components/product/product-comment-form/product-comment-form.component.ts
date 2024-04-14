import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";

@Component({
    selector: 'esa-product-comment-form',
    templateUrl: './product-comment-form.component.html',
    styleUrls: ['./product-comment-form.component.scss']
})
export class ProductCommentFormComponent implements AfterViewInit {
    @Output() productCommented: EventEmitter<string> = new EventEmitter<string>();
    @ViewChild('commentDetail', { read: ElementRef<HTMLTextAreaElement> }) commentDetail!: ElementRef<HTMLTextAreaElement>;

    constructor() {
    }

    ngAfterViewInit(): void {
        this.commentDetail.nativeElement.value = '';
    }

    autoGrow(event: any) {
        console.log(event.target.scrollHeight, event.target.style.height);
        event.target.style.height = "auto";
        event.target.style.height = (event.target.scrollHeight) + "px";
    }

    commentProduct(commentFormValue: { commentDetail: string}) {
        this.productCommented.emit(commentFormValue.commentDetail);
        this.commentDetail.nativeElement.value = '';
    }
}