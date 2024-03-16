import { NgModule } from "@angular/core";
import { managementRoutes } from "./management.routes";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        RouterModule.forChild(managementRoutes)
    ],
    declarations: [],
    exports: [],
})
export class ManagementModule {
}

