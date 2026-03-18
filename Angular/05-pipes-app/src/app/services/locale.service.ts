import { Injectable, signal } from '@angular/core';

export type AvailableLocale = 'es' | 'fr' | 'en';

function validateAvailableLocale(stringLocale: string): AvailableLocale {
  const validLocales: Record<string, AvailableLocale> = {
    es: 'es',
    en: 'en',
    fr: 'fr',
  };

  return validLocales[stringLocale.toLowerCase()];
}

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private currentLocale = signal<AvailableLocale>('fr');

  constructor() {
    this.currentLocale.set(validateAvailableLocale(localStorage.getItem('locale') ?? 'es'));
  }

  get getLocale() {
    return this.currentLocale();
  }

  changeLocale(locale: AvailableLocale) {
    localStorage.setItem('locale', locale);
    this.currentLocale.set(locale);
    window.location.reload();
  }
}
