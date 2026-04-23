import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, deleteDoc, doc, query, onSnapshot } from '@angular/fire/firestore';
import { Budget } from '../models/budget';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private firestore: Firestore) {}

  getBudgets(userId: string): Observable<Budget[]> {
    return new Observable(observer => {
      const ref = collection(this.firestore, `users/${userId}/budgets`);
      const q = query(ref);
      const unsubscribe = onSnapshot(q, snapshot => {
        const budgets: Budget[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Budget, 'id'>
        }));
        observer.next(budgets);
      });
      return () => unsubscribe();
    });
  }

  setBudget(userId: string, budget: Budget) {
    const ref = collection(this.firestore, `users/${userId}/budgets`);
    return addDoc(ref, budget);
  }

  deleteBudget(userId: string, budgetId: string) {
    const ref = doc(this.firestore, `users/${userId}/budgets/${budgetId}`);
    return deleteDoc(ref);
  }
}