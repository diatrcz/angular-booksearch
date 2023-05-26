export interface Book {
    key: string;
    title: string;
    author: { name: string; link: string }[];
    firstPublishYear: number;
    publisher: string;
    coverId: string;
    description?: string;
  }
  