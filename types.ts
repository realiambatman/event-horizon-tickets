export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
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

