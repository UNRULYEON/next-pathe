export interface Poster {
  lg: string | null;
  md: string | null;
  sm: string | null;
}

export interface Backdrop {
  lg: string;
  md: string;
  sm: string;
}

export interface Release {
  NL_NL: string;
}

export interface Rating {
  ref: string;
  description: string;
  extendedDescription: string;
}

export interface Cinecheck {
  ref: string;
  description: string;
}

export interface Show {
  type: "show";
  slug: string;
  title: string;
  poster: Poster | null;
  backdrop: Backdrop | null;
  isMovie: boolean;
  url: string;
  eventType: string | null;
  tag: string | null;
  contentRating: string;
  contentRatingRef: string;
  warning: string | null;
  id: string;
  genres: string[];
  duration: number;
  isNew: boolean;
  internalId: number;
  release: Release;
  rating: Rating;
  cinechecks: Cinecheck[];
  topic: string | null;
  content: string | null;
  published: string | null;
  publicationDate: string;
  urlSlug: string | null;
  originalRelease: string | null;
}

export type SearchResult = Show;

export type SearchResults = SearchResult[];
