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
  
  /**
   * Constructor for the BookDetails Component
   * @param route the active routing where paranateres come from
   * @param bookService the service that provides the book details using httpClient
   */
  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  /**
   * Necessary function from implementing OnInit calls the load function
   */
  ngOnInit(): void {
    this.load();
  }

  /**
   * Get the bookKey parameter from the routing so it could get the details for the book.
   * Then calls the getBookDetails function
   */
  load(): void { 
    this.route.paramMap.subscribe(params => {
      this.bookKey = params.get('bookKey') || '';
      this.getBookDetails();
    });
  }

  /**
   * Subscribes to the service's getBookDetails function, then gives the data from the service to the bookdetails variable
   * using the toBookDetails function.
   * Then iterates through the author keys in the bookdetails variable and for each one calls the getAuthorDetails function.
   * After that it calls the getRatingDetails function and the getBookDetails function to gather every data that's needed for the page.
   */
  getBookDetails(): void {
    this.bookService.getBookDetails(this.bookKey)
      .subscribe(book => {
        this.bookDetails = this.toBookDetail(book);
        this.bookDetails.authorKey?.forEach(authorKey => {
          this.getAuthorDetails(authorKey);
        });
      });   
      this.getRatingsDetails();
      this.getBookshelfDetails();
  }

  /**
   * Takes out the useful attributes from the data and matches it to the BookDetails interface's variables.
   * For the authors array in the json: if there's none it stays an ampty array, if no then it gets filled with the authorKeys.
   * for the description: there are works were there's no description. So first let set it to an empty string. If the data's description is
   * not empty but a string then set the description variable to the data.description, then cut out the not displayable parts ([source], Contains)
   * then trim the description variable from.
   * After that return the useful data and set it for the BookDetails attributes.
   * @param data the data we get from the service request
   * @returns a BookDetails object
   */
  private toBookDetail(data: any): BookDetails {
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

  /**
   * Subscribes to the service's getAuthorDetails function, then gives the data from the service to the authors variable
   * using the toAuthor function.
   * @param authorKey the id of the author
   */
  private getAuthorDetails(authorKey: string) : void {
    this.bookService.getAuthorDetails(authorKey)
    .subscribe(author => { 
      let authorTmp = author;
      this.authors.push(this.toAuthor(authorTmp));
     });
  }

  /**
   * Takes the useful data from the getAuthorDetails service response and turns it into an Author object.
   * @param data the response from the getAuthorDetails service
   * @returns an Author object
   */
  private toAuthor(data: any): Author {
    const link = data.links && data.links[0] ? data.links[0].url : '';
    return { key: data.key, name: data.name, link };
  }

  /**
   * Similarly takes the useful data from the getRatings service response and turns it into a Rating object
   * @param data the response from the getRatings service
   * @returns a Rating object
   */
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

  /**
   * Subscribes to the service's getRatingsDetails function and gices the useful data to the
   * ratings variable using the toRatings function
   */
  private getRatingsDetails(): void {
    this.bookService.getRatings(this.bookKey)
      .subscribe(ratings => {
        this.ratings = this.toRatings(ratings);
      });
  }
  
  /**
   * Similarly to the other methods uses the useful data from the service response to create a bookshelf object.
   * @param data the response from the service
   * @returns a bookshelf object
   */
  private toBookshelf(data: any): Bookshelf {
    return {
      want_to_read: data.counts.want_to_read || 0,
      currently_reading: data.counts.currently_reading || 0,
      already_read: data.counts.already_read || 0
    };
  }

  /**
   * Subscribes to the service's getBookshelfDetails method and makes the useful data and creates a Bookshelf object from it
   * using the toBookShelf method then gives it to the bookshelf variable.
   */
  private getBookshelfDetails(): void {
    this.bookService.getBookshelfDetails(this.bookKey)
    .subscribe(bookshelf => {
      this.bookshelf = this.toBookshelf(bookshelf);
    });
  }
  
}
