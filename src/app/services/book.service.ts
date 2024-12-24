import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://www.dbooks.org/api/recent';

  constructor(private http: HttpClient) {}

  getRecentBooks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getBookDetails(id:any):Observable<any>{
    return this.http.get<any>(`https://www.dbooks.org/api/book/${id}`);
  }
}
