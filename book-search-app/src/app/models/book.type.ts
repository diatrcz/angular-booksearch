export interface Author {
  key: string;
  name: string;
  link: string;
}

export interface Book {
  key: string;
  title: string;
  authorKey?: string[];
  authorName?: string[];
  firstPublishYear: number;
  publisher: string;
  coverId: string;
  description?: string;
}
