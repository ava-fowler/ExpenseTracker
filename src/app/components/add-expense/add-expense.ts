import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-expense.html',
  styleUrls: ['./add-expense.css']
})
export class AddExpenseComponent {

  title = '';
  amount: number | null = null;
  category = '';

  constructor(public expenseService: ExpenseService) {}

  addExpense() {
    if (!this.title || !this.amount || !this.category) return;

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      title: this.title,
      amount: this.amount,
      category: this.category as any
    };

    this.expenseService.addExpense(newExpense);

    // Clear form
    this.title = '';
    this.amount = null;
    this.category = '';
  }
}
