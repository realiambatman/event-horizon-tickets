import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Event, TicketTier } from '../types';
import { TICKET_TIERS, MOCK_EVENTS } from '../constants';
import { Button } from '../components/UI';
import { EventPoster } from '../components/EventPoster';
import { Ticket } from '../components/Ticket';
import { ArrowLeft, Check, Minus, Plus } from 'lucide-react';
import { generateEventHype } from '../services/geminiService';

interface EventDetailsProps {
  userEmail?: string;
}

const inr = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

const EventDetails: React.FC<EventDetailsProps> = ({ userEmail }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [hypeText, setHypeText] = useState<string>('Loading description...');
  const [selectedTier, setSelectedTier] = useState<TicketTier>(TICKET_TIERS[0]);
  const [quantity, setQuantity] = useState(1);
  const [paymentStep, setPaymentStep] = useState<'select' | 'payment' | 'success'>('select');
  const paymentTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const foundEvent = MOCK_EVENTS.find(e => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      navigate('/', { replace: true }); // Redirect to home if event not found
    }
  }, [id, navigate]);

  useEffect(() => {
    if (event) {
      let isMounted = true;
      generateEventHype(event.title, event.description).then(text => {
        if (isMounted) setHypeText(text);
      });
      return () => { isMounted = false; };
    }
  }, [event]);

  useEffect(() => () => clearTimeout(paymentTimer.current), []);

  if (!event) return null;

  const totalPrice = event.price * selectedTier.price * quantity;
  const soldPct = Math.round((event.sold / event.capacity) * 100);
  const remaining = event.capacity - event.sold;

  // Simulated payment: no real gateway is involved.
  const handlePurchase = () => {
    setPaymentStep('payment');
    paymentTimer.current = setTimeout(() => {
      setPaymentStep('success');
    }, 2000);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-mute transition-colors hover:text-paper"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back
      </button>

      <header className="mb-10 md:mb-14">
        <p className="mb-3 text-lg font-semibold text-coral">
          {event.date}, {event.time} at {event.location}
        </p>
        <h1 className="display text-balance text-[17vw] leading-[0.82] text-paper sm:text-poster-lg lg:text-poster-xl">
          {event.title}
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Poster */}
        <div className="lg:col-span-3">
          <div className="mx-auto max-w-[280px] -rotate-2 lg:sticky lg:top-24 lg:max-w-none">
            <EventPoster event={event} showFooter={false} className="shadow-lift" />
          </div>
        </div>

        {/* Info */}
        <div className="order-3 lg:order-none lg:col-span-5">
          <p className="max-w-[60ch] text-xl leading-relaxed text-paper md:text-2xl md:leading-relaxed">{hypeText}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
            {event.tags.map(tag => (
              <li key={tag} className="rounded-stock border border-ink-500 px-3 py-1 text-sm font-medium text-paper-dim">{tag}</li>
            ))}
          </ul>

          <dl className="mt-10 grid grid-cols-2 border-t border-ink-600">
            <Fact label="Date" value={event.date} />
            <Fact label="Doors" value={`${event.time} onwards`} />
            <Fact label="Venue" value={event.location} />
            <Fact label="Presented by" value={event.organizer} />
          </dl>

          <div className="mt-8">
            <div className="mb-2 flex items-baseline justify-between text-sm">
              <span className="font-semibold text-paper">{soldPct}% sold</span>
              <span className="text-mute">{remaining.toLocaleString('en-IN')} of {event.capacity.toLocaleString('en-IN')} left</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-ink-700" role="presentation">
              <div className={`h-full ${soldPct >= 90 ? 'bg-coral' : 'bg-paper'}`} style={{ width: `${soldPct}%` }} />
            </div>
          </div>

          <p className="mt-10 max-w-[60ch] leading-relaxed text-mute">
            Experience the ultimate {event.category.toLowerCase()} event of the year.
            Curated by <strong className="font-semibold text-paper">{event.organizer}</strong>, this event promises to be an immersive journey
            unlike anything you've seen before.
          </p>
        </div>

        {/* Booking Panel */}
        <div className="order-2 lg:order-none lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            {paymentStep === 'select' && (
              <div className="panel p-5 md:p-6">
                <div className="mb-5 flex items-baseline justify-between">
                  <h2 className="display text-4xl leading-none text-paper">Tickets</h2>
                  <span className="text-sm font-semibold text-volt">Available</span>
                </div>

                <div className="space-y-3" role="group" aria-label="Ticket tier">
                  {TICKET_TIERS.map(tier => {
                    const selected = selectedTier.id === tier.id;
                    return (
                      <button
                        type="button"
                        key={tier.id}
                        aria-pressed={selected}
                        onClick={() => setSelectedTier(tier)}
                        className={`relative w-full rounded-stock border py-4 pl-5 pr-4 text-left transition-colors ${
                          selected
                            ? 'border-volt bg-ink-950'
                            : 'border-ink-600 hover:border-ink-500 hover:bg-ink-700/50'
                        }`}
                      >
                        <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1.5 ${selected ? 'bg-volt' : 'bg-transparent'}`} />
                        <span className="flex items-baseline justify-between gap-3">
                          <span className="flex items-center gap-2 font-bold text-paper">
                            {tier.name}
                            {selected && <Check size={16} className="text-volt" aria-hidden="true" />}
                          </span>
                          <span className="font-display text-2xl font-black leading-none text-paper">
                            {inr(event.price * tier.price)}
                          </span>
                        </span>
                        <span className="mt-1.5 block text-sm leading-relaxed text-mute">{tier.benefits.join(', ')}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-ink-600 pt-5">
                  <span className="font-semibold text-paper">Quantity</span>
                  <div className="flex items-center">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-11 w-11 items-center justify-center rounded-stock border border-ink-600 text-paper transition-colors hover:border-paper disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ink-600"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-display text-3xl font-black leading-none text-paper" aria-live="polite">{quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      disabled={quantity >= 10}
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="flex h-11 w-11 items-center justify-center rounded-stock border border-ink-600 text-paper transition-colors hover:border-paper disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ink-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-5 flex items-baseline justify-between border-t border-ink-600 pt-5">
                  <span className="font-semibold text-paper">Total</span>
                  <span className="font-display text-5xl font-black leading-none text-paper">{inr(totalPrice)}</span>
                </div>

                <Button onClick={handlePurchase} fullWidth className="mt-6 py-4 text-xl">
                  Secure tickets
                </Button>
                <p className="mt-4 text-center text-xs text-mute">Demo checkout. No payment is taken.</p>
              </div>
            )}

            {paymentStep === 'payment' && (
              <div className="panel flex flex-col items-center justify-center gap-5 px-6 py-24" role="status">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-ink-600 border-t-volt" />
                <p className="font-semibold text-paper">Processing payment...</p>
              </div>
            )}

            {paymentStep === 'success' && (
              <div role="status">
                <h2 className="display text-poster-md text-volt">You're in!</h2>
                <p className="mb-6 mt-2 text-mute">
                  {userEmail ? `Receipt sent to ${userEmail}` : 'Your booking is confirmed.'}
                </p>

                <Ticket
                  title={event.title}
                  pass={`${quantity}x ${selectedTier.name}`}
                  poster={event.poster}
                  code={`EH-${event.id}0${quantity}${selectedTier.id.length}`}
                  facts={[
                    { label: 'Date', value: event.date },
                    { label: 'Doors', value: event.time },
                    { label: 'Venue', value: event.location },
                    { label: 'Paid', value: inr(totalPrice) },
                  ]}
                />

                <Button onClick={() => navigate('/')} variant="secondary" fullWidth className="mt-8">
                  Browse more events
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Fact = ({ label, value }: { label: string; value: string }) => (
  <div className="border-b border-ink-600 py-4 pr-4">
    <dt className="text-sm text-mute">{label}</dt>
    <dd className="mt-0.5 text-lg font-semibold leading-snug text-paper">{value}</dd>
  </div>
);

export default EventDetails;
