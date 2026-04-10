import { Injectable, signal, computed } from '@angular/core';
import { Expense, ExpenseCategory } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  // Signal holding all expenses
  expenses = signal<Expense[]>([]);

  // Signal holding categories
  categories = signal<ExpenseCategory[]>([
    'Work',
    'Personal',
    'Grocery',
    'Utilities',
    'Shopping',
    'Travel',
    'Food'
  ]);

  // Computed signals
  totalExpense = computed(() =>
    this.expenses().reduce((sum, e) => sum + e.amount, 0)
  );

  highestExpense = computed(() =>
    this.expenses().length === 0
      ? 0
      : Math.max(...this.expenses().map(e => e.amount))
  );

  averageExpense = computed(() =>
    this.expenses().length === 0
      ? 0
      : this.totalExpense() / this.expenses().length
  );

  transactionCount = computed(() =>
    this.expenses().length
  );

  // Methods
  addExpense(expense: Expense) {
    this.expenses.update(list => [...list, expense]);
  }

  deleteExpense(id: string) {
    this.expenses.update(list => list.filter(e => e.id !== id));
  }

  getExpenseById(id: string) {
  return this.expenses().find(e => e.id === id);
}

updateExpense(updated: Expense) {
  const list = this.expenses().map(e =>
    e.id === updated.id ? updated : e
  );
  this.expenses.set(list);
}


}
