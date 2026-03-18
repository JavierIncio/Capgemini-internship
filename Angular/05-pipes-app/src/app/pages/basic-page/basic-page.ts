import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { AvailableLocale, LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.html',
})
export default class BasicPage {
  localeService = inject(LocaleService);
  currentLocale = signal(inject(LOCALE_ID)); // || this.localeService.getLocale

  nameLower = signal<string>('javier');
  nameUpper = signal<string>('JAVIER');
  fullName = signal<string>('jAVieR IncIO');

  customDate = signal<Date>(new Date());
  tickingDateEffect = effect((onCleanup) => {
    const interval = setInterval(() => this.customDate.set(new Date()), 1000);
    onCleanup(() => clearInterval(interval));
  });

  changeLocale(locale: AvailableLocale) {
    this.localeService.changeLocale(locale);
  }
}
