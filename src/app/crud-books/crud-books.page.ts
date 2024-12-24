import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-crud-books',
  templateUrl: './crud-books.page.html',
  styleUrls: ['./crud-books.page.scss'],
  standalone: false
})
export class CrudBooksPage implements OnInit {
  books: any[] = [];
  newBook = { title: '', authors: '', description: '', year: '' };
  isLoading = false;
  selectedBook: any = null;

  constructor(private bookService: CrudService) {}

  ngOnInit() {
    this.loadBooks();
  }

  async loadBooks() {
    this.isLoading = true;
    try {
      this.books = await this.bookService.getBooks();
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async addBook() {
    if (!this.newBook.title || !this.newBook.authors || !this.newBook.description || !this.newBook.year) {
      alert('Please fill in all fields before adding a book.');
      return;
    }
    try {
      const book = { ...this.newBook };
      const id = await this.bookService.addBook(book);
      this.books.push({ id, ...book });
      this.newBook = { title: '', authors: '', description: '', year: '' }; // Reset form
      alert('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  }

  editBook(book: any) {
    console.log('Book to edit:', book);
    this.selectedBook = { ...book }; // Clone the selected book for editing
  }

  async updateBook(id: string) {
    if (!this.selectedBook.title || !this.selectedBook.authors || !this.selectedBook.description || !this.selectedBook.year) {
      alert('Please fill in all fields before saving changes.');
      return;
    }
    try {
      await this.bookService.updateBook(id, this.selectedBook);
      const index = this.books.findIndex((book) => book.id === id);
      if (index !== -1) {
        this.books[index] = { ...this.selectedBook };
      }
      this.selectedBook = null; // Reset the edit form
      alert('Book updated successfully!');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  }

  async deleteBook(id: string) {
    if (confirm('Are you sure you want to delete this book?')) {
      try {
        await this.bookService.deleteBook(id);
        this.books = this.books.filter((book) => book.id !== id);
        alert('Book deleted successfully!');
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  }
}
