import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { OutlineSvgNames } from '../../../share-components/svg-definitions/outline-svg-names.enum';
import { ColorSvgNames } from '../../../share-components/svg-definitions/color-svg-names.enum';
import { IFeatureLinkData, featureLinkDatas } from './ui-navigation.interface';
import { authActions } from '../../../auth/state/auth.actions';
import { IUserInfo } from '../../../core/models/account.interface';

@Component({
    selector: 'esa-management-navigation-horizontal',
    templateUrl: './management-navigation-horizontal.component.html',
    styleUrls: ['./management-navigation-horizontal.component.scss']
})
export class ManagementNavigationHorizontalComponent {
    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
    
    get ColorSvgNames() {
        return ColorSvgNames;
    }

    featureLinkDatas: IFeatureLinkData[] = featureLinkDatas;
    featureLinkSelected!: IFeatureLinkData;
    @Input() userInfo!: IUserInfo;
    constructor(private _store: Store) {
    }

    selectFeatureLink(featureLink: IFeatureLinkData): void {
        this.featureLinkSelected = featureLink;
    }

    logout() {
        this._store.dispatch(authActions.logoutAttempted());
    }
}
