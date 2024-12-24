import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavorisService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}
  addBookToFavorites(book: any) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const userId = user.uid; // njibou current user id
        const bookRef = this.firestore
          .collection('users')
          .doc(userId) // bch najmou naccediw ll  document t3 current user
          .collection('favorites') // naccediw ll favorites collection
          .doc(book.id); // The document ID will be the book ID

        // Save the book details to the favorites subcollection
        bookRef
          .set(book)
          .then(() => {
            console.log('Book added to favorites!');
          })
          .catch((error) => {
            console.error('Error adding book to favorites:', error);
          });
      }
    });
  }
  // Add or remove a book from the user's favorites
  toggleFavorite(book: any): Observable<void> {
    return new Observable<void>((observer) => {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          const userId = user.uid; // Get the current user's UID
          const userRef = this.firestore
            .collection('users')
            .doc(userId)
            .collection('favorites');
          const bookRef = userRef.doc(book.id);

          bookRef.get().subscribe((doc) => {
            if (doc.exists) {
              // If the book exists, remove it from favorites
              bookRef.delete().then(() => {
                observer.next(); // Emit success
                observer.complete(); // Complete the observable
              });
            } else {
              // If the book does not exist, add it to favorites
              bookRef.set(book).then(() => {
                observer.next(); // Emit success
                observer.complete(); // Complete the observable
              });
            }
          });
        }
      });
    });
  }

  // Check if the book is a favorite for the current user
  isFavorite(bookId: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          const userId = user.uid;
          const userRef = this.firestore
            .collection('users')
            .doc(userId)
            .collection('favorites')
            .doc(bookId);

          userRef.get().subscribe((doc) => {
            observer.next(doc.exists); // Emit whether the book is in favorites
            observer.complete(); // Complete the observable
          });
        } else {
          observer.next(false); // If not authenticated, return false
          observer.complete(); // Complete the observable
        }
      });
    });
  }
  loadFavoriteBooks(): Observable<any[]> {
    return new Observable((observer) => {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          const userId = user.uid; // Get the current user's UID
          this.firestore
            .collection('users')
            .doc(userId) // Access the current user document
            .collection('favorites') // Access the favorites subcollection
            .valueChanges() // Get the list of favorite books
            .subscribe((favorites) => {
              observer.next(favorites);
            });
        }
      });
    });
  }
}
