import { Event, TicketTier } from './types';

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Neon Symphony 2025',
    date: 'DEC 12',
    time: '20:00',
    location: 'Cyber Dome, Mumbai',
    image: 'https://picsum.photos/800/600?random=1',
    price: 4500,
    category: 'Music',
    description: 'An orchestral experience fused with synthetic waves.',
    organizer: 'BuildnBit Ent',
    capacity: 5000,
    sold: 3420,
    tags: ['Live', 'Orchestra', 'Electronic']
  },
  {
    id: '2',
    title: 'Future Tech Summit',
    date: 'JAN 15',
    time: '09:00',
    location: 'Convention Centre, Bangalore',
    image: 'https://picsum.photos/800/600?random=2',
    price: 12000,
    category: 'Conference',
    description: 'Where humanity meets the singularity.',
    organizer: 'TechWorld',
    capacity: 2000,
    sold: 1950,
    tags: ['Tech', 'AI', 'Networking']
  },
  {
    id: '3',
    title: 'Floating Art Gala',
    date: 'FEB 28',
    time: '19:30',
    location: 'Sky Deck, Delhi',
    image: 'https://picsum.photos/800/600?random=3',
    price: 2500,
    category: 'Exhibition',
    description: 'Immersive digital art installations in the clouds.',
    organizer: 'Artsy',
    capacity: 500,
    sold: 120,
    tags: ['Art', 'Digital', 'Gala']
  },
  {
    id: '4',
    title: 'Retro Wave Night',
    date: 'MAR 10',
    time: '22:00',
    location: 'The Social, Pune',
    image: 'https://picsum.photos/800/600?random=4',
    price: 999,
    category: 'Party',
    description: '80s nostalgia meets modern beat drops.',
    organizer: 'NightLife Inc',
    capacity: 800,
    sold: 600,
    tags: ['Party', 'Retro', 'Dance']
  }
];

export const TICKET_TIERS: TicketTier[] = [
  {
    id: 'gen',
    name: 'General Access',
    price: 1, // Multiplier 1x
    benefits: ['Entry to event', 'Digital Souvenir']
  },
  {
    id: 'vip',
    name: 'VIP Experience',
    price: 2.5, // Multiplier
    benefits: ['Skip the line', 'VIP Lounge', 'Free Drinks', 'NFT Badge']
  },
  {
    id: 'backstage',
    name: 'Backstage Pass',
    price: 5, // Multiplier
    benefits: ['All VIP perks', 'Meet & Greet', 'Afterparty Access']
  }
];