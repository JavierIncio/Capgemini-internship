import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${lowerCaseQuery}`).pipe(
      map((resp) => CountryMapper.mapRESTCountriesToCountryArray(resp)),
      catchError((err) =>
        throwError(() => new Error(`No se pudieron obtener países con esa query: '${query}'`)),
      ),
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${lowerCaseQuery}`).pipe(
      map((resp) => CountryMapper.mapRESTCountriesToCountryArray(resp)),
      delay(3000),
      catchError((err) =>
        throwError(() => new Error(`No se pudieron obtener países con esa query: '${query}'`)),
      ),
    );
  }

  searchCountryByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRESTCountriesToCountryArray(resp)),
      map((countries) => countries.at(0)),
      catchError((err) =>
        throwError(() => new Error(`No se pudieron obtener países con el código: '${code}'`)),
      ),
    );
  }
}
