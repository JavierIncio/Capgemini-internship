import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export default class ByCapitalPage {
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = signal<string>(this.queryParam);

  //? Con RxResource
  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: params.query,
        },
      });
      return this.countryService.searchByCapital(params.query);
    },
  });

  //? Con promesas
  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     if (!params.query) return [];
  //     return await firstValueFrom(this.countryService.searchByCapital(params.query));
  //   },
  // });

  //? Manual

  // isLoading = signal<boolean>(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query).subscribe({
  //     next: (data) => {
  //       this.isLoading.set(false);
  //       this.countries.set(data);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err);
  //     },
  //   });
  // }
}
