import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import type { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  const queryParamLowerCase = queryParam.toLowerCase();
  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegions[queryParamLowerCase] ?? 'Americas';
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
})
export default class ByRegionPage {
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

  selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.queryParam));

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      if (!params.region) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: params.region,
        },
      });
      return this.countryService.searchByRegion(params.region);
    },
  });
}
