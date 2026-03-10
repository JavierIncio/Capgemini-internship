import { Pageable } from '../../core/model/page/pageable.class';
import { Loan } from './loan.class';

export class LoanPage {
  content: Loan[];
  pageable: Pageable;
  totalElements: number;
}
