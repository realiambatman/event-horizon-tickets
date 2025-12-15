import React, { useState } from 'react';
import { ViewState, Event } from './types';
import { MOCK_EVENTS } from './constants';
import { LayoutGrid, Ticket, Settings, Twitter, Instagram, Linkedin, Facebook, ArrowRight, Mail, LogOut, User as UserIcon, Camera } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

// Page Imports
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Admin from './pages/Admin';
import MyTickets from './pages/MyTickets';
import Moments from './pages/Moments';
import Profile from './pages/Profile';
import { AuthModal } from './components/AuthModal';

interface User {
  name: string;
  email: string;
}

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const navigateToEvent = (event: Event) => {
    setSelectedEvent(event);
    setView(ViewState.EVENT_DETAILS);
  };

  const goBack = () => {
    setView(ViewState.HOME);
    setSelectedEvent(null);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setView(ViewState.HOME);
  };

  const handleRestrictedView = (targetView: ViewState) => {
    if (!user && (targetView === ViewState.MY_TICKETS || targetView === ViewState.ADMIN || targetView === ViewState.PROFILE)) {
      setIsAuthModalOpen(true);
      return;
    }
    setView(targetView);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 transition-all duration-300">
        <div className="max-w-screen-2xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setView(ViewState.HOME)}>
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold font-display text-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              E
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900">Event<span className="text-indigo-600">Horizon</span></span>
          </div>

          <div className="flex gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <NavIcon icon={<LayoutGrid size={18} />} active={view === ViewState.HOME} onClick={() => setView(ViewState.HOME)} label="Browse" />
            <NavIcon icon={<Camera size={18} />} active={view === ViewState.MOMENTS} onClick={() => setView(ViewState.MOMENTS)} label="Moments" />
            <NavIcon icon={<Ticket size={18} />} active={view === ViewState.MY_TICKETS} onClick={() => handleRestrictedView(ViewState.MY_TICKETS)} label="My Tickets" />
            <NavIcon icon={<Settings size={18} />} active={view === ViewState.ADMIN} onClick={() => handleRestrictedView(ViewState.ADMIN)} label="Admin" />
          </div>

          {/* User Profile / Auth Button */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                 <div className="text-right hidden md:block">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Welcome</p>
                    <p className="text-sm font-bold text-slate-900">{user.name}</p>
                 </div>
                 <div className="relative group">
                    <button className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold border border-indigo-200">
                      {user.name.charAt(0)}
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute top-12 right-0 w-48 bg-white border border-slate-200 shadow-xl rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col gap-1 z-50 transform origin-top-right">
                      <button 
                        onClick={() => setView(ViewState.PROFILE)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors text-sm font-medium text-left"
                      >
                        <UserIcon size={16} /> My Profile
                      </button>
                      <div className="h-px bg-slate-100 my-1" />
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors text-sm font-medium text-left"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                 </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className={`relative pt-20 flex-grow ${view === ViewState.HOME ? '' : 'max-w-7xl mx-auto w-full px-6 md:px-8 py-28'}`}>
        <AnimatePresence mode="wait">
          {view === ViewState.HOME && (
            <Home key="home" events={MOCK_EVENTS} onEventSelect={navigateToEvent} />
          )}
          
          {view === ViewState.EVENT_DETAILS && selectedEvent && (
            <EventDetails key="details" event={selectedEvent} onBack={goBack} />
          )}

          {view === ViewState.MOMENTS && (
            <Moments key="moments" />
          )}

          {view === ViewState.MY_TICKETS && (
            <MyTickets key="tickets" />
          )}

          {view === ViewState.ADMIN && (
            <Admin key="admin" />
          )}

          {view === ViewState.PROFILE && (
            <Profile key="profile" user={user} />
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer (Unique Swiss Style) */}
      <Footer onViewChange={setView} />
    </div>
  );
}

const NavIcon = ({ icon, active, onClick, label }: { icon: React.ReactNode, active: boolean, onClick: () => void, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
      active 
        ? 'bg-white text-slate-900 shadow-sm ring-1 ring-black/5' 
        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
    }`}
  >
    {icon}
    <span className="hidden md:inline">{label}</span>
  </button>
);

const Footer = ({ onViewChange }: { onViewChange: (view: ViewState) => void }) => {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-indigo-600 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Massive Typography */}
        <div className="mb-24 border-b border-white/10 pb-12">
           <h2 className="text-[12vw] leading-[0.8] font-display font-bold tracking-tighter text-transparent stroke-text-white opacity-30 select-none">
             DIGITAL
           </h2>
           <h2 className="text-[12vw] leading-[0.8] font-display font-bold tracking-tighter text-white pl-20 lg:pl-40">
             HORIZON
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
           
           {/* Column 1: CTA */}
           <div className="lg:col-span-2 pr-8">
              <h3 className="text-3xl font-display font-bold mb-6">Ready to Experience?</h3>
              <p className="text-slate-400 mb-8 max-w-sm leading-relaxed">
                 Join the platform that is redefining live entertainment. Get early access to the most exclusive events in your city.
              </p>
              <div className="flex gap-4 items-center">
                 <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-500 hover:text-white transition-all">
                    Get Started
                 </button>
                 <span className="text-sm font-medium text-slate-500">or</span>
                 <button className="text-white hover:text-indigo-400 transition-colors font-medium border-b border-white/20 pb-0.5 hover:border-indigo-400">
                    Contact Sales
                 </button>
              </div>
           </div>

           {/* Column 2: Links */}
           <div className="space-y-8">
              <div>
                 <h4 className="font-mono text-xs text-indigo-400 uppercase tracking-widest mb-4">Explore</h4>
                 <ul className="space-y-3 font-medium text-slate-300">
                    <li><button onClick={() => onViewChange(ViewState.HOME)} className="hover:text-white hover:translate-x-1 transition-all">Trending Events</button></li>
                    <li><button onClick={() => onViewChange(ViewState.HOME)} className="hover:text-white hover:translate-x-1 transition-all">Categories</button></li>
                    <li><button onClick={() => onViewChange(ViewState.HOME)} className="hover:text-white hover:translate-x-1 transition-all">New Arrivals</button></li>
                 </ul>
              </div>
              <div>
                 <h4 className="font-mono text-xs text-indigo-400 uppercase tracking-widest mb-4">Platform</h4>
                 <ul className="space-y-3 font-medium text-slate-300">
                    <li><button onClick={() => onViewChange(ViewState.ADMIN)} className="hover:text-white hover:translate-x-1 transition-all">Organizer Dashboard</button></li>
                    <li><button onClick={() => onViewChange(ViewState.MY_TICKETS)} className="hover:text-white hover:translate-x-1 transition-all">My Wallet</button></li>
                 </ul>
              </div>
           </div>

           {/* Column 3: Social & Legal */}
           <div className="space-y-8">
               <div>
                  <h4 className="font-mono text-xs text-indigo-400 uppercase tracking-widest mb-4">Follow Us</h4>
                  <div className="flex gap-4">
                     <SocialLink icon={<Twitter size={18} />} />
                     <SocialLink icon={<Instagram size={18} />} />
                     <SocialLink icon={<Linkedin size={18} />} />
                  </div>
               </div>
               <div>
                 <h4 className="font-mono text-xs text-indigo-400 uppercase tracking-widest mb-4">Legal</h4>
                 <ul className="space-y-3 font-medium text-slate-400 text-sm">
                    <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                 </ul>
               </div>
           </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-mono">
           <p>© 2025 Event Horizon Inc. Mumbai • Bangalore • Delhi</p>
           <p>Designed for the Future</p>
        </div>
      </div>
      
      <style>{`
        .stroke-text-white {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
        }
      `}</style>
    </footer>
  );
};

const SocialLink = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all duration-300">
    {icon}
  </a>
);