import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Author } from './model/author.class';
import { Pageable } from '../core/model/page/pageable.class';
import { AuthorPage } from './model/author-page.class';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/author';

  getAuthors(pageable: Pageable): Observable<AuthorPage> {
    return this.http.post<AuthorPage>(this.baseUrl, { pageable: pageable });
  }

  saveAuthor(author: Author): Observable<Author> {
    const { id } = author;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.http.put<Author>(url, author);
  }

  deleteAuthor(idAuthor: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idAuthor}`);
  }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl);
  }
}
