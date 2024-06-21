import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ColorSvgNames } from '../../../../share-components/svg-definitions/color-svg-names.enum';
import { Store } from '@ngrx/store';
import {
    selectorCustomerOrderInfo,
    selectorIsAddressDefined,
    selectorTrackingOrder
} from '../../../state/order/order.selectors';
import { orderFeatureKey } from '../../../state/order/order.reducers';
import { IOrderState } from '../../../state/order/orderState.interface';
import { Observable, combineLatest, debounceTime, fromEvent, map, startWith, tap } from 'rxjs';
import {
    ICustomerOrderInfo,
    ICustomerOrderInfoConfirmedRequest
} from '../../../../core/models/customer-order-info.interface';
import { orderActions } from '../../../state/order/order.actions';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { OrderClassName, OrderIdName } from '../../../class/order-class';
import { GgAnalyticsService } from '../../../../core/services/gg-analytics.service';
import { IOrderAggregateCart } from '../../../../core/models/order.interface';

@Component({
    selector: 'esa-order-tracking-customer-info',
    templateUrl: './order-tracking-customer-info.component.html',
    styleUrls: ['./order-tracking-customer-info.component.scss']
})
export class OrderTrackingCustomerInfoComponent implements OnInit {
    orderId!: string;
    trackingOrder!: IOrderAggregateCart | null; //for gg analytics to send event
    usingSavedLocation: boolean = true;

    inputtedPhoneNumber$!: Observable<string>;
    inputtedAddress$!: Observable<string>;
    savedAddress$!: Observable<string>;
    isAddressDefined$!: Observable<boolean>;

    customerOrderInfo$!: Observable<ICustomerOrderInfo | null>;
    customerInfoForm = this._fb.group({
        phoneNumberInput: ['', Validators.required],
        addressInput: ['', Validators.required]
    });
    customerOrderInfoConfirmRequest!: ICustomerOrderInfoConfirmedRequest;

    get ColorSvgNames() {
        return ColorSvgNames;
    }

    get OrderClassName() {
        return OrderClassName;
    }

    get OrderIdName() {
        return OrderIdName;
    }

    constructor(private _store: Store, private _fb: FormBuilder, private _analyticsService: GgAnalyticsService) {
        this._store.dispatch(orderActions.loadAddressFromStorage());
    }

    ngOnInit() {
        let tempSubscription = this._store
            .select((state) => selectorTrackingOrder(state as { [orderFeatureKey]: IOrderState }))
            .pipe(
                tap((order) => {
                    if (!order) {
                        return;
                    }
                    this.orderId = order.orderId;
                    this.trackingOrder = order;
                })
            )
            .subscribe();
        tempSubscription.unsubscribe();

        this.customerOrderInfo$ = this._store.select((state) =>
            selectorCustomerOrderInfo(state as { [orderFeatureKey]: IOrderState })
        );
        this.inputtedPhoneNumber$ =
            this.customerInfoForm.controls.phoneNumberInput.valueChanges.pipe(
                debounceTime(500),
                map((phoneNumber) => {
                    if (this.customerInfoForm.controls.phoneNumberInput.valid) {
                        return phoneNumber as string;
                    }
                    return '';
                })
            );

        this.isAddressDefined$ = this._store.select((state) =>
            selectorIsAddressDefined(state as { [orderFeatureKey]: IOrderState })
        );

        this.savedAddress$ = this._store
            .select((state) =>
                selectorCustomerOrderInfo(state as { [orderFeatureKey]: IOrderState })
            )
            .pipe(map((customerOrderInfo) => customerOrderInfo?.address.fullAddressName || ''));

        //startWith is used to make sure the inputtedAddress$ observable emits a initial value when the component is initialized 
        //=> so combineLatest can emit the first value
        this.inputtedAddress$ = combineLatest(
            this.savedAddress$.pipe(startWith('')),
            this.customerInfoForm.controls.addressInput.valueChanges.pipe(
                startWith(''),
                debounceTime(500),
                tap((_) => (this.usingSavedLocation = false)),
                map((address) => address as string)
            )
        ).pipe(
            map(([addressFromStore, addressFromInput]) => {
                console.log(addressFromStore, addressFromInput);

                if (
                    addressFromInput &&
                    addressFromInput !== '' &&
                    this.usingSavedLocation === false
                ) {
                    return addressFromInput;
                }
                return addressFromStore;
            })
        );
    }

    useSavedLocation() {
        this.usingSavedLocation = true;
        this._store.dispatch(orderActions.loadAddressFromStorage());
    }

    clearAll() {
        this.customerInfoForm.setValue({
            phoneNumberInput: '',
            addressInput: ''
        });
    }

    confirmCustomerInfo() {
        if (!this.customerInfoForm.valid) {
            return;
        }
        console.log('confirmCustomerInfo form is valid ', this.customerInfoForm.valid);
        
        this.customerOrderInfo$
            .subscribe((customerOrderInfo) => {
                if (!customerOrderInfo) {
                    alert('Please input address first.');
                    return;
                }
                this.customerOrderInfoConfirmRequest = {
                    orderId: this.orderId,
                    phoneNumber: this.customerInfoForm.controls.phoneNumberInput.value!,
                    address: customerOrderInfo?.address!,
                    geometry: customerOrderInfo?.geometry!
                };
            })
            .unsubscribe();
        this._analyticsService.addShippingInfo(this.trackingOrder!);
        this._store.dispatch(
            orderActions.customerOrderInfoConfirmed({
                customerOrderInfoConfirmedRequest: this.customerOrderInfoConfirmRequest
            })
        );
    }
}
