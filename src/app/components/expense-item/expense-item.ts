import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Expense } from '../../models/expense';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './expense-item.html',
  styleUrls: ['./expense-item.css']
})
export class ExpenseItemComponent {

  @Input() expense!: Expense;

  constructor(private expenseService: ExpenseService) {}

  deleteExpense() {
    if (this.expense.id) {
      this.expenseService.deleteExpense(this.expense.id);
    }
  }
}
