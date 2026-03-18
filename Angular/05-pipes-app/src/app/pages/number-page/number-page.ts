import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-number-page',
  imports: [DecimalPipe, CurrencyPipe, PercentPipe],
  templateUrl: './number-page.html',
})
export default class NumberPage {
  totalSales = signal<number>(2_456_234.5567);
  percent = signal<number>(0.4856);
}
