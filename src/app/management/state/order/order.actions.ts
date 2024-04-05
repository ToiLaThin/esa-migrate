import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { IOrderApprovedAggregate, IOrderItemsAndStockAggregate } from "../../../core/models/order-approve.model";

export const orderManagementActions = createActionGroup({
    source: 'Order Actions In Management Module',
    events: {
        'Reload Orders To Approve': emptyProps(),
        'Orders To Approve Loaded': props<{loadedOrderItemsAndStock: IOrderItemsAndStockAggregate}>(),
        'Orders To Approve Load Failed': props<{error: any}>(),

        'Approve Order': props<{orderId: string}>(),
        'Clear All Approved Orders': emptyProps(),

        //passing approvedOrders help we do not have to subscribe to store selector to get approved orders
        //in the reducer, that will make the reducer more complex
        'Confirm Approved Orders': props<{approvedOrders: IOrderApprovedAggregate[]}>(),
        'Confirm Approved Orders Success': emptyProps(),
        'Confirm Approved Orders Failed': props<{error: any}>(),

        'Remove Approved Order': props<{orderId: string}>(),
    }
})