import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ICartItem } from "../../../core/models/cart-item.interface";

export const cartActions = createActionGroup({
    source: 'Cart Events In Shopping Module',
    events: {
        'Load Cart Items From Storage': emptyProps(),
        'Load Cart Items From Storage Done': props<{loadedCartItems: ICartItem[]}>(),
        'Cart Item Upsert': props<{ upsertCartItem: ICartItem }>(),
        'Cart Item Upsert Successful': emptyProps(),
        'Cart Clear': emptyProps(),
        'Cart Clear Done': emptyProps()
    }
})