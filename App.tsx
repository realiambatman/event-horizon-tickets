import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Event } from './types';
import { MOCK_EVENTS } from './constants';
import { Twitter, Instagram, Linkedin, Lock, LogOut, User as UserIcon, Menu, X } from 'lucide-react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';

// Page Imports
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Admin from './pages/Admin';
import MyTickets from './pages/MyTickets';
import Moments from './pages/Moments';
import Profile from './pages/Profile';
import { AuthModal } from './components/AuthModal';
import ScrollToTop from './components/ScrollToTop';
import { Logo } from './components/UI';

interface User {
  name: string;
  email: string;
}

const RESTRICTED_PATHS = ['/tickets', '/admin', '/profile'];

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Restricted page the visitor asked for before signing in.
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  const isRestrictedRoute = RESTRICTED_PATHS.includes(location.pathname);

  // Prompt for sign-in when a restricted page is opened while signed out.
  // Keyed on the route only, so signing out does not reopen the prompt.
  useEffect(() => {
    if (!user && isRestrictedRoute) {
      setIsAuthModalOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (pendingPath) {
      navigate(pendingPath);
      setPendingPath(null);
    }
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPendingPath(null);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleRestrictedView = (path: string) => {
    setIsMobileMenuOpen(false);
    if (!user && RESTRICTED_PATHS.includes(path)) {
      setPendingPath(path);
      setIsAuthModalOpen(true);
      return;
    }
    navigate(path);
  };

  const navigateToEvent = (event: Event) => {
      navigate(`/event/${event.id}`);
  }

  const signInPrompt = (
    <div className="mx-auto flex max-w-md flex-col items-start py-12 md:py-20">
      <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-stock border border-ink-600 text-volt">
        <Lock size={24} aria-hidden="true" />
      </span>
      <h1 className="display text-poster-md text-paper">Sign in required</h1>
      <p className="mb-8 mt-3 text-lg text-mute">This page is for ticket holders. Sign in to open it.</p>
      <button type="button" onClick={() => setIsAuthModalOpen(true)} className="btn btn-primary">
        Sign in
      </button>
    </div>
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-stock focus:bg-volt focus:px-4 focus:py-2 focus:font-bold focus:text-ink-950"
      >
        Skip to content
      </a>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onLogin={handleLogin}
      />

      {/* Navigation */}
      <nav aria-label="Main" className="fixed top-0 z-50 w-full border-b border-ink-700 bg-ink-900/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4 px-5 md:px-8">
          <button
            type="button"
            aria-label="Event Horizon home"
            className="flex items-center gap-2.5"
            onClick={() => navigate('/')}
          >
            <Logo className="h-6 w-9" />
            <span className="display whitespace-nowrap text-2xl leading-none text-paper">Event Horizon</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden h-full items-stretch gap-1 md:flex">
            <NavLink active={isActive('/')} onClick={() => navigate('/')} label="Browse" />
            <NavLink active={isActive('/moments')} onClick={() => navigate('/moments')} label="Moments" />
            <NavLink active={isActive('/tickets')} onClick={() => handleRestrictedView('/tickets')} label="My Tickets" />
            <NavLink active={isActive('/admin')} onClick={() => handleRestrictedView('/admin')} label="Admin" />
          </div>

          {/* User Profile / Auth Button */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="group relative">
                <button
                  type="button"
                  aria-label="Account menu"
                  aria-haspopup="true"
                  className="flex items-center gap-2.5 rounded-stock py-1 pl-1 pr-1 text-left transition-colors hover:bg-ink-700 lg:pr-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-stock bg-coral font-display text-xl font-black text-ink-950">
                    {user.name.charAt(0)}
                  </span>
                  <span className="hidden whitespace-nowrap text-sm font-semibold text-paper lg:block">{user.name}</span>
                </button>
                {/* Dropdown Menu */}
                <div className="invisible absolute right-0 top-full z-50 w-48 pt-2 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="flex flex-col rounded-stock border border-ink-600 bg-ink-800 p-1 shadow-lift">
                    <button
                      type="button"
                      onClick={() => navigate('/profile')}
                      className="flex items-center gap-3 rounded-stock px-3 py-2.5 text-left text-sm font-medium text-paper transition-colors hover:bg-ink-700"
                    >
                      <UserIcon size={16} aria-hidden="true" /> My Profile
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-3 rounded-stock px-3 py-2.5 text-left text-sm font-medium text-coral transition-colors hover:bg-ink-700"
                    >
                      <LogOut size={16} aria-hidden="true" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="whitespace-nowrap rounded-stock bg-volt px-4 py-2 font-display text-lg font-extrabold uppercase leading-none tracking-wide text-ink-950 transition-colors hover:bg-paper"
              >
                Sign in
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              className="rounded-stock p-2 text-paper transition-colors hover:bg-ink-700 md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-ink-950/80"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[86vw] max-w-[320px] flex-col border-l border-ink-600 bg-ink-800 p-5"
            >
              <div className="mb-6 flex items-center justify-between">
                <Logo className="h-6 w-9" />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-stock p-2 text-paper transition-colors hover:bg-ink-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col">
                <MobileNavButton
                  label="Browse events"
                  active={isActive('/')}
                  onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}
                />
                <MobileNavButton
                  label="Moments"
                  active={isActive('/moments')}
                  onClick={() => { navigate('/moments'); setIsMobileMenuOpen(false); }}
                />
                <MobileNavButton
                  label="My tickets"
                  active={isActive('/tickets')}
                  onClick={() => handleRestrictedView('/tickets')}
                />
                <MobileNavButton
                  label="Admin dashboard"
                  active={isActive('/admin')}
                  onClick={() => handleRestrictedView('/admin')}
                />
              </div>

              {user && (
                <div className="mt-auto border-t border-ink-600 pt-5">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-stock bg-coral font-display text-xl font-black text-ink-950">
                      {user.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-paper">{user.name}</p>
                      <p className="truncate text-xs text-mute">{user.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}
                    className="mb-2 flex w-full items-center gap-3 rounded-stock border border-ink-600 px-4 py-3 text-sm font-semibold text-paper transition-colors hover:bg-ink-700"
                  >
                    <UserIcon size={18} aria-hidden="true" /> My Profile
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-stock border border-coral/50 px-4 py-3 text-sm font-semibold text-coral transition-colors hover:bg-coral hover:text-ink-950"
                  >
                    <LogOut size={18} aria-hidden="true" /> Sign Out
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main
        id="main"
        className={`relative flex-grow pt-16 ${isActive('/') ? '' : 'mx-auto w-full max-w-7xl px-5 pb-20 md:px-8 md:pb-28'}`}
      >
        <div key={location.pathname} className={isActive('/') ? 'w-full' : 'w-full pt-8 md:pt-14'}>
          <Routes location={location}>
            <Route path="/" element={<Home events={MOCK_EVENTS} onEventSelect={navigateToEvent} />} />
            <Route path="/event/:id" element={<EventDetails userEmail={user?.email} />} />
            <Route path="/moments" element={<Moments />} />
            <Route path="/tickets" element={user ? <MyTickets /> : signInPrompt} />
            <Route path="/admin" element={user ? <Admin /> : signInPrompt} />
            <Route path="/profile" element={user ? <Profile user={user} /> : signInPrompt} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      <Footer
        onNavigate={handleRestrictedView}
        onGetStarted={() => (user ? navigate('/') : setIsAuthModalOpen(true))}
        signedIn={Boolean(user)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ScrollToTop />
        <AppContent />
      </MotionConfig>
    </BrowserRouter>
  );
}

const NavLink = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
  <button
    type="button"
    onClick={onClick}
    aria-current={active ? 'page' : undefined}
    className={`relative whitespace-nowrap px-3 text-sm font-semibold transition-colors lg:px-4 ${
      active ? 'text-paper' : 'text-mute hover:text-paper'
    }`}
  >
    {label}
    <span
      aria-hidden="true"
      className={`absolute inset-x-3 bottom-0 h-1 bg-volt lg:inset-x-4 transition-transform duration-200 ease-snap ${
        active ? 'scale-x-100' : 'scale-x-0'
      }`}
    />
  </button>
);

const MobileNavButton = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
  <button
    type="button"
    onClick={onClick}
    aria-current={active ? 'page' : undefined}
    className={`display flex items-center gap-3 border-b border-ink-600 py-4 text-left text-4xl leading-none transition-colors ${
      active ? 'text-volt' : 'text-paper hover:text-volt'
    }`}
  >
    {label}
  </button>
);

const footerLink = 'text-paper-dim underline-offset-4 transition-colors hover:text-volt hover:underline';

const Footer = ({ onNavigate, onGetStarted, signedIn }: { onNavigate: (path: string) => void, onGetStarted: () => void, signedIn: boolean }) => {
  return (
    <footer className="relative overflow-hidden border-t border-ink-700 bg-ink-950">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 md:px-8 md:pt-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: CTA */}
          <div className="lg:col-span-2 lg:pr-12">
            <h2 className="display text-poster-md text-paper md:text-poster-lg">See you down the front</h2>
            <p className="mb-8 mt-4 max-w-sm leading-relaxed text-mute">
              Keep every ticket in one wallet and get through the door with a single scan.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <button type="button" onClick={onGetStarted} className="btn btn-primary">
                {signedIn ? 'Browse events' : 'Get started'}
              </button>
              <button type="button" className={`font-semibold ${footerLink}`}>
                Contact Sales
              </button>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-mute">Explore</h3>
              <ul className="space-y-2.5 font-medium">
                <li><button type="button" onClick={() => onNavigate('/')} className={footerLink}>Trending Events</button></li>
                <li><button type="button" onClick={() => onNavigate('/')} className={footerLink}>Categories</button></li>
                <li><button type="button" onClick={() => onNavigate('/')} className={footerLink}>New Arrivals</button></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-mute">Platform</h3>
              <ul className="space-y-2.5 font-medium">
                <li><button type="button" onClick={() => onNavigate('/admin')} className={footerLink}>Organizer Dashboard</button></li>
                <li><button type="button" onClick={() => onNavigate('/tickets')} className={footerLink}>My Wallet</button></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Social & Legal */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-mute">Follow us</h3>
              <div className="flex gap-3">
                <SocialLink label="Twitter" icon={<Twitter size={18} />} />
                <SocialLink label="Instagram" icon={<Instagram size={18} />} />
                <SocialLink label="LinkedIn" icon={<Linkedin size={18} />} />
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-mute">Legal</h3>
              <ul className="space-y-2.5 text-sm font-medium">
                <li><a href="#" className={footerLink}>Privacy Policy</a></li>
                <li><a href="#" className={footerLink}>Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-ink-700 pt-6 text-sm text-mute md:flex-row">
          <p>© 2025 Event Horizon Inc. Mumbai, Bangalore, Delhi</p>
          <p>A demo. No real tickets are sold here.</p>
        </div>
      </div>

      {/* Wordmark, cropped by the bottom edge like a pasted-up bill. */}
      <p
        aria-hidden="true"
        className="display pointer-events-none -mb-[0.19em] select-none whitespace-nowrap text-center text-[16.5vw] leading-[0.8] text-ink-700"
      >
        Event Horizon
      </p>
    </footer>
  );
};

const SocialLink = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <a
    href="#"
    aria-label={label}
    className="flex h-10 w-10 items-center justify-center rounded-stock border border-ink-600 text-paper transition-colors hover:border-volt hover:bg-volt hover:text-ink-950"
  >
    {icon}
  </a>
);
