import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { IOrderAggregateCart } from "../../../core/models/order.interface";

export const orderActions = createActionGroup({
    source: 'Order Events In Shopping Module',
    events: {
        'Begin Tracking Order': props<{ trackingOrder: IOrderAggregateCart }>(),
        'Continue Current Tracking Order Process': emptyProps(),

        'Load Tracking Order From Storage': emptyProps(),
        'Load Tracking Order From Storage Done': props<{ loadedTrackingOrder: IOrderAggregateCart | null }>(),
    }
})