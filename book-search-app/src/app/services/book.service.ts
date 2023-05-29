import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url = 'https://openlibrary.org';

  constructor(private http: HttpClient) { }

  searchBooks(query: string): Observable<any> {
    const url = `${this.url}/search.json?q=${query}`;
    return this.http.get(url);
  }

  getBookDetails(bookKey: string): Observable<any> {
    const url = `${this.url}${bookKey}.json`;
    return this.http.get(url);
  }

  getAuthorDetails(authorKey: string) {
    const url = `${this.url}${authorKey}.json`;
    return this.http.get(url);
  }

  getRatings(bookKey: string) { 
    const url = `${this.url}${bookKey}/ratings.json`;
    return this.http.get(url);
  }

  getBookshelfDetails(bookKey: string) { 
    const url = `${this.url}${bookKey}/bookshelves.json`;
    return this.http.get(url);
  }
}

