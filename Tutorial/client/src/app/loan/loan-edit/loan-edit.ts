import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Client } from '../../client/model/client.class';
import { Game } from '../../game/model/game.class';
import { Loan } from '../model/loan.class';
import { ClientService } from '../../client/client-service';
import { GameService } from '../../game/game-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoanService } from '../loan-service';

@Component({
  selector: 'app-loan-edit',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatSelect,
    MatOption,
    MatLabel,
    MatError,
  ],
  templateUrl: './loan-edit.html',
  styleUrl: './loan-edit.scss',
})
export class LoanEdit implements OnInit {
  loan: Loan;
  clients: Client[] = [];
  games: Game[] = [];
  startDateInput: string = '';
  endDateInput: string = '';

  private loanService = inject(LoanService);
  private gameService = inject(GameService);
  private clientService = inject(ClientService);
  public dialogRef = inject(MatDialogRef<LoanEdit>);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.loan = this.data.loan ? Object.assign({}, this.data.loan) : new Loan();
    this.startDateInput = this.toInputDate(this.loan.startDate);
    this.endDateInput = this.toInputDate(this.loan.endDate);

    this.clientService.getClients().subscribe((clients) => (this.clients = clients));
    this.gameService.getGames().subscribe((games) => (this.games = games));
  }

  onSave() {
    this.loan.startDate = this.toDate(this.startDateInput);
    this.loan.endDate = this.toDate(this.endDateInput);

    if (!this.loan.clientId || !this.loan.gameId || !this.loan.startDate || !this.loan.endDate) {
      alert('Debe completar cliente, juego y fechas.');
      return;
    }

    if (this.loan.endDate < this.loan.startDate) {
      alert('La fecha de fin no puede ser anterior a la fecha de inicio.');
      return;
    }

    if (this.getRangeDays(this.loan.startDate, this.loan.endDate) > 14) {
      alert('El periodo de préstamo máximo es de 14 días.');
      return;
    }

    this.loanService.getAllLoans().subscribe((loans) => {
      const otherLoans = loans.filter((loan) => loan.id !== this.loan.id);

      const gameOverlapWithOtherClient = otherLoans.some(
        (loan) =>
          loan.gameId === this.loan.gameId &&
          loan.clientId !== this.loan.clientId &&
          this.rangesOverlap(loan.startDate, loan.endDate, this.loan.startDate, this.loan.endDate),
      );

      if (gameOverlapWithOtherClient) {
        alert('El juego no puede estar prestado a dos clientes distintos en un mismo día.');
        return;
      }

      const clientLoans = otherLoans.filter((loan) => loan.clientId === this.loan.clientId);
      const exceedsClientLimit = this.exceedsMaxLoansPerDay(
        clientLoans,
        this.loan.startDate,
        this.loan.endDate,
        2,
      );

      if (exceedsClientLimit) {
        alert('Un cliente no puede tener más de 2 juegos prestados en un mismo día.');
        return;
      }

      this.loanService.saveLoan(this.loan).subscribe(() => {
        this.dialogRef.close();
      });
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  private toInputDate(date: Date): string {
    if (!date) {
      return '';
    }

    const normalizedDate = new Date(date);
    const year = normalizedDate.getFullYear();
    const month = String(normalizedDate.getMonth() + 1).padStart(2, '0');
    const day = String(normalizedDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private toDate(dateString: string): Date {
    return dateString ? new Date(`${dateString}T00:00:00`) : null;
  }

  private getRangeDays(startDate: Date, endDate: Date): number {
    const start = this.normalizeDate(startDate).getTime();
    const end = this.normalizeDate(endDate).getTime();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    return Math.floor((end - start) / millisecondsPerDay) + 1;
  }

  private rangesOverlap(
    existingStartDate: Date,
    existingEndDate: Date,
    newStartDate: Date,
    newEndDate: Date,
  ): boolean {
    const existingStart = this.normalizeDate(existingStartDate).getTime();
    const existingEnd = this.normalizeDate(existingEndDate).getTime();
    const newStart = this.normalizeDate(newStartDate).getTime();
    const newEnd = this.normalizeDate(newEndDate).getTime();

    return existingStart <= newEnd && newStart <= existingEnd;
  }

  private exceedsMaxLoansPerDay(
    loans: Loan[],
    startDate: Date,
    endDate: Date,
    maxLoansPerDay: number,
  ): boolean {
    let current = this.normalizeDate(startDate);
    const end = this.normalizeDate(endDate);

    while (current <= end) {
      const activeLoansCount = loans.filter((loan) => {
        const loanStart = this.normalizeDate(loan.startDate);
        const loanEnd = this.normalizeDate(loan.endDate);
        return loanStart <= current && current <= loanEnd;
      }).length;

      if (activeLoansCount >= maxLoansPerDay) {
        return true;
      }

      current = this.addDays(current, 1);
    }

    return false;
  }

  private normalizeDate(date: Date): Date {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
