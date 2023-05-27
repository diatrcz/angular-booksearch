import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book, Author } from '../../models/book.type';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookKey: string = '';
  bookDetails: Book | undefined;
  authors: Author[] = [];

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bookKey = params.get('bookKey') || '';
      this.getBookDetails();
    });
  }

  getBookDetails(): void {
    this.bookService.getBookDetails(this.bookKey)
      .subscribe(book => {
        this.bookDetails = this.toBook(book);
        console.log(this.bookDetails);
        this.bookDetails.authorKey?.forEach(authorKey => {
          this.getAuthorDetails(authorKey);
        });
      });

      
  }

  private toBook(data: any): Book {
    const authorKeys = data.authors ? data.authors.map((author: any) => author.author.key) : [];
  
    return {
      key: data.key,
      title: data.title,
      authorKey: authorKeys,
      authorName: [],
      firstPublishYear: data.first_publish_year,
      publisher: data.publisher ? data.publisher[0] : '',
      coverId: data.covers && data.covers[0] ? data.covers[0] : '',
      description: data.description
    };
  }

  getAuthorDetails(authorKey: string) : void {
    this.bookService.getAuthorDetails(authorKey)
    .subscribe(author => { 
      let authorTmp = author;
      this.authors.push(this.toAuthor(authorTmp));
     });
  }

  private toAuthor(data: any): Author {
    const link = data.links && data.links[0] ? data.links[0].url : '';
    return { key: data.key, name: data.name, link };
  }
  
}
