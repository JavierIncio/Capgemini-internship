import { Component, inject } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { SearchInput } from '../../components/search-input/search-input';

@Component({
  selector: 'app-by-country-page',
  imports: [CountryList, SearchInput],
  templateUrl: './by-country-page.html',
})
export default class ByCountryPage {
  onSearch(value: string) {
    console.log(value);
  }
}
