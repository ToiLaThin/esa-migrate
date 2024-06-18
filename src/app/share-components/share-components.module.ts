import { NgModule } from "@angular/core";
import { SvgIconComponent } from "./svg-icon/svg-icon.component";
import { SvgDefinitionsComponent } from "./svg-definitions/svg-definitions.component";
import { ButtonComponent } from "./button/button.component";
import { CommonModule } from "@angular/common";
import { PillComponent } from "./pill/pill.component";
import { InputComponent } from "./input/input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FullPageNotificationComponent } from "./full-page-notification/full-page-notification.component";
import { DashboardLayoutComponent } from "./dashboard-layout/dashboard-layout.component";
import { NzModalModule } from "ng-zorro-antd/modal";
import { LoaderSpinnerComponent } from "./loader/loader-spinner.component";

const sharedComponents = [
    SvgIconComponent,
    SvgDefinitionsComponent,
    ButtonComponent,
    PillComponent,
    InputComponent,
    LoaderSpinnerComponent,
    FullPageNotificationComponent,
    DashboardLayoutComponent
]
@NgModule({
    declarations: [sharedComponents],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzModalModule],
    exports: [sharedComponents]
})
export class ShareComponentsModule {

}