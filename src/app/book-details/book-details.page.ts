import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';
import { FavorisService } from '../services/favoris.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
  standalone:false,
})
export class BookDetailsPage implements OnInit {

  bookId: string = ''; // Store the selected book's ID
  bookDetails: any = []; // Store the book details
  isLoading: boolean = true; // Show loading state while fetching data
  errorMessage: string = '';
  isFavoriteStatus = false;
  constructor(
    private route: ActivatedRoute, // To get route parameters
    private bookService: BookService ,
    private favoriteBooksService: FavorisService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('id')!; // Get the book ID from URL
      this.fetchBookDetails();
    });
  }

  fetchBookDetails() {
    this.bookService.getBookDetails(this.bookId).subscribe(
      (response) => {
        // Directly assign the response to the bookDetails
        if (response.status === 'ok') {
          this.bookDetails = response;
          if(response.image ===null) response.image="https://placehold.co/150";
        }
        this.isLoading = false; // Hide loading once data is loaded
      },
      (error) => {
        this.errorMessage = 'Failed to load book details. Please try again later.';
        this.isLoading = false; // Hide loading on error
      }
    );
  }
  checkFavoriteStatus() {
    this.favoriteBooksService.isFavorite(this.bookId).subscribe((isFavorite) => {
      this.isFavoriteStatus = isFavorite;  // Update the favorite status
    });
  }

  // Toggle the favorite status of the book
  toggleFavorite() {
    this.favoriteBooksService.addBookToFavorites(this.bookDetails);
  }
  
}
