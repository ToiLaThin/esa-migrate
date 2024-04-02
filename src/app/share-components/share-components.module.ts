import { NgModule } from "@angular/core";
import { SvgIconComponent } from "./svg-icon/svg-icon.component";
import { SvgDefinitionsComponent } from "./svg-definitions/svg-definitions.component";
import { ButtonComponent } from "./button/button.component";
import { CommonModule } from "@angular/common";
import { PillComponent } from "./pill/pill.component";
import { InputComponent } from "./input/input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const sharedComponents = [
    SvgIconComponent,
    SvgDefinitionsComponent,
    ButtonComponent,
    PillComponent,
    InputComponent
]
@NgModule({
    declarations: [sharedComponents],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [sharedComponents]
})
export class ShareComponentsModule {

}