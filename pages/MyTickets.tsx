import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Download } from 'lucide-react';
import { MOCK_EVENTS } from '../constants';
import { Button } from '../components/UI';
import { Ticket, QrMotif } from '../components/Ticket';

// Mocking ticket specific data based on events
const TICKETS = MOCK_EVENTS.map((event, index) => ({
  ...event,
  ticketId: `TX-${9822 + index}-${event.id}`,
  seat: index % 2 === 0 ? 'VIP Lounge, Row A' : 'General Access',
  status: index === 0 ? 'active' : 'upcoming'
}));

type TicketType = typeof TICKETS[0];

const passName = (ticket: TicketType) => (ticket.seat.includes('VIP') ? 'VIP pass' : 'Standard pass');

const MyTickets = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);

  // Filter logic (mocking past events for demo)
  const displayedTickets = activeTab === 'upcoming' ? TICKETS : [];

  return (
    <div className="mx-auto w-full max-w-5xl">

      {/* --- HEADER --- */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
        <div>
          <h1 className="display text-poster-lg text-paper md:text-poster-xl">My wallet</h1>
          <p className="mt-3 text-lg text-mute">Manage your access passes and entry codes.</p>
        </div>

        <div role="tablist" aria-label="Tickets" className="flex self-start rounded-stock border border-ink-600 p-1 md:self-auto">
          <TabButton
            active={activeTab === 'upcoming'}
            onClick={() => setActiveTab('upcoming')}
            label="Upcoming"
            count={TICKETS.length}
          />
          <TabButton
            active={activeTab === 'past'}
            onClick={() => setActiveTab('past')}
            label="History"
            count={0}
          />
        </div>
      </div>

      {/* --- TICKETS --- */}
      {displayedTickets.length > 0 ? (
        <ul className="space-y-8">
          {displayedTickets.map((ticket) => (
            <li key={ticket.id}>
              <button
                type="button"
                onClick={() => setSelectedTicket(ticket)}
                aria-label={`${ticket.title}, ${ticket.date}. Show entry code`}
                className="block w-full rounded-stock text-left transition-transform duration-200 ease-snap hover:-translate-y-1 hover:-rotate-[0.4deg]"
              >
                <Ticket
                  wide
                  title={ticket.title}
                  pass={ticket.status === 'active' ? `${passName(ticket)}, next up` : passName(ticket)}
                  poster={ticket.poster}
                  code={ticket.ticketId.split('-')[1]}
                  facts={[
                    { label: 'Date', value: ticket.date },
                    { label: 'Doors', value: ticket.time },
                    { label: 'Venue', value: ticket.location },
                    { label: 'Seat', value: ticket.seat },
                  ]}
                />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-start rounded-md border border-dashed border-ink-600 px-6 py-14 md:px-10">
          <p className="display text-poster-sm text-paper">No past events yet</p>
          <p className="mt-2 text-mute">Tickets move here once the event is over.</p>
          <button type="button" onClick={() => setActiveTab('upcoming')} className="btn btn-secondary mt-6">
            Show upcoming
          </button>
        </div>
      )}

      {/* --- QR SCAN MODAL --- */}
      <AnimatePresence>
        {selectedTicket && (
          <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- SUBCOMPONENTS ---

const TabButton: React.FC<{ active: boolean, onClick: () => void, label: string, count: number }> = ({ active, onClick, label, count }) => (
  <button
    type="button"
    role="tab"
    aria-selected={active}
    onClick={onClick}
    className={`flex items-center gap-2 rounded-stock px-5 py-2.5 text-sm font-semibold transition-colors ${
      active ? 'bg-paper text-ink-950' : 'text-mute hover:text-paper'
    }`}
  >
    {label}
    <span className={`rounded-full px-1.5 text-xs font-bold tabular-nums ${active ? 'bg-ink-950 text-paper' : 'bg-ink-700 text-paper-dim'}`}>
      {count}
    </span>
  </button>
);

const TicketModal: React.FC<{ ticket: TicketType, onClose: () => void }> = ({ ticket, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/90"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-modal-title"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative max-h-[100dvh] w-full overflow-y-auto bg-ink-800 sm:max-w-md sm:rounded-stock"
      >
        <div className="on-paper bg-paper px-6 pb-6 pt-5 text-center text-ink-950">
          <div className="flex items-start justify-between gap-4 text-left">
            <div>
              <p className="text-sm font-bold text-coral-deep">Scan for entry</p>
              <h3 id="ticket-modal-title" className="display mt-1 text-4xl leading-[0.88]">{ticket.title}</h3>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="-mr-2 -mt-1 rounded-stock p-2 text-ink-950 transition-colors hover:bg-paper-dim"
            >
              <X size={22} />
            </button>
          </div>

          <QrMotif code={ticket.ticketId} className="mx-auto mt-5 h-52 w-52 text-ink-950 sm:h-56 sm:w-56" />
          <p className="mt-3 font-display text-2xl font-black tracking-widest">{ticket.ticketId}</p>
        </div>

        <span aria-hidden="true" className="perf-x block text-paper/50" />

        <div className="p-6">
          <dl className="mb-6 grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <dt className="text-sm text-mute">Date</dt>
              <dd className="font-semibold text-paper">{ticket.date}, {ticket.time}</dd>
            </div>
            <div>
              <dt className="text-sm text-mute">Seat</dt>
              <dd className="font-semibold text-paper">{ticket.seat}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-sm text-mute">Venue</dt>
              <dd className="font-semibold text-paper">{ticket.location}</dd>
            </div>
          </dl>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" fullWidth>
              <Share2 size={18} aria-hidden="true" /> Share
            </Button>
            <Button fullWidth>
              <Download size={18} aria-hidden="true" /> Save
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default MyTickets;
