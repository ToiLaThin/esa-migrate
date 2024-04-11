import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'esa-order-list-pagination',
    templateUrl: './order-list-pagination.component.html',
    styleUrls: ['./order-list-pagination.component.scss']

})
export class OrderListPaginationComponent {
    @Input({ required: true }) currentPageNum!: number;
    @Input({ required: true }) totalPagesAsArray: number[] = [];
    @Output() changedPage: EventEmitter<number> = new EventEmitter<number>();
    constructor() { }
    ngOnInit() {
    }

    changePage(pageNum: number) {
        this.changedPage.emit(pageNum);    
    }

    goPrevPage() {
        this.changedPage.emit(this.currentPageNum - 1);
    }

    goNextPage() {
        this.changedPage.emit(this.currentPageNum + 1);
    }
}