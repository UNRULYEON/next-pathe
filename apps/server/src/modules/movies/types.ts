export interface ReleaseAt {
  NL_NL: string;
}

export interface PosterPath {
  lg: string;
  md: string;
}

export interface BackgroundPath {
  lg: string;
  md: string;
  sm: string;
}

export interface Trailer {
  externalId: string;
  videoType: string;
  title: string;
  snapshot: string;
  isMain: boolean;
  language: string;
}

export interface Feelings {
  countWishList: number;
  countEmotionDisappointed: number;
  countEmotionLike: number;
  countEmotionLove: number;
}

export interface Movie {
  slug: string;
  title: string;
  titleTracking: string;
  releaseAt: ReleaseAt;
  contentRating: string[];
  cinechecks: string[];
  genres: string[];
  genresTracking: string[];
  duration: number;
  directors: string;
  actors: string;
  synopsis: string;
  entertainementLogo: string | null;
  entertainementSubtitle: string | null;
  distribution: string | null;
  entertainementCasting: string;
  posterPath: PosterPath;
  backgroundPath: BackgroundPath;
  backgroundDominantColor: string;
  isMovie: boolean;
  trailers: Trailer[];
  presentation: string | null;
  calendar: string | null;
  warning: string | null;
  nationality: string | null;
  nationalityTracking: string | null;
  originalTitle: string;
  feelings: Feelings;
  similarShows: string[];
  event: string[];
  redirectSlug: string | null;
  refHubble: string;
  isNew: boolean;
  notComingSoon: boolean;
  visaHubble: string | null;
  copiesCount: number;
  next24ShowtimesCount: number;
  tags: string[];
  salesOpeningDatetime: string | null;
  showtimesDisplayDatetime: string | null;
  vodAvailability: boolean;
  vod: string | null;
  refVista: string;
  labelFlagColor: string | null;
  label: string | null;
  originalReleaseAt: string | null;
  extraInformation: string | null;
  logoTitle: string | null;
}
