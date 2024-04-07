import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component
({
    selector: 'esa-management-product-list-pagination',
    templateUrl: './product-list-pagination.component.html',
    styleUrls: ['./product-list-pagination.component.scss']
})
export class ProductListPaginationComponent implements OnInit{
    @Input({ required: true }) currentPage = 0;
    @Input({ required: true }) totalPageAsArray: number[] = [];
    @Output() changedPage: EventEmitter<number> = new EventEmitter<number>();

    constructor() {}

    ngOnInit(): void {
    }
    
    changePage(pageNum: number) {
        this.changedPage.emit(pageNum);    
    }

    goPrevPage() {
        this.changedPage.emit(this.currentPage - 1);
    }

    goNextPage() {
        this.changedPage.emit(this.currentPage + 1);
    }
}