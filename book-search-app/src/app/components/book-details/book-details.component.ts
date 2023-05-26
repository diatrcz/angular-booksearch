import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.type';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookKey: string = '';
  bookDetails: Book | undefined;

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bookKey = params.get('bookKey') || '';
      this.fetchBookDetails();
    });
  }

  fetchBookDetails(): void {
    if (this.bookKey !== undefined) {
      this.bookService.getBookDetails(this.bookKey).subscribe(response => {
        console.log('API Response:', response);
        this.bookDetails = this.toBook(response);
      });
    }
  }

  private toBook(data: any): Book {
    return {
      key: data.key,
      title: data.title,
      author: data.author_name ? data.author_name.map((name: string) => ({ name, link: '' })) : [],
      firstPublishYear: data.first_publish_year,
      publisher: data.publisher ? data.publisher[0] : '',
      coverId: data.cover_i,
      description: data.description
    };
  }
}
