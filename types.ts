export type PosterArtKind = 'rays' | 'grid' | 'rings' | 'stripes';
export type PosterTone = 'coral' | 'paper' | 'violet' | 'volt';

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  /** Drawn poster artwork: which motif and which ink set. */
  poster: { art: PosterArtKind; tone: PosterTone };
  price: number;
  category: string;
  description: string;
  organizer: string;
  capacity: number;
  sold: number;
  tags: string[];
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  benefits: string[];
}
