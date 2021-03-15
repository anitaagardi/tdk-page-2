import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEnglish from '@angular/common/locales/en';
import localeHungarian from '@angular/common/locales/hu';

@Injectable()
export class LocaleService {

    private _locale: string;

    set locale(value: string) {
        this._locale = value;
    }
    get locale(): string {
        return this._locale;
    }

    registerCulture(culture: string) {
        if (!culture) {
            return;
        }
        this.locale = culture;

        switch (culture) {
            case 'en': {
                registerLocaleData(localeEnglish);
                break;
            }
            case 'hu': {
                registerLocaleData(localeHungarian);
                break;
            }
        }
    }
}