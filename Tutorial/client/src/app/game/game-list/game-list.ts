import { Component, inject, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Category } from '../../category/model/category.class';
import { Game } from '../model/game.class';
import { GameService } from '../game-service';
import { CategoryService } from '../../category/category-service';
import { MatDialog } from '@angular/material/dialog';
import { GameEdit } from '../game-edit/game-edit';
import { MatSelect } from '@angular/material/select';
import { GameItem } from './game-item/game-item';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-game-list',
  imports: [
    MatButton,
    FormsModule,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    GameItem,
    MatLabel,
  ],
  templateUrl: './game-list.html',
  styleUrl: './game-list.scss',
})
export default class GameList implements OnInit {
  categories: Category[];
  games: Game[];
  filterCategory: Category;
  filterTitle: string;

  private gameService = inject(GameService);
  private categoryService = inject(CategoryService);
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.gameService.getGames().subscribe((games) => (this.games = games));
    this.categoryService.getCategories().subscribe((categories) => (this.categories = categories));
  }

  onCleanFilter(): void {
    this.filterTitle = null;
    this.filterCategory = null;
    this.onSearch();
  }
  onSearch(): void {
    const title = this.filterTitle;
    const categoryId = this.filterCategory != null ? this.filterCategory.id : null;

    this.gameService.getGames(title, categoryId).subscribe((games) => (this.games = games));
  }

  createGame() {
    const dialogRef = this.dialog.open(GameEdit, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  editGame(game: Game) {
    const dialogRef = this.dialog.open(GameEdit, {
      data: { game: game },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.onSearch();
    });
  }
}
