export interface Book {
  key: string;
  title: string;
  authorName?: string[];
  firstPublishYear: number;
  publisher: string;
  coverId: string;
  description?: string;
}
