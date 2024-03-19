import { NgModule } from "@angular/core";
import { SvgIconComponent } from "./svg-icon/svg-icon.component";
import { SvgDefinitionsComponent } from "./svg-definitions/svg-definitions.component";

const sharedComponents = [
    SvgIconComponent,
    SvgDefinitionsComponent
]
@NgModule({
    declarations: [sharedComponents],
    imports: [],
    exports: [sharedComponents]
})
export class ShareComponentsModule {

}