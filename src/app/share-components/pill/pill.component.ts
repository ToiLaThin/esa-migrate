import { Component, Input } from "@angular/core";
import { PillType } from "../../core/ui-models/pill-type";
//TODO: change this to esa-pill and find and replace any wrong
@Component({
    selector: 'app-pill',
    templateUrl: './pill.component.html',
    styleUrls: ['./pill.component.scss']
})
export class PillComponent {
    @Input() content!: string;
    @Input() className: PillType = PillType.SUCCESS;
}