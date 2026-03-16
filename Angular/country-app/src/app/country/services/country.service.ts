import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  onSearch(value: string) {
    console.log(value);
  }
}
