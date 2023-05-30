/**
 * Represents the ratings data that you can get from the json file.
 */
export interface Ratings {
    summary: {
      average: number;
      count: number;
    };
    counts: {
      [key: string]: number;
    };
  }
  