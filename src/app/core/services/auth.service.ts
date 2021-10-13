import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';
import {
  Auth,
  authState,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';
import {
  Firestore,
  DocumentReference,
  doc,
  setDoc,
  docData,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any> = EMPTY;

  constructor(private auth: Auth, private firestore: Firestore) {
    this.user$ = authState(this.auth).pipe(
      switchMap((user) => {
        if (user) {
          return docData(doc(this.firestore, `users/${user.uid}`));
        } else return of(null);
      })
    );
  }

  private setUser(user: User) {
    const userRef: DocumentReference = doc(this.firestore, `users/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: {
        admin: true,
        subscriber: true,
      },
    };
    setDoc(userRef, userData, { merge: true });
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(this.auth, provider);
    this.setUser(userCredential.user);
  }

  logout() {
    this.auth.signOut();
  }
}
