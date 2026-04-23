import { Component, ChangeDetectorRef } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Expense, ExpenseCategory } from '../../models/expense';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-expense.html',
  styleUrls: ['./add-expense.css']
})
export class AddExpenseComponent {
  amount = 0;
  category = '';
  date = '';
  title = '';
  notes = '';
  type: 'income' | 'expense' = 'expense';
  userId: string | null = null;
  userCategories: Category[] = [];
  newCategoryName: string = '';
  isAddingCategory: boolean = false;
  predefinedCategories: string[] = [];
;

  constructor(
    public expenseService: ExpenseService,
    public categoryService: CategoryService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.predefinedCategories = this.expenseService.categories();
    this.loadUserCategories();
  }

  loadUserCategories() {
    this.authService.currentUser$.subscribe(user => {
      if (!user) return;
      this.userId = user.uid;
      this.categoryService.getCategories(user.uid).subscribe(categories => {
        this.userCategories = [...categories];
        this.cdr.detectChanges();
      });
    });
  }

  addNewCategory() {
    if (!this.userId || !this.newCategoryName.trim()) return;

    const category: Category = {
      name: this.newCategoryName.trim(),
      icon: '',
      color: ''
    };

    this.categoryService.addCategory(this.userId, category).then(() => {
      this.userCategories = [...this.userCategories, category];
      this.newCategoryName = '';
      this.isAddingCategory = false;
      this.cdr.detectChanges();
    });
  }

  deleteCategory(categoryId: string) {
  if (!this.userId) return;
  this.categoryService.deleteCategory(this.userId, categoryId).then(() => {
    this.userCategories = this.userCategories.filter(c => c.id !== categoryId);
    this.cdr.detectChanges();
  });
}

  addExpense() {
    if (this.amount <= 0 || !this.category || !this.date || !this.title) return;
    const newExpense: Expense = {
      title: this.title,
      amount: this.amount,
      date: this.date,
      category: this.category as ExpenseCategory,
      notes: this.notes,
      type: this.type
    };
    this.expenseService.addExpense(newExpense);

    this.amount = 0;
    this.category = '';
    this.date = '';
    this.title = '';
    this.notes = '';
    this.type = 'expense';
  }
}