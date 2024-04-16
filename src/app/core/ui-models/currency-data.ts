import { ColorSvgNames } from "../../share-components/svg-definitions/color-svg-names.enum";
import { Currency } from "../types/currency.enum";

export class CurrencyUIModel {
    constructor(public currency: Currency, public title: string, public iconName: ColorSvgNames) {}
}

export const currencyDatas: CurrencyUIModel[] = [
    new CurrencyUIModel(Currency.VND, 'VNĐ', ColorSvgNames.FlagVn),
    new CurrencyUIModel(Currency.USD, 'USD', ColorSvgNames.FlagUs)
];