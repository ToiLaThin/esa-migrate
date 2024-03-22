import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ICartItem } from "../../../core/models/cart-item.interface";

export const cartActions = createActionGroup({
    source: 'Cart Events In Shopping Module',
    events: {
        'Load Cart Items From Storage': emptyProps(),
        'Load Cart Items From Storage Done': props<{loadedCartItems: ICartItem[]}>(),
        'Cart Item Upsert': props<{ upsertCartItem: ICartItem }>(),
        'Remove Cart Item': props<{ idxItemInCart: number }>(),
        'Change Cart Item Quantity': props<{ idxItemInCart: number, newQuantity: number }>(),
        'Cart Clear': emptyProps(),
        'Cart Item Upsert Remove Change Quantity Clear Successful': emptyProps(),
    }
})