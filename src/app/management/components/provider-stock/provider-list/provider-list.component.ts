import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProviderRequirementWithCatalogsAggregate } from '../../../../core/models/provider.interface';
import { Store } from '@ngrx/store';
import { providerStockManagementActions } from '../../../state/provider-stock/provider-stock.actions';
import { selectorAllProviderRequirementsWithCatalogs } from './../../../state/provider-stock/provider-stock.selectors';
import { catalogManagementActions } from '../../../state/management/management.actions';
import { Router } from '@angular/router';

@Component({
    selector: 'esa-management-provider-list',
    templateUrl: './provider-list.component.html',
    styleUrls: ['./provider-list.component.scss']
})
export class ProviderListManagementComponent implements OnInit {
    theme = {
        white: '#fff',
        purple: '#6420AA',
        green: '#337357',
        red: '#D64545',
        gray: '#DDD'
    };
    allProviderRequirementWithCatalogsAggregates$!: Observable<
        IProviderRequirementWithCatalogsAggregate[]
    >;

    constructor(private _store: Store, private _router: Router) {
        this._store.dispatch(providerStockManagementActions.loadAllProviderRequirements());
        this._store.dispatch(catalogManagementActions.reloadCatalogs()); //so in the share management state we have all the catalogs
    }

    ngOnInit(): void {
        this.allProviderRequirementWithCatalogsAggregates$ = this._store.select(
            (state) => selectorAllProviderRequirementsWithCatalogs(state)
            //this is enough no as as {[providerStockManagementFeatureKey]: IProviderStockManagementState, [managementFeatureKey]: IManagementState}
        );
    }

    increaseQty() {
        const qtyInput = document.getElementById('qtyInput') as HTMLInputElement;
        qtyInput.stepUp();
    }

    decreaseQty() {
        const qtyInput = document.getElementById('qtyInput') as HTMLInputElement;
        qtyInput.stepDown();
    }

    navigateToProviderDetail(providerRequirementId: string) {
        console.log('Navigating to provider detail with id: ', providerRequirementId);
        this._store.dispatch(
            providerStockManagementActions.selectProviderRequirement({ providerRequirementId })
        );
        this._router.navigate(['management/provider-stock/provider-detail'], { replaceUrl: true });
    }

    notify() {
        console.log('You will be notified when the product is available');
    }
}
