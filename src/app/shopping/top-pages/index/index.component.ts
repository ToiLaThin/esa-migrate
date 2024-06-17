import { Component, OnDestroy, OnInit } from "@angular/core";
import { I18NCommonIdSelector } from "../../../core/translation-loader/i18n-common-id";
import { LayoutClassName } from "../../class/layout-class";
import { I18NIndexIdSelector } from "../../translate-ids/i18n-index-id";
import { TranslateService } from "@ngx-translate/core";
import { OutlineSvgNames } from "../../../share-components/svg-definitions/outline-svg-names.enum";
import { HttpClient } from "@angular/common/http";
import { IProduct } from "../../../core/models/product.interface";
import { Subscription } from "rxjs";

@Component({
    selector: 'esa-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']

})
export class IndexComponent implements OnInit, OnDestroy {
    constructor(private _translateService: TranslateService, private _http: HttpClient) { }

    ngOnDestroy(): void {
        this.placeholderProductSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.placeholderProductSubscription = this._http.get<IProduct[]>('../../../../assets/data/product.json').subscribe(data => {
            this.placeholderProducts = data
        });        
    }

    get I18NCommonIds() {
        return I18NCommonIdSelector;
    }

    get I18NIndexIds() {
        return I18NIndexIdSelector;
    }
    
    get LayoutClassName() {
        return LayoutClassName;
    }

    get OutlineSvgNames() {
        return OutlineSvgNames;
    
    }

    get FreeShippingDesc() {
        return this._translateService.instant(I18NIndexIdSelector.BodyFreeShippingDesc, {price: 1000000})
    }

    placeholderProducts!: IProduct[]
    placeholderProductSubscription!: Subscription;
}