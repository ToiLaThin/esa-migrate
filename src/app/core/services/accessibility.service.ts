import { Injectable } from "@angular/core";
import { Currency } from "../types/currency.enum";
import { ThemeType } from "../ui-models/theme-type";

@Injectable({
    providedIn: 'root'
})
export class AccessibilityService {
    currencyKey = 'currency';
    languageKey = 'language';
    themeKey = 'theme';

    constructor() {}

    loadThemeFromStorage(): ThemeType {
        return (JSON.parse(localStorage.getItem(this.themeKey)!)  || ThemeType.LIGHT) as ThemeType;
    }

    updateThemeInStorage(theme: ThemeType) {
        localStorage.setItem(this.themeKey, JSON.stringify(theme));
    }

    loadCurrencyFromStorage(): Currency {
        return (JSON.parse(localStorage.getItem(this.currencyKey)!) || Currency.VND) as Currency;
    }

    updateCurrencyInStorage(currency: Currency) {
        localStorage.setItem(this.currencyKey, JSON.stringify(currency));
    }

    loadLanguageFromStorage(): 'en' | 'vi' {
        return (JSON.parse(localStorage.getItem(this.languageKey)!) || 'en') as 'en' | 'vi';
    }

    updateLanguageInStorage(language: 'en' | 'vi') {
        localStorage.setItem(this.languageKey, JSON.stringify(language));
    }
}