import { Component, EmbeddedViewRef, Input, TemplateRef, ViewChild, ViewContainerRef, viewChild } from "@angular/core";
import { DashboardLayout } from "../../core/ui-models/dashboard-layout-type";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
    selector: 'esa-dashboard-layout',
    templateUrl: './dashboard-layout.component.html',
    styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {
    currentDashboardLayoutMode: DashboardLayout = DashboardLayout.Rows;
    @Input({required: true}) dashboardType!: 'cartItem' | 'cartOrder';
    // <iframe title="esaDistrictCartOrderReport" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=d13c27ae-1495-4930-b4f4-cb2c326c0258&autoAuth=true&embeddedDemo=true" frameborder="0" allowFullScreen="true"></iframe>
    cartItemDashboardIrameUrls = [
        'https://app.powerbi.com/reportEmbed?reportId=9f262807-6be7-4f9e-98e0-0c9f2d5372ea&autoAuth=true&embeddedDemo=true',
        'https://app.powerbi.com/reportEmbed?reportId=08defa4f-feb6-4bc6-b492-a028351af8c7&autoAuth=true&embeddedDemo=true',
        'https://app.powerbi.com/reportEmbed?reportId=52757851-c42b-4728-bd7c-78458dd0743b&autoAuth=true&embeddedDemo=true'
    ];

    cartOrderDashboardIframeUrls = [
        'https://app.powerbi.com/reportEmbed?reportId=d13c27ae-1495-4930-b4f4-cb2c326c0258&autoAuth=true&embeddedDemo=true',
        'https://app.powerbi.com/reportEmbed?reportId=65033f44-926c-479b-8fd6-b065af4cfbf3&autoAuth=true&embeddedDemo=true'
    ];

    get DashBoardLayout() {
        return DashboardLayout;
    }

    constructor(private _modalService: NzModalService) {}
}