import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from "@angular/core";
import { Observable } from "rxjs";

@Component({
    selector: 'esa-sale-list-pagination',
    templateUrl: './sale-list-pagination.component.html',
    styleUrls: ['./sale-list-pagination.component.scss']
})
export class SaleListPaginationComponent implements OnInit {

    @Input({required: true}) totalPageAsArray$!: Observable<number[]>;
    @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

    constructor(private _renderer: Renderer2) {}    

    ngOnInit(): void {
        console.log("table list component init")
    }

    changePageEventEmit(page: number, event: MouseEvent) {
        const allPages: NodeListOf<HTMLParagraphElement> = document.querySelectorAll('.page');
        allPages.forEach((page) => {
            this._renderer.removeClass(page, 'active');
        });
        const selectedPage: HTMLParagraphElement = event.target as HTMLParagraphElement;
        this._renderer.addClass(selectedPage, 'active');
        this.pageChanged.emit(page);
    }

    nextPageClicked() {
        const allPages: NodeListOf<HTMLParagraphElement> = document.querySelectorAll('.page');
        let currentPage: number = 0;
        allPages.forEach((page, index) => {
            if (page.classList.contains('active') && index < allPages.length - 1) {
                currentPage = index + 1;
                this._renderer.removeClass(page, 'active');
            }
        });
        if (currentPage !== 0) {
            this._renderer.addClass(allPages[currentPage], 'active');
            this.pageChanged.emit(currentPage + 1);
        }
        console.log(currentPage);
    }

    prevPageClicked() {
        const allPages: NodeListOf<HTMLParagraphElement> = document.querySelectorAll('.page');
        let currentPage: number = 0;
        allPages.forEach((page, index) => {
            if (page.classList.contains('active') && index > 0) {
                currentPage = index + 1;
                this._renderer.removeClass(page, 'active');
            }
        });
        if (currentPage !== 0) {
            this._renderer.addClass(allPages[currentPage - 2], 'active');
            this.pageChanged.emit(currentPage - 1);
        }
        console.log(currentPage);

    }
}