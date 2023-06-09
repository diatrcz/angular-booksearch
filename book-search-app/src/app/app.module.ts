import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { MatIconModule } from '@angular/material/icon';


import { AppComponent } from '../app/components/book-search-app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookService } from './services/book.service';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatIconModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
