import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'https://openlibrary.org';

  constructor(private http: HttpClient) { }

  searchBooks(query: string): Observable<any> {
    const url = `${this.apiUrl}/search.json?q=${query}`;
    return this.http.get(url);
  }

  getBookDetails(bookKey: string): Observable<any> {
    const url = `${this.apiUrl}${bookKey}.json`;
    return this.http.get(url);
  }

  getAuthorDetails(authorKey: string) {
    const url = `${this.apiUrl}${authorKey}.json`;
    return this.http.get(url);
  }
}

