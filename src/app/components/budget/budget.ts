import { Component, ChangeDetectorRef } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { ExpenseService } from '../../services/expense.service';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { Budget } from '../../models/budget';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budget.html',
  styleUrls: ['./budget.css']
})
export class BudgetComponent {

  userId: string | null = null;
  budgets: Budget[] = [];
  newCategory: string = '';
  newAmount: number = 0;
  predefinedCategories: string[] = [];
  userCategories: Category[] = [];

  constructor(
    private budgetService: BudgetService,
    public expenseService: ExpenseService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {
    this.predefinedCategories = this.expenseService.categories();
    this.authService.currentUser$.subscribe(user => {
      if (!user) return;
      this.userId = user.uid;
      this.budgetService.getBudgets(user.uid).subscribe(budgets => {
        this.budgets = budgets;
        this.cdr.detectChanges();
      });
      this.categoryService.getCategories(user.uid).subscribe(categories => {
        this.userCategories = [...categories];
        this.cdr.detectChanges();
      });
    });
  }

  addBudget() {
    if (!this.userId || !this.newCategory || this.newAmount <= 0) return;
    const budget: Budget = {
      category: this.newCategory,
      amount: this.newAmount
    };
    this.budgetService.setBudget(this.userId, budget).then(() => {
      this.newCategory = '';
      this.newAmount = 0;
    });
  }

  deleteBudget(budgetId: string) {
    if (!this.userId) return;
    this.budgetService.deleteBudget(this.userId, budgetId);
  }

  getSpent(category: string): number {
    return this.expenseService.expenses()
      .filter(e => e.category === category && e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0);
  }

  isOverBudget(budget: Budget): boolean {
    return this.getSpent(budget.category) >= budget.amount;
  }

  isNearBudget(budget: Budget): boolean {
    return this.getSpent(budget.category) >= budget.amount * 0.8 && !this.isOverBudget(budget);
  }
}