import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Calendar, Clock, MapPin, X, Share2, Download, Maximize2 } from 'lucide-react';
import { MOCK_EVENTS } from '../constants';
import { Button } from '../components/UI';

// Mocking ticket specific data based on events
const TICKETS = MOCK_EVENTS.map((event, index) => ({
  ...event,
  ticketId: `TX-${9822 + index}-${event.id}`,
  seat: index % 2 === 0 ? 'VIP Lounge, Row A' : 'General Access',
  status: index === 0 ? 'active' : 'upcoming'
}));

type TicketType = typeof TICKETS[0];

const MyTickets = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);

  // Filter logic (mocking past events for demo)
  const displayedTickets = activeTab === 'upcoming' ? TICKETS : [];

  return (
    <div className="w-full max-w-7xl mx-auto">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
           <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 tracking-tight">
             MY WALLET
           </h1>
           <p className="text-slate-500 mt-2 text-lg">Manage your access passes and entry codes.</p>
        </div>
        
        {/* Toggle Tabs */}
        <div className="bg-white p-1 rounded-xl border border-slate-200 flex shadow-sm">
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

      {/* --- TICKET CAROUSEL --- */}
      <div className="relative min-h-[500px]">
         {displayedTickets.length > 0 ? (
            <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar px-4 lg:px-0">
               {displayedTickets.map((ticket, idx) => (
                  <TicketCard 
                    key={ticket.id} 
                    ticket={ticket} 
                    index={idx} 
                    onExpand={() => setSelectedTicket(ticket)}
                  />
               ))}
               {/* Spacer for scroll */}
               <div className="w-8 shrink-0" /> 
            </div>
         ) : (
            <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="text-slate-400" />
               </div>
               <p className="text-slate-500 font-medium">No past events found.</p>
            </div>
         )}
      </div>

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
    onClick={onClick}
    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
      active ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    {label}
    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-500'}`}>
      {count}
    </span>
  </button>
);

const TicketCard: React.FC<{ ticket: TicketType, index: number, onExpand: () => void }> = ({ ticket, index, onExpand }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="snap-center shrink-0 w-full max-w-[360px] md:max-w-[400px] group cursor-pointer"
      onClick={onExpand}
    >
      <div className="relative bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 group-hover:-translate-y-2">
         
         {/* Holographic / Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-50" />

         {/* Image Section */}
         <div className="relative h-48">
            <img src={ticket.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt="Event" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
               {ticket.seat.includes('VIP') ? 'VIP Pass' : 'Standard'}
            </div>
         </div>

         {/* Info Section */}
         <div className="px-8 pb-8 pt-2 relative">
            <h3 className="text-2xl font-display font-bold leading-tight mb-4">{ticket.title}</h3>
            
            <div className="space-y-3 mb-8">
               <div className="flex items-center gap-3 text-slate-300">
                  <Calendar size={16} />
                  <span className="font-medium">{ticket.date}</span>
                  <span className="w-1 h-1 bg-slate-500 rounded-full" />
                  <Clock size={16} />
                  <span className="font-medium">{ticket.time}</span>
               </div>
               <div className="flex items-center gap-3 text-slate-300">
                  <MapPin size={16} />
                  <span className="text-sm truncate">{ticket.location}</span>
               </div>
            </div>

            {/* Perforation Line (Visual Trick) */}
            <div className="absolute left-0 right-0 bottom-24 flex items-center justify-between">
               <div className="w-4 h-8 bg-slate-50 rounded-r-full" />
               <div className="flex-1 border-b-2 border-dashed border-slate-700 mx-2 opacity-30" />
               <div className="w-4 h-8 bg-slate-50 rounded-l-full" />
            </div>

            {/* Bottom Bar */}
            <div className="pt-6 flex justify-between items-end">
               <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Entry Code</p>
                  <p className="font-mono text-xl tracking-wider text-indigo-400">{ticket.ticketId.split('-')[1]}</p>
               </div>
               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <QrCode className="text-slate-900" size={24} />
               </div>
            </div>
         </div>
      </div>
      
      {/* Reflection/Shadow underneath */}
      <div className="mx-4 h-4 bg-slate-900/10 rounded-full blur-xl -mt-2" />
    </motion.div>
  );
};

const TicketModal: React.FC<{ ticket: TicketType, onClose: () => void }> = ({ ticket, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
       {/* Backdrop */}
       <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         onClick={onClose}
         className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
       />

       {/* Modal Content */}
       <motion.div 
         initial={{ opacity: 0, scale: 0.9, y: 50 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         exit={{ opacity: 0, scale: 0.9, y: 50 }}
         className="relative w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
       >
          <div className="bg-slate-900 p-8 text-white text-center relative overflow-hidden">
             <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <X size={20} />
             </button>
             
             <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.2 }}
             >
                <h3 className="font-display font-bold text-2xl mb-2">{ticket.title}</h3>
                <p className="text-indigo-300 font-mono text-sm uppercase tracking-widest mb-6">Scan for Entry</p>
                
                <div className="inline-block p-1 bg-white rounded-xl">
                   <div className="bg-white p-4 rounded-lg">
                      {/* Simulated Large QR */}
                      <QrCode size={200} className="text-slate-900" />
                   </div>
                </div>
                <p className="font-mono text-lg mt-4 tracking-widest">{ticket.ticketId}</p>
             </motion.div>
          </div>

          <div className="p-8 bg-slate-50">
             <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Date</p>
                   <p className="font-bold text-slate-900">{ticket.date}</p>
                   <p className="text-sm text-slate-500">{ticket.time}</p>
                </div>
                <div>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Seat</p>
                   <p className="font-bold text-slate-900">{ticket.seat}</p>
                </div>
                <div className="col-span-2">
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Venue</p>
                   <p className="font-bold text-slate-900">{ticket.location}</p>
                </div>
             </div>

             <div className="flex gap-4">
                <Button variant="secondary" fullWidth>
                   <Share2 size={18} /> Share
                </Button>
                <Button fullWidth>
                   <Download size={18} /> Save to Photos
                </Button>
             </div>
          </div>
       </motion.div>
    </div>
  );
}

export default MyTickets;