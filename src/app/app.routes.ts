import { Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard';
import { AddExpenseComponent } from './components/add-expense/add-expense';
import { ExpenseListComponent } from './components/expense-list/expense-list';
import { EditExpenseComponent } from './components/edit-expense/edit-expense';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { ProfileComponent } from './components/profile/profile';
import { BudgetComponent } from './components/budget/budget';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  // Protected routes
  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'add', component: AddExpenseComponent, canActivate: [authGuard] },
  { path: 'list', component: ExpenseListComponent, canActivate: [authGuard] },
  { path: 'edit/:id', component: EditExpenseComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'budget', component: BudgetComponent, canActivate: [authGuard] },

  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Fallback
  { path: '**', redirectTo: '' }
];