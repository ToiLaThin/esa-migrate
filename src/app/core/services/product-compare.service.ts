import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProductCompareService {
    productCompareIdListKey: string = "productCompareIdList";    

    updateProductCompareListInStorage(newProductCompareIdList: string[]) {   
        localStorage.setItem(this.productCompareIdListKey, JSON.stringify(newProductCompareIdList))
    }

    loadProductCompareListFromStorage(): string[] {
        let productCompareIdList: string[] = localStorage.getItem(this.productCompareIdListKey) ? JSON.parse(localStorage.getItem(this.productCompareIdListKey)!) : [];
        return productCompareIdList;
    }
}