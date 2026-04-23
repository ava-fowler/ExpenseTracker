import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, deleteDoc, doc, query, onSnapshot } from '@angular/fire/firestore';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: Firestore) {}

  getCategories(userId: string): Observable<Category[]> {
    return new Observable(observer => {
      const ref = collection(this.firestore, `users/${userId}/categories`);
      const q = query(ref);
      const unsubscribe = onSnapshot(q, snapshot => {
        const categories: Category[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Category, 'id'>
        }));
        observer.next(categories);
      });
      return () => unsubscribe();
    });
  }

  addCategory(userId: string, category: Category) {
    const ref = collection(this.firestore, `users/${userId}/categories`);
    return addDoc(ref, category);
  }

  deleteCategory(userId: string, categoryId: string) {
    const ref = doc(this.firestore, `users/${userId}/categories/${categoryId}`);
    return deleteDoc(ref);
  }
}