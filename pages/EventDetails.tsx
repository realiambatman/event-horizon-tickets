import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Event, TicketTier } from '../types';
import { TICKET_TIERS } from '../constants';
import { Card, Button, Badge } from '../components/UI';
import { ArrowLeft, Clock, MapPin, Users, CheckCircle, Download, CreditCard, Ticket, IndianRupee } from 'lucide-react';
import { generateEventHype } from '../services/geminiService';

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack }) => {
  const [hypeText, setHypeText] = useState<string>('Loading description...');
  const [selectedTier, setSelectedTier] = useState<TicketTier>(TICKET_TIERS[0]);
  const [quantity, setQuantity] = useState(1);
  const [paymentStep, setPaymentStep] = useState<'select' | 'payment' | 'success'>('select');

  useEffect(() => {
    let isMounted = true;
    generateEventHype(event.title, event.description).then(text => {
      if (isMounted) setHypeText(text);
    });
    return () => { isMounted = false; };
  }, [event]);

  const totalPrice = event.price * selectedTier.price * quantity;

  const handlePurchase = () => {
    setPaymentStep('payment');
    setTimeout(() => {
      setPaymentStep('success');
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 lg:px-0"
    >
      <div className="mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group">
          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
            <ArrowLeft size={14} />
          </div>
          <span className="text-sm font-medium">Back to Events</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left: Visuals & Info */}
        <div className="lg:col-span-8 space-y-12">
          {/* Header */}
          <div>
            <div className="flex gap-2 mb-6">
              {event.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full border border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-600">{tag}</span>
              ))}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 tracking-tight leading-[1] mb-6">{event.title}</h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-2xl">{hypeText}</p>
          </div>

          {/* Hero Image */}
          <motion.div 
            layoutId={`image-${event.id}`}
            className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl"
          >
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          </motion.div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-slate-200">
             <div className="space-y-6">
                <div className="flex items-start gap-4">
                   <div className="bg-slate-50 p-3 rounded-xl"><Clock className="text-indigo-600" size={24} /></div>
                   <div>
                     <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Date & Time</p>
                     <p className="text-lg font-medium text-slate-900">{event.date}</p>
                     <p className="text-slate-500">{event.time} Onwards</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="bg-slate-50 p-3 rounded-xl"><MapPin className="text-indigo-600" size={24} /></div>
                   <div>
                     <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Location</p>
                     <p className="text-lg font-medium text-slate-900">{event.location}</p>
                     <p className="text-slate-500">Get Directions</p>
                   </div>
                </div>
             </div>
             
             <div className="prose prose-lg prose-slate">
                <p>
                  Experience the ultimate {event.category.toLowerCase()} event of the year. 
                  Curated by <strong>{event.organizer}</strong>, this event promises to be an immersive journey 
                  unlike anything you've seen before.
                </p>
             </div>
          </div>
        </div>

        {/* Right: Booking Panel */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-24">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
              {paymentStep === 'select' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-baseline">
                    <h2 className="text-2xl font-display font-bold text-slate-900">Tickets</h2>
                    <span className="text-emerald-600 text-sm font-bold bg-emerald-50 px-2 py-1 rounded">Available</span>
                  </div>
                  
                  <div className="space-y-4">
                    {TICKET_TIERS.map(tier => (
                      <div 
                        key={tier.id}
                        onClick={() => setSelectedTier(tier)}
                        className={`group relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedTier.id === tier.id 
                            ? 'bg-slate-50 border-indigo-600' 
                            : 'bg-white border-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className={`font-bold ${selectedTier.id === tier.id ? 'text-indigo-900' : 'text-slate-900'}`}>{tier.name}</span>
                          <span className="font-display font-bold text-lg text-slate-900">
                             ₹{(event.price * tier.price).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">{tier.benefits.join(" • ")}</p>
                        
                        {selectedTier.id === tier.id && (
                          <div className="absolute -right-2 -top-2 bg-indigo-600 text-white p-1 rounded-full">
                            <CheckCircle size={14} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between py-4 border-t border-slate-100">
                    <span className="font-medium text-slate-700">Quantity</span>
                    <div className="flex items-center gap-4 bg-slate-50 rounded-full p-1">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-indigo-600">-</button>
                      <span className="font-bold w-4 text-center text-slate-900">{quantity}</span>
                      <button onClick={() => setQuantity(Math.min(10, quantity + 1))} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-indigo-600">+</button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xl font-bold text-slate-900">
                      <span>Total</span>
                      <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                    </div>

                    <Button onClick={handlePurchase} fullWidth className="py-4 text-lg rounded-xl bg-slate-900 hover:bg-indigo-600">
                      Secure Tickets
                    </Button>
                  </div>
                </div>
              )}

              {paymentStep === 'payment' && (
                <div className="flex flex-col items-center justify-center py-20 space-y-6">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <CreditCard className="text-slate-300" size={20} />
                    </div>
                  </div>
                  <p className="text-slate-500 font-medium">Processing payment...</p>
                </div>
              )}

              {paymentStep === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-8"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle size={40} />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">You're In!</h3>
                    <p className="text-slate-500">Receipt sent to email@example.com</p>
                  </div>

                  <div className="relative bg-slate-900 p-6 rounded-2xl text-left overflow-hidden group">
                     <div className="absolute top-0 right-0 p-32 bg-indigo-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                     <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                           <div>
                              <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Event</p>
                              <p className="text-white font-bold">{event.title}</p>
                           </div>
                           <Ticket className="text-indigo-400" />
                        </div>
                        <div className="flex gap-4">
                           <div>
                              <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Tickets</p>
                              <p className="text-white font-mono">{quantity}x {selectedTier.name}</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <Button onClick={() => onBack()} variant="secondary" fullWidth className="py-4">
                     <Download size={18} className="inline mr-2" /> Download Ticket
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventDetails;