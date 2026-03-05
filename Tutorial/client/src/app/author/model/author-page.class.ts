import { Pageable } from '../../core/model/page/pageable.class';
import { Author } from './author.class';

export class AuthorPage {
  content: Author[];
  pageable: Pageable;
  totalElements: number;
}
