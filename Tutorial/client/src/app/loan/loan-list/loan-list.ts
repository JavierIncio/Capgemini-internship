import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Loan } from '../model/loan.class';
import { MatDialog } from '@angular/material/dialog';
import { LoanService } from '../loan-service';
import { LoanEdit } from '../loan-edit/loan-edit';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { Client } from '../../client/model/client.class';
import { Game } from '../../game/model/game.class';
import { GameService } from '../../game/game-service';
import { ClientService } from '../../client/client-service';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';

@Component({
  selector: 'app-loan-list',
  imports: [
    FormsModule,
    DatePipe,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginator,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInput,
  ],
  templateUrl: './loan-list.html',
  styleUrl: './loan-list.scss',
})
export default class LoanList implements OnInit {
  clients: Client[] = [];
  games: Game[] = [];
  loanDate: Date;
  filterClient: Client;
  filterGame: Game;
  filterDate: Date;

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;
  allLoans: Loan[] = [];

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'game', 'client', 'startDate', 'endDate', 'action'];
  startDate = new Date();

  private loanService = inject(LoanService);
  private gameService = inject(GameService);
  private clientService = inject(ClientService);
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.fetchLoans();
    this.clientService.getClients().subscribe((clients) => (this.clients = clients));
    this.gameService.getGames().subscribe((games) => (this.games = games));
  }

  loadPage(event?: PageEvent) {
    if (event != null) {
      this.pageSize = event.pageSize;
      this.pageNumber = event.pageIndex;
      this.updateCurrentPage();
      return;
    }

    this.fetchLoans();
  }

  onCleanFilter(): void {
    this.filterClient = null;
    this.filterGame = null;
    this.filterDate = null;
    this.onSearch();
  }

  onSearch(): void {
    this.pageNumber = 0;
    this.fetchLoans();
  }

  createLoan() {
    const dialogRef = this.dialog.open(LoanEdit, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  editLoan(loan: Loan) {
    const dialogRef = this.dialog.open(LoanEdit, {
      data: { loan: loan },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmation, {
      data: {
        title: 'Eliminar préstamo',
        description:
          'Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loanService.deleteLoan(loan.id).subscribe((result) => {
          this.ngOnInit();
        });
      }
    });
  }

  private fetchLoans(): void {
    const gameTitle = this.filterGame?.title?.trim() || null;
    const clientName = this.filterClient?.name?.trim() || null;
    const loanDate = this.filterDate ? this.toIsoDate(this.filterDate) : null;

    this.loanService.getLoans(gameTitle, clientName, loanDate).subscribe((loans) => {
      this.allLoans = loans;
      this.updateCurrentPage();
    });
  }

  private updateCurrentPage(): void {
    this.totalElements = this.allLoans.length;
    const start = this.pageNumber * this.pageSize;
    const end = start + this.pageSize;
    this.dataSource.data = this.allLoans.slice(start, end);
  }

  private toIsoDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
