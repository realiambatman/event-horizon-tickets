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

export interface UserTicket {
  id: string;
  eventId: string;
  tierId: string;
  purchaseDate: string;
  qrCode: string; // Mock data
  status: 'active' | 'used' | 'past';
}

export enum ViewState {
  HOME = 'HOME',
  EVENT_DETAILS = 'EVENT_DETAILS',
  CHECKOUT = 'CHECKOUT',
  MY_TICKETS = 'MY_TICKETS',
  ADMIN = 'ADMIN',
  MOMENTS = 'MOMENTS',
  PROFILE = 'PROFILE'
}