import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { IOrderDraftViewModel } from "../../../core/models/order.interface";
import { ColorSvgNames } from "../../../share-components/svg-definitions/color-svg-names.enum";
import { on } from '@ngrx/store';
const orderDrafts: IOrderDraftViewModel[] = [
    {
        orderId: 'd5f3e2ea-5318-46fb-aad8-4bdf1f073a47',
        subTotal: 100,
        totalDiscount: 10
    },
    {
        orderId: '562db5c0-499e-4ae0-8631-9bd41a1c8d5d',
        subTotal: 200,
        totalDiscount: 0
    },
    {
        orderId: '3edccda3-4f65-488a-9425-974317d68886',
        subTotal: 300,
        totalDiscount: 20
    }
];

@Component({
    selector: 'esa-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
    @ViewChild('cardContainer', {read: ElementRef<HTMLDivElement>}) cardContainer!: ElementRef<HTMLDivElement>;
    isCardContainerOverflowing = false;

    orderDrafts: IOrderDraftViewModel[] = orderDrafts;
    currentWindowWidth!: number;
    get ColorSvgNames() {
        return ColorSvgNames;
    }

    //these are the breakpoints for the different screen sizes in tailwindcss
    get xlScreen() {
        return 1200;
    }
    get lgScreen() {
        return 1024;
    }
    get mdScreen() {
        return 768;
    }
    get smScreen() {
        return 576;
    }
    constructor() {}

    ngOnInit(): void {
        this.currentWindowWidth = window.innerWidth;
    }

    selectTab(event: MouseEvent) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        console.log(target);

        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        target.classList.add('active');
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.currentWindowWidth = event.target.innerWidth;
        // console.log(this.currentWindowWidth);    
        // console.log(this.cardContainer.nativeElement.offsetWidth);
        // this only happen if there is scroll aka overflow: auto
        // with flex-wrap this is not necessary
        if (this.cardContainer.nativeElement.offsetWidth < this.cardContainer.nativeElement.scrollWidth && this.currentWindowWidth > this.lgScreen) {
            this.isCardContainerOverflowing = true;
        } else {
            this.isCardContainerOverflowing = false;
        }
    }
}