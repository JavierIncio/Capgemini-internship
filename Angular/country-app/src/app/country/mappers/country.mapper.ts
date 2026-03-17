import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {
  static mapRESTCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'Sin traducción al español',
      region: restCountry.region,
      subregion: restCountry.subregion,
      capital: restCountry.capital?.join(','),
      population: restCountry.population,
    };
  }

  static mapRESTCountriesToCountryArray(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(this.mapRESTCountryToCountry);
  }
}
