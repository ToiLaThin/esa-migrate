import { NgModule } from "@angular/core";
import { SvgIconComponent } from "./svg-icon/svg-icon.component";
import { SvgDefinitionsComponent } from "./svg-definitions/svg-definitions.component";
import { ButtonComponent } from "./button/button.component";
import { CommonModule } from "@angular/common";

const sharedComponents = [
    SvgIconComponent,
    SvgDefinitionsComponent,
    ButtonComponent
]
@NgModule({
    declarations: [sharedComponents],
    imports: [CommonModule],
    exports: [sharedComponents]
})
export class ShareComponentsModule {

}