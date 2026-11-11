import React from 'react';
import { Heart, Share2 } from 'lucide-react';

const MOMENTS = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/concert1/800/1000',
    title: 'Neon Nights',
    photographer: 'Sarah Jenkins',
    cols: 1,
    rows: 2,
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/crowd2/1200/800',
    title: 'The Great Gathering',
    photographer: 'Mike Alwen',
    cols: 2,
    rows: 1,
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/artist3/800/800',
    title: 'Solo Performance',
    photographer: 'Davide O.',
    cols: 1,
    rows: 2,
  },
  {
    id: 4,
    image: 'https://picsum.photos/seed/light4/800/1200',
    title: 'Laser Symphony',
    photographer: 'TechVis',
    cols: 1,
    rows: 1,
  },
  {
    id: 5,
    image: 'https://picsum.photos/seed/dance5/800/800',
    title: 'Rhythm & Flow',
    photographer: 'Elena R.',
    cols: 1,
    rows: 1,
  },
  {
    id: 6,
    image: 'https://picsum.photos/seed/fest6/1200/800',
    title: 'Open Air Vibes',
    photographer: 'DroneShotz',
    cols: 2,
    rows: 1,
  },
  {
    id: 7,
    image: 'https://picsum.photos/seed/art7/800/1000',
    title: 'Digital Gallery',
    photographer: 'Artsy Studio',
    cols: 2,
    rows: 1,
  },
];

// Duotone inks, cycled across the wall so neighbouring prints differ.
const INKS = ['bg-coral', 'bg-magenta', 'bg-volt'];

const Moments: React.FC = () => {
  return (
    <div className="w-full">
      <header className="mb-10 md:mb-16">
        <h1 className="display text-[19vw] leading-[0.82] text-paper sm:text-poster-xl">
          Captured
          <br />
          moments
        </h1>
        <p className="mt-4 text-lg text-mute">Archive 2024</p>
      </header>

      {/* Masonry Grid */}
      <ul className="grid grid-flow-dense auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
        {MOMENTS.map((item, i) => (
          <li
            key={item.id}
            className={`group relative overflow-hidden rounded-stock bg-ink-800 ${
              item.cols === 2 ? 'sm:col-span-2' : ''
            } ${item.rows === 2 ? 'row-span-2' : ''}`}
          >
            {/* Dot screen shown while the photo loads, or if it never does. */}
            <div aria-hidden="true" className="halftone absolute inset-0 text-ink-600" />
            {/* Photo printed as a two-ink duotone: midnight shadows, one hot highlight. */}
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              decoding="async"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 transition-transform duration-500 ease-snap group-hover:scale-105"
            />
            <div aria-hidden="true" className={`absolute inset-0 mix-blend-multiply ${INKS[i % INKS.length]}`} />
            <div aria-hidden="true" className="absolute inset-0 bg-ink-800 mix-blend-lighten" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
              <div className="min-w-0">
                <h2 className="display text-3xl leading-[0.9] text-paper">{item.title}</h2>
                <p className="mt-1 text-sm font-medium text-paper-dim">by {item.photographer}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  aria-label={`Like ${item.title}`}
                  className="flex h-10 w-10 items-center justify-center rounded-stock bg-ink-950/70 text-paper transition-colors hover:bg-coral hover:text-ink-950"
                >
                  <Heart size={18} />
                </button>
                <button
                  type="button"
                  aria-label={`Share ${item.title}`}
                  className="flex h-10 w-10 items-center justify-center rounded-stock bg-ink-950/70 text-paper transition-colors hover:bg-volt hover:text-ink-950"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-14 text-mute">
        View complete gallery on Instagram{' '}
        <button type="button" className="font-bold text-volt underline-offset-4 hover:underline">
          @EventHorizon.Live
        </button>
      </p>
    </div>
  );
};

export default Moments;
