import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from './model/loan.class';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/loan';

  getLoans(gameTitle?: string, clientName?: string, loanDate?: string): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.composeFindUrl(gameTitle, clientName, loanDate));
  }

  saveLoan(loan: Loan): Observable<void> {
    const { id } = loan;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.http.put<void>(url, loan);
  }

  getAllLoans(): Observable<Loan[]> {
    return this.getLoans();
  }

  deleteLoan(idLoan: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idLoan}`);
  }

  private composeFindUrl(gameTitle?: string, clientName?: string, loanDate?: string): string {
    const params = new URLSearchParams();

    if (gameTitle) {
      params.set('gameTitle', gameTitle);
    }

    if (clientName) {
      params.set('clientName', clientName);
    }

    if (loanDate) {
      params.set('loanDate', loanDate);
    }

    const queryString = params.toString();
    return queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
  }
}
