import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  books: any[] = [];
  bookDetails: any[] = [];
  isLoading: boolean = true;
  favoriteBooks = [];
  constructor(private bookService: BookService,private router: Router,private authService:AuthService) {}

  ngOnInit() {
    this.fetchBooks();
  }

  // Fetching the list of books
  fetchBooks() {
    this.bookService.getRecentBooks().subscribe(
      (response) => {
        if (response.status === 'ok') {
          this.books = response.books; // Assign books from API response
        }
        console.log('Fetched books:', this.books);
        this.isLoading = false; // Set loading state to false after books are fetched
      },
      (error) => {
        console.error('Error fetching books:', error);
        this.isLoading = false; // Stop loading in case of an error
      }
    );
  }

  // Fetching the details of a specific book
  viewBookDetails(id: any) {
    this.router.navigate(['/book-details', id]);
  }

  goToCrudBookPage() {
    this.router.navigate(['/crud-books']);
  }
  viewFavorites() {
    this.router.navigate(['/favorites']);  // Replace with the actual route to the favorites page
  }
  onLogout() {
    this.authService.logout().then(() => {
      // After logout, navigate to the login page
      this.router.navigate(['sign-in']);
    });
  }
}
