export type ExpenseCategory =
  | 'Work'
  | 'Personal'
  | 'Grocery'
  | 'Utilities'
  | 'Shopping'
  | 'Travel'
  | 'Food';

export interface Expense {
  id?: string;
  title: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
  notes: string;               
  type: 'income' | 'expense';
  uid?: string;
}


