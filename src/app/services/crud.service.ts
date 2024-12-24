import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(private firestore: Firestore) {}

  // Add a new book
  async addBook(book: any): Promise<string> {
    const booksCollection = collection(this.firestore, 'books');
    try {
      const docRef = await addDoc(booksCollection, book);
      console.log('Document written with ID: ', docRef.id);
      return docRef.id;
    } catch (e) {
      console.error('Error adding document: ', e);
      throw new Error('Error adding book');
    }
  }

  // Fetch all books
  async getBooks(): Promise<any[]> {
    const booksCollection = collection(this.firestore, 'books');
    const querySnapshot = await getDocs(booksCollection);
    const booksList: any[] = [];
    querySnapshot.forEach((doc) => {
      booksList.push({ id: doc.id, ...doc.data() });
    });
    return booksList;
  }

  // Update an existing book
  async updateBook(id: string, updatedBook: any): Promise<void> {
    const bookDoc = doc(this.firestore, 'books', id);
    try {
      await updateDoc(bookDoc, updatedBook);
      console.log('Document updated successfully');
    } catch (e) {
      console.error('Error updating document: ', e);
      throw new Error('Error updating book');
    }
  }

  // Delete a book
  async deleteBook(id: string): Promise<void> {
    const bookDoc = doc(this.firestore, 'books', id);
    try {
      await deleteDoc(bookDoc);
      console.log('Document deleted successfully');
    } catch (e) {
      console.error('Error deleting document: ', e);
      throw new Error('Error deleting book');
    }
  }
}
