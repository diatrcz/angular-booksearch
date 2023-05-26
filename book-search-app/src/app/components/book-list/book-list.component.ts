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

  constructor(private router: Router, private bookService: BookService) { }

  searchBooks(): void {
    if (this.searchQuery.trim() !== '') {
      this.bookService.searchBooks(this.searchQuery).subscribe(response => {
        console.log(response);
        this.searchResults = response.docs.map((book: any) => this.toBook(book));
      });
    }
  }

  viewBookDetails(key: string): void {
    if (key) {
      this.router.navigate(['/book-details', key]);
    }
  }

  private toBook(data: any): Book {
    return {
      key: data.key,
      title: data.title,
      author: data.author_name ? data.author_name.map((name: string) => ({ name, link: '' })) : [],
      firstPublishYear: data.first_publish_year,
      publisher: data.publisher ? data.publisher[0] : '',
      coverId: data.cover_i
    };
  }
}
