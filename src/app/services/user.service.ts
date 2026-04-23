import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, onSnapshot } from '@angular/fire/firestore';
import { UserProfile } from '../models/user-profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) {}

  getUserProfile(uid: string): Observable<UserProfile | undefined> {
    return new Observable(observer => {
      const ref = doc(this.firestore, `users/${uid}`);
      const unsubscribe = onSnapshot(ref, snapshot => {
        if (snapshot.exists()) {
          observer.next(snapshot.data() as UserProfile);
        } else {
          observer.next(undefined);
        }
      });
      return () => unsubscribe();
    });
  }

  saveUserProfile(uid: string, profile: UserProfile) {
    const ref = doc(this.firestore, `users/${uid}`);
    return setDoc(ref, profile, { merge: true });
  }
}