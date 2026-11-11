import React, { useState, useMemo } from 'react';
import { Event } from '../types';
import { Search } from 'lucide-react';
import { EventPoster } from '../components/EventPoster';

interface HomeProps {
  events: Event[];
  onEventSelect: (event: Event) => void;
}

const MARQUEE = ['Live concerts', 'Art exhibitions', 'Tech summits', 'Club nights'];

const scrollToListings = () => {
  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
};

const Home: React.FC<HomeProps> = ({ events, onEventSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, selectedCategory]);

  const categories = ['All', ...Array.from(new Set(events.map(e => e.category)))];
  const highlight = events[0];
  const understudy = events[1];

  return (
    <div className="w-full overflow-hidden">

      {/* --- HERO: the headline and this week's poster, pasted on the wall --- */}
      <section className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-10 md:px-8 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className="lg:col-span-7">
          <h1 className="display text-[15vw] leading-[0.82] text-paper sm:text-[14vw] lg:text-[9.4vw] 2xl:text-[9rem]">
            Doors open.
            <br />
            Lights down.
            <br />
            You're in.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-mute md:mt-8 md:text-xl">
            Tickets for concerts, conferences, exhibitions and club nights in Mumbai, Bangalore, Delhi and Pune.
          </p>
          <button type="button" onClick={scrollToListings} className="btn btn-primary mt-8 px-7 py-4 text-xl">
            See what's on
          </button>
        </div>

        {highlight && (
          <div className="relative mx-auto w-full max-w-[340px] lg:col-span-5 lg:max-w-[420px]">
            {understudy && (
              <div aria-hidden="true" className="absolute inset-0 -translate-x-[9%] translate-y-[3%] -rotate-[8deg] opacity-70">
                <EventPoster event={understudy} showFooter={false} className="h-full w-full" />
              </div>
            )}
            <div className="relative rotate-3 animate-poster-drop"
            >
              <EventPoster event={highlight} onClick={() => onEventSelect(highlight)} />
              <span className="display pointer-events-none absolute -right-2 -top-5 rotate-6 bg-volt px-3 py-1.5 text-xl leading-none text-ink-950 shadow-print md:-right-5 md:text-2xl">
                This week's highlight
              </span>
            </div>
          </div>
        )}
      </section>

      {/* --- MARQUEE STRIP --- */}
      <div aria-hidden="true" className="relative z-10 -mx-2 -rotate-1 overflow-hidden bg-volt py-3 text-ink-950 md:py-4">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0">
              {[...MARQUEE, ...MARQUEE].map((item, i) => (
                <span key={i} className="display flex items-center text-3xl leading-none md:text-5xl">
                  {item}
                  <span className="mx-6 inline-block h-3 w-3 rotate-45 bg-coral-deep md:mx-10 md:h-4 md:w-4" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* --- LISTINGS (with search & filter) --- */}
      <section id="featured" className="mx-auto max-w-screen-2xl scroll-mt-20 px-5 pb-24 pt-16 md:px-8 md:pt-24">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="display text-poster-md text-paper md:text-poster-lg">What's on</h2>
            <p className="mt-2 text-mute" aria-live="polite">
              {filteredEvents.length === events.length
                ? `${events.length} events on sale`
                : `Showing ${filteredEvents.length} of ${events.length} events`}
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute" size={18} aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events"
                aria-label="Search events"
                className="field pl-11 md:w-64"
              />
            </div>

            <div role="group" aria-label="Filter by category" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-1 md:mx-0 md:px-0">
              {categories.map(cat => (
                <button
                  type="button"
                  key={cat}
                  aria-pressed={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap rounded-stock border px-4 py-3 text-sm font-semibold transition-colors ${
                    selectedCategory === cat
                      ? 'border-volt bg-volt text-ink-950'
                      : 'border-ink-600 text-paper-dim hover:border-paper hover:text-paper'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="mx-auto w-full max-w-[400px]">
                <EventPoster event={event} onClick={() => onEventSelect(event)} />
                <p className="mt-4 text-sm leading-relaxed text-mute">{event.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-start rounded-md border border-dashed border-ink-600 px-6 py-14 md:px-10">
            <p className="display text-poster-sm text-paper">Nothing on the bill</p>
            <p className="mt-2 text-mute">No events match that search. Try another word or category.</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="btn btn-secondary mt-6"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
