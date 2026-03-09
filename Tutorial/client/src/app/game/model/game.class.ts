import { Author } from '../../author/model/author.class';
import { Category } from '../../category/model/category.class';

export class Game {
  id: number;
  title: string;
  age: number;
  category: Category;
  author: Author;
}
