import { Injectable } from '@angular/core';
import { Auth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, getFirestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth;
  private firestore: Firestore;

  constructor() {
    this.auth = getAuth();
    this.firestore = getFirestore();
  }

  async signUp(email: string, password: string, name: string, surname: string, dob: Date) {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    return setDoc(doc(collection(this.firestore, 'users'), cred.user?.uid), {
      name,
      surname,
      dob,
      email
    });
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut() {
    return signOut(this.auth);
  }

  // getCurrentUser() {
  //   return onAuthStateChanged(this.auth);
  // }
}
