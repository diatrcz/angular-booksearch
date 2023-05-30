/**
 * Represents one book that you get back from the API's search json.
 */
export interface Book {
  key: string;
  title: string;
  authorName?: string[];
  firstPublishYear: number;
  publisher: string;
  coverId: string;
  description?: string;
}
