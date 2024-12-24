import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FavorisService } from '../services/favoris.service';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
  standalone: false,
})
export class FavorisPage implements OnInit {
  favoriteBooks: any[] = []; // Array to hold favorite books

  constructor(
    private afAuth: AngularFireAuth, // For Firebase Authentication
    private firestore: AngularFirestore,
    private favoriteBooksService: FavorisService
  ) {}

  ngOnInit() {
    this.loadFavoriteBooks();
  }

  // Fetch the user's favorite books from Firebase
  loadFavoriteBooks() {
    this.favoriteBooksService.loadFavoriteBooks().subscribe((favorites) => {
      this.favoriteBooks = favorites;
    });
  }
  addBookToFavorites(book: any) {
    this.favoriteBooksService.addBookToFavorites(book); // Add book to Firebase
  }
}
