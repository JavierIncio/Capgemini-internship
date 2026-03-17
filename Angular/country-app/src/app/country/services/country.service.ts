import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import type { Country } from '../interfaces/country.interface';
import type { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${lowerCaseQuery}`).pipe(
      map((resp) => CountryMapper.mapRESTCountriesToCountryArray(resp)),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
      catchError((err) =>
        throwError(() => new Error(`No se pudieron obtener países con esa query: '${query}'`)),
      ),
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${lowerCaseQuery}`).pipe(
      map((resp) => CountryMapper.mapRESTCountriesToCountryArray(resp)),
      delay(2000),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
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

  searchByRegion(region: Region) {
    if (this.queryCacheRegion.has(region)) return of(this.queryCacheRegion.get(region) ?? []);

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      map((resp) => CountryMapper.mapRESTCountriesToCountryArray(resp)),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      catchError((err) =>
        throwError(() => new Error(`No se pudieron obtener países para la región: '${region}'`)),
      ),
    );
  }
}
