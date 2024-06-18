import { createReducer, on } from '@ngrx/store';
import { IOrderManagementState } from './orderManagementState,interface';
import { orderManagementActions } from './order.actions';
import { IItemStock } from '../../../core/models/order-approve.model';

export const orderManagementFeatureKey = 'orderManagementFeature';
export const initialOrderManagementState: IOrderManagementState = {
    itemStockLookUp: [],
    ordersToApprove: [],
    isLoadingOrdersToApprove: false,
    ordersApprovedTypeIOrderItem: [],
    isConfirmingApprovedOrders: false,
    ordersApproved: [],
    orderDetail: null
};

export const orderManagementReducer = createReducer(
    initialOrderManagementState,
    on(orderManagementActions.reloadOrdersToApprove, (state) => {
        return {
            ...state,
            isLoadingOrdersToApprove: true
        };
    }),
    on(orderManagementActions.ordersToApproveLoaded, (state, action) => {
        if (action.loadedOrderItemsAndStockLookup) {
            return {
                ...state,
                itemStockLookUp: action.loadedOrderItemsAndStockLookup.stockLookupItems,
                ordersApprovedTypeIOrderItem: [],
                ordersToApprove: action.loadedOrderItemsAndStockLookup.orderItems,
                isLoadingOrdersToApprove: false,
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
        let itemsStockLookUpTemp = state.itemStockLookUp;
        let allItemsIsValid: boolean | undefined = undefined;
        orderItemsQty.forEach((itemInOrder) => {
            let stockCurrentQty = itemsStockLookUpTemp.find((i) => i.productModelId === itemInOrder.productModelId)?.currentQuantity;
            if (!stockCurrentQty || stockCurrentQty < itemInOrder.quantity) {
                allItemsIsValid = false;
            }
            allItemsIsValid = true;
            itemsStockLookUpTemp = itemsStockLookUpTemp.map((i) => {
                if (i.productModelId === itemInOrder.productModelId) {
                    return {
                        ...i,
                        currentQuantity: i.currentQuantity - itemInOrder.quantity
                    };
                }
                return i;
            });
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
    on(orderManagementActions.confirmApprovedOrders, (state) => {
        return {
            ...state,
            isConfirmingApprovedOrders: true
        };
    }),
    on(orderManagementActions.confirmApprovedOrdersSuccess, (state) => {
        return {
            ...state,
            ordersApprovedTypeIOrderItem: [],
            ordersApproved: [],
            isConfirmingApprovedOrders: false
        };
    }),

    on(orderManagementActions.removeApprovedOrder, (state, action) => {
        let orderToApprove = state.ordersApprovedTypeIOrderItem.find((o) => o.orderId === action.orderId);
        if (!orderToApprove) {
            return state;
        }
        let orderItemsQty: IItemStock[] = orderToApprove.orderItemsQty;
        let itemsStockLookUpTemp = state.itemStockLookUp;
        orderItemsQty.forEach((itemInOrder) => {
            let stockCurrentQty = itemsStockLookUpTemp.find((i) => i.productModelId === itemInOrder.productModelId)?.currentQuantity;
            itemsStockLookUpTemp = itemsStockLookUpTemp.map((i) => {
                if (i.productModelId === itemInOrder.productModelId) {
                    return {
                        ...i,
                        currentQuantity: stockCurrentQty! + itemInOrder.quantity
                    };
                }
                return i;
            });
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

    on(orderManagementActions.orderDetailLoaded, (state, action) => {
        return {
            ...state,
            orderDetail: action.orderDetail
        };
    }),

    on(orderManagementActions.closeOrderDetailDrawer, (state, action) => {
        return {
            ...state,
            orderDetail: null
        };
    })
);
