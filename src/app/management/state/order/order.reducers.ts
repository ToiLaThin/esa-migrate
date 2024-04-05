import { createReducer, on } from '@ngrx/store';
import { IOrderManagementState } from './orderManagementState,interface';
import { orderManagementActions } from './order.actions';
import { IItemStock } from '../../../core/models/order-approve.model';

export const orderManagementFeatureKey = 'orderManagementFeature';
export const initialOrderManagementState: IOrderManagementState = {
    itemStockLookUp: new Map<string, number>(),
    ordersToApprove: [],
    ordersApprovedTypeIOrderItem: [],
    ordersApproved: []
};

export const orderManagementReducer = createReducer(
    initialOrderManagementState,
    on(orderManagementActions.ordersToApproveLoaded, (state, action) => {
        if (action.loadedOrderItemsAndStock) {
            return {
                ...state,
                itemStockLookUp: new Map<string, number>(
                    Object.entries(action.loadedOrderItemsAndStock.itemsStock)
                ),
                ordersApprovedTypeIOrderItem: [],
                ordersToApprove: action.loadedOrderItemsAndStock.orderItems,
                ordersApproved: []
            };
        }
        return {
            ...state,
            initialOrderManagementState
        };
    }),

    on(orderManagementActions.approveOrder, (state, action) => {
        let orderToApprove = state.ordersToApprove.find((o) => o.orderId === action.orderId);
        if (!orderToApprove) {
            return state;
        }
        let orderItemsQty: IItemStock[] = orderToApprove.orderItemsQty;
        let itemsStockLookUpTemp = new Map(state.itemStockLookUp);
        let allItemsIsValid: boolean | undefined = undefined;
        orderItemsQty.forEach((itemInOrder) => {
            let stockCurrentQty = itemsStockLookUpTemp.get(itemInOrder.productModelId);
            if (!stockCurrentQty || stockCurrentQty < itemInOrder.quantity) {
                allItemsIsValid = false;
            }
            allItemsIsValid = true;
            itemsStockLookUpTemp.set(itemInOrder.productModelId, stockCurrentQty! - itemInOrder.quantity);
        });

        if (allItemsIsValid! === false) {
            return state;
        }
        return {
            ...state,
            itemStockLookUp: itemsStockLookUpTemp,
            ordersToApprove: state.ordersToApprove.filter((o) => o.orderId !== action.orderId),
            //so we can display this on UI
            ordersApprovedTypeIOrderItem: [
                ...state.ordersApprovedTypeIOrderItem,
                orderToApprove
            ],
            ordersApproved: [
                ...state.ordersApproved,
                {
                    orderId: action.orderId,
                    orderItemsStockToChange: orderItemsQty.map((i) => {
                        return {
                            productModelId: i.productModelId,
                            quantityToDecrease: i.quantity
                        };
                    })
                }
            ]
        };
    }),

    on(orderManagementActions.confirmApprovedOrdersSuccess, (state) => {
        return {
            ...state,
            ordersApprovedTypeIOrderItem: [],
            ordersApproved: []
        };
    }),

    on(orderManagementActions.removeApprovedOrder, (state, action) => {
        let orderToApprove = state.ordersApprovedTypeIOrderItem.find((o) => o.orderId === action.orderId);
        if (!orderToApprove) {
            return state;
        }
        let orderItemsQty: IItemStock[] = orderToApprove.orderItemsQty;
        let itemsStockLookUpTemp = new Map(state.itemStockLookUp);
        orderItemsQty.forEach((itemInOrder) => {
            let stockCurrentQty = itemsStockLookUpTemp.get(itemInOrder.productModelId);
            itemsStockLookUpTemp.set(itemInOrder.productModelId, stockCurrentQty! + itemInOrder.quantity);
        });

        return {
            ...state,
            itemStockLookUp: itemsStockLookUpTemp,
            ordersToApprove: [...state.ordersToApprove, orderToApprove],
            ordersApprovedTypeIOrderItem: state.ordersApprovedTypeIOrderItem.filter(
                (o) => o.orderId !== action.orderId
            ),
            ordersApproved: state.ordersApproved.filter((o) => o.orderId !== action.orderId)
        };
    }),
);
