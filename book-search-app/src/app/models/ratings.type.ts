export interface Ratings {
    summary: {
      average: number;
      count: number;
    };
    counts: {
      [key: string]: number;
    };
  }
  