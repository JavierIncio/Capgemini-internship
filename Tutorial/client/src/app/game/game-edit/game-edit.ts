import { Component, OnInit, inject } from '@angular/core';
import { MatError, MatLabel, MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { Game } from '../model/game.class';
import { Author } from '../../author/model/author.class';
import { Category } from '../../category/model/category.class';
import { GameService } from '../game-service';
import { AuthorService } from '../../author/author-service';
import { CategoryService } from '../../category/category-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-game-edit',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatSelect,
    MatOption,
    MatLabel,
    MatError,
  ],
  templateUrl: './game-edit.html',
  styleUrl: './game-edit.scss',
})
export class GameEdit implements OnInit {
  game: Game;
  authors: Author[];
  categories: Category[];

  private gameService = inject(GameService);
  private categoryService = inject(CategoryService);
  private authorService = inject(AuthorService);
  public dialogRef = inject(MatDialogRef<GameEdit>);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.game = this.data.game ? Object.assign({}, this.data.game) : new Game();

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;

      if (this.game.category != null) {
        const categoryFilter: Category[] = categories.filter(
          (category) => category.id == this.data.game.category.id,
        );
        if (categoryFilter != null) {
          this.game.category = categoryFilter[0];
        }
      }
    });

    this.authorService.getAllAuthors().subscribe((authors) => {
      this.authors = authors;

      if (this.game.author != null) {
        const authorFilter: Author[] = authors.filter(
          (author) => author.id == this.data.game.author.id,
        );
        if (authorFilter != null) {
          this.game.author = authorFilter[0];
        }
      }
    });
  }

  onSave() {
    this.gameService.saveGame(this.game).subscribe((result) => {
      this.dialogRef.close();
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
