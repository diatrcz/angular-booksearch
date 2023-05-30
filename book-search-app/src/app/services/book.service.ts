import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url = 'https://openlibrary.org';

  constructor(private http: HttpClient) { }

  /**
   * Search book by anything.
   * @param query The search keywords
   * @returns Json file
   */
  searchBooks(query: string): Observable<any> {
    const url = `${this.url}/search.json?q=${query}`;
    return this.http.get(url);
  }

  /**
   * Search book by book title.
   * @param query The search keywords
   * @returns Json file
   */
  searchBooksByTitle(query: string): Observable<any> {
    const url = `${this.url}/search.json?title=${query}`;
    return this.http.get(url);
  }

  /**
   * Search book by author.
   * @param query The search keywords
   * @returns Json file
   */
  searchBooksByAuthor(query: string): Observable<any> {
    const url = `${this.url}/search.json?author=${query}`;
    return this.http.get(url);
  }

  /**
   * Get the details of one particular book.
   * @param bookKey the book's id/key.
   * @returns JSON file.
   */
  getBookDetails(bookKey: string): Observable<any> {
    const url = `${this.url}${bookKey}.json`;
    return this.http.get(url);
  }

  /**
   * Returns the details of one particular author.
   * @param authorKey The author's id/key.
   * @returns JSON file.
   */
  getAuthorDetails(authorKey: string) {
    const url = `${this.url}${authorKey}.json`;
    return this.http.get(url);
  }

  /**
   * Returns the data about a book's ratings.
   * @param bookKey The book's key/id.
   * @returns JSON file.
   */
  getRatings(bookKey: string) { 
    const url = `${this.url}${bookKey}/ratings.json`;
    return this.http.get(url);
  }

  /**
   * Returns a book's bookshelf details.
   * @param bookKey The book's key/id.
   * @returns JSON file.
   */
  getBookshelfDetails(bookKey: string) { 
    const url = `${this.url}${bookKey}/bookshelves.json`;
    return this.http.get(url);
  }
}

