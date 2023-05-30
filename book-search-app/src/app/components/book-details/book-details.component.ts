import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { BookDetails } from '../../models/book_details.type';
import { Author } from 'src/app/models/author.type';
import { Ratings } from '../../models/ratings.type';
import { Bookshelf } from 'src/app/models/bookshelf.type';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookKey: string = '';
  bookDetails: BookDetails | undefined;
  authors: Author[] = [];
  ratings: Ratings | undefined;
  bookshelf: Bookshelf | undefined;
  

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void { 
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
      this.getRatingsDetails();
      this.getBookshelfDetails();
  }

  private toBook(data: any): BookDetails {
    const authorKeys = data.authors ? data.authors.map((author: any) => author.author.key) : [];

    let description = '';

    if (typeof data.description === 'string') {
      description = data.description;
      const sourceIndex = description.indexOf('([source]');
      const containsIndex = description.indexOf('Contains');
      
      if (sourceIndex !== -1) {
        description = description.slice(0, sourceIndex);
      } 
      else if (containsIndex !== -1) {
        description = description.slice(0, containsIndex);
      }

      description.trim();
    }
  
    return {
      key: data.key,
      title: data.title,
      authorKey: authorKeys,
      coverId: data.covers && data.covers[0] ? data.covers[0] : '',
      description: description,
      subject_places: data.subject_places,
      subjects: data.subjects,
      subject_people: data.subject_people,
      subject_times: data.subject_times,
    };
  }

  private getAuthorDetails(authorKey: string) : void {
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

  private toRatings(data: any): Ratings {
    const summary = {
      average: data.summary?.average || 0,
      count: data.summary?.count || 0
    };
  
    const counts = {
      '1': data.counts?.['1'] || 0,
      '2': data.counts?.['2'] || 0,
      '3': data.counts?.['3'] || 0,
      '4': data.counts?.['4'] || 0,
      '5': data.counts?.['5'] || 0
    };
  
    return { summary, counts };
  }

  private getRatingsDetails(): void {
    this.bookService.getRatings(this.bookKey)
      .subscribe(ratings => {
        this.ratings = this.toRatings(ratings);
      });
  }

  private toBookshelf(data: any): Bookshelf {
    return {
      want_to_read: data.counts.want_to_read || 0,
      currently_reading: data.counts.currently_reading || 0,
      already_read: data.counts.already_read || 0
    };
  }

  private getBookshelfDetails(): void {
    this.bookService.getBookshelfDetails(this.bookKey)
    .subscribe(bookshelf => {
      console.log(bookshelf);
      this.bookshelf = this.toBookshelf(bookshelf);
    });
  }

  getArrayFromNumber(num: number): any[] {
    return Array(num).fill(0);
  }
  
}
