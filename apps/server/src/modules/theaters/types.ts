export interface GpsPosition {
  x: number;
  y: number;
}

export interface Theater {
  name: string;
  addressLine1: string;
  addressLine2: string | null;
  addressZip: string;
  addressCity: string;
  gpsPosition: GpsPosition;
}

export interface Service {
  label: string;
  slug: string;
  description: string;
  refImage: string;
  isAccessibility: boolean;
}

export interface TheaterLocation {
  status: boolean;
  slug: string;
  citySlug: string;
  name: string;
  tags: string[];
  hasPmrService: boolean;
  theaters: Theater[];
  hallCount: number | null;
  seatCount: number;
  services: Service[];
  backdrop: string;
  comment: string | null;
  refImageItinerary: string | null;
  description: string;
  vistaRef: string;
  googleMyBusinessUrl: string | null;
  nearbySessionsCinema: string | null;
  nearbySessionsWording: string | null;
}
