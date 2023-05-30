/**
 * Represents the basic details you can get from the work's json file about the book.
 */
export interface BookDetails {
    key: string;
    title: string;
    authorKey?: string[];
    coverId: string;
    description?: string;
    subject_places?: string[];
    subjects?: string[];
    subject_people?: string[];
    subject_times?: string[];
  }
  