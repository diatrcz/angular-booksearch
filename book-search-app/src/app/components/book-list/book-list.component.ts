import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { Book } from '../../models/book.type';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  searchQuery: string = '';
  searchResults: Book[] = [];
  selectedOption: string = 'searchByAnything';

  constructor(private router: Router, private bookService: BookService) { }

  /**
   * Calls one of the service's search functions based on which option is selected.
   * searcByAnything -> searchBooks
   * searchByAuthor -> searchBooksByAuthor
   * search-byTitle -> searchBooksByTitle
   * goes through the results and calls the toBook function on each so it can be passed
   * to the searchResults variable
   */
  searchBooks(): void {
    if(this.searchQuery.trim() !== '') {
      if(this.selectedOption === 'searchByAnything') {
        this.bookService.searchBooks(this.searchQuery).subscribe(response => {
          this.searchResults = response.docs.map((book: any) => this.toBook(book));
        });
      }
      else if(this.selectedOption === 'searchByAuthor') {
        this.bookService.searchBooksByAuthor(this.searchQuery).subscribe(response => {
          this.searchResults = response.docs.map((book: any) => this.toBook(book));
        });
      }
      else if(this.selectedOption === 'searchByTitle') {
        this.bookService.searchBooksByTitle(this.searchQuery).subscribe(response => {
          this.searchResults = response.docs.map((book: any) => this.toBook(book));
        });
      }
    }
  }

  /**
   * Navigates to the bookdetails page using rotuing.
   * @param key the book id that gets passed to the bookdetails page
   */
  viewBookDetails(key: string): void {
    if (key) {
      this.router.navigate(['/book-details', key]);
    }
  }

  /**
   * Gets the useful information from the data and return them int a Book object.
   * @param data The response from the service provider
   * @returns a Book object
   */
  private toBook(data: any): Book {
    return {
      key: data.key,
      title: data.title,
      authorName: data.author_name || [],
      firstPublishYear: data.first_publish_year,
      publisher: data.publisher ? data.publisher[0] : '',
      coverId: data.cover_i,
      description: data.description ? data.description.value : ''
    };
  }
}
