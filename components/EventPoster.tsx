import React from 'react';
import { Event } from '../types';
import { PosterArt, POSTER_TONES } from './PosterArt';

interface EventPosterProps {
  event: Event;
  onClick?: () => void;
  className?: string;
  /** Show the price / sold strip along the bottom edge. */
  showFooter?: boolean;
}

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

/**
 * An event as a gig poster: artwork above, bill-style headline below.
 * Type scales with the card's own width (container query units), so the same
 * poster reads correctly at any size.
 */
export const EventPoster: React.FC<EventPosterProps> = ({ event, onClick, className = '', showFooter = true }) => {
  const tone = POSTER_TONES[event.poster.tone];
  const [month, day] = event.date.split(' ');
  const soldPct = Math.round((event.sold / event.capacity) * 100);
  const almostGone = soldPct >= 90;

  const body = (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden rounded-stock text-left"
      style={{ backgroundColor: tone.bg, color: tone.fg, containerType: 'inline-size' }}
    >
      <div className="relative min-h-0 flex-1">
        <PosterArt art={event.poster.art} tone={event.poster.tone} className="absolute inset-0 h-full w-full" />

        <div
          className="absolute left-[5cqw] top-[5cqw] flex flex-col items-center px-[3.5cqw] py-[2.5cqw] font-display font-black uppercase leading-none"
          style={{ backgroundColor: tone.fg, color: tone.bg }}
        >
          <span style={{ fontSize: '5.5cqw' }}>{month}</span>
          <span style={{ fontSize: '13cqw', lineHeight: 0.85 }}>{day}</span>
        </div>

        {almostGone && (
          <span
            className="absolute right-[5cqw] top-[5cqw] rotate-3 px-[3cqw] py-[1.5cqw] font-display font-extrabold uppercase leading-none"
            style={{ backgroundColor: tone.accent, color: '#06061a', fontSize: '5cqw' }}
          >
            Almost sold out
          </span>
        )}
      </div>

      <div className="px-[6cqw] pb-[5cqw] pt-[5cqw]" style={{ borderTop: `0.9cqw solid ${tone.fg}` }}>
        <p className="font-semibold" style={{ fontSize: 'max(12px, 4.2cqw)' }}>
          {event.category} at {event.time}
        </p>
        <h3
          className="display mt-[1.5cqw] text-balance"
          style={{ fontSize: '17cqw', lineHeight: 0.84 }}
        >
          {event.title}
        </h3>
        <p className="mt-[3cqw] font-medium" style={{ fontSize: 'max(12px, 4.4cqw)' }}>
          {event.location}
        </p>

        {showFooter && (
          <div
            className="mt-[4cqw] flex items-baseline justify-between gap-2 pt-[3cqw]"
            style={{ borderTop: `1px solid ${tone.fg}` }}
          >
            <span className="font-display font-black leading-none" style={{ fontSize: '9cqw' }}>
              {formatPrice(event.price)}
            </span>
            <span className="font-semibold" style={{ fontSize: 'max(12px, 4cqw)' }}>
              {soldPct}% sold
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (!onClick) {
    return <div className={`aspect-[3/4] ${className}`}>{body}</div>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${event.title}, ${event.date}, ${event.location}. From ${formatPrice(event.price)}`}
      className={`group block aspect-[3/4] w-full rounded-stock shadow-lift transition duration-200 ease-snap hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-print-coral focus-visible:-translate-y-1.5 active:translate-y-0 active:rotate-0 ${className}`}
    >
      {body}
    </button>
  );
};
