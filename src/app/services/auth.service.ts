import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<any>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); // bch ytaba3 authentication state
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // Observable ll components lo5rin

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticatedSubject.next(true); // User is logged in
      } else {
        this.isAuthenticatedSubject.next(false); // User is logged out
      }
    });
  }

  // Sign Up Method
  async signUp(email: string, password: string) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.router.navigate(['/home']); // Redirect to home after successful sign up
    } catch (error:any) {
      console.error(error.message);
    }
  }

  // Sign In Method
  async signIn(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/home']); // Redirect to home after successful sign in
    } catch (error:any) {
      console.error(error.message);
    }
  }

  // Sign Out Method
  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/sign-in']); // Redirect to login after sign out
  }
  logout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.isAuthenticatedSubject.next(false); // Set authentication state to false on logout
    });
  }
  // Get current user
  getCurrentUser() {
    return this.afAuth.authState;
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
