import { Injectable, signal, computed } from '@angular/core';
import { Expense, ExpenseCategory } from '../models/expense';
import { Firestore, collection, addDoc, deleteDoc, doc, updateDoc, query, where, onSnapshot } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  expenses = signal<Expense[]>([]);

  categories = signal<ExpenseCategory[]>([
    'Work',
    'Personal',
    'Grocery',
    'Utilities',
    'Shopping',
    'Travel',
    'Food'
  ]);

  categoryColors: Record<string, string> = {
    'Work': '#4A90D9',
    'Personal': '#7B68EE',
    'Grocery': '#50C878',
    'Utilities': '#FFD700',
    'Shopping': '#FF69B4',
    'Travel': '#FF8C00',
    'Food': '#FF6347'
  };

  categoryIcons: Record<string, string> = {
    'Work': '💼',
    'Personal': '👤',
    'Grocery': '🛒',
    'Utilities': '💡',
    'Shopping': '🛍️',
    'Travel': '✈️',
    'Food': '🍔'
  };

  getColor(category: string): string {
    return this.categoryColors[category] || '#6c757d';
  }

  getIcon(category: string): string {
    return this.categoryIcons[category] || '📁';
  }

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

  constructor(
    private firestore: Firestore,
    private auth: AuthService
  ) {
    this.auth.currentUser$.subscribe(user => {
      if (user) {
        this.loadUserExpenses(user.uid);
      } else {
        this.expenses.set([]);
      }
    });
  }

  private loadUserExpenses(uid: string) {
    const ref = collection(this.firestore, 'expenses');
    const q = query(ref, where('uid', '==', uid));
    onSnapshot(q, snapshot => {
      const list: Expense[] = snapshot.docs.map(doc => {
        const data = doc.data() as Omit<Expense, 'id'>;
        return { id: doc.id, ...data };
      });
      this.expenses.set(list);
    });
  }

  async addExpense(expense: Expense) {
    const user = await firstValueFrom(this.auth.currentUser$);
    if (!user) return;
    const ref = collection(this.firestore, 'expenses');
    const payload = {
      title: expense.title,
      amount: Number(expense.amount),
      category: expense.category,
      notes: expense.notes || '',
      type: expense.type,
      date: new Date(expense.date),
      uid: user.uid
    };
    return addDoc(ref, payload);
  }

  deleteExpense(id: string) {
    const ref = doc(this.firestore, 'expenses', id);
    return deleteDoc(ref);
  }

  updateExpense(id: string, data: Partial<Expense>) {
    const docRef = doc(this.firestore, `expenses/${id}`);
    return updateDoc(docRef, data);
  }

  getExpenseById(id: string) {
    return this.expenses().find(e => e.id === id);
  }
}