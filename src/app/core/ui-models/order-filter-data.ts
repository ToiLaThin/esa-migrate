import { OrderStatus } from "../types/order-status.enum";

export class OrderFilterData {
    constructor(public title: string, public iconName: string, public description: string, public orderStatusToFilter: OrderStatus) {}
}

export enum OrdersSortBy {
    id = 0,
    subTotal = 1,
    dateCreatedDraft = 2,
}

export enum OrdersSortType {
    ascending = 0,
    descending = 1
}

export enum OrdersNumberPerPage {
    five = 5,
    ten = 10,
    fifteen = 15
}