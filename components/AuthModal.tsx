import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { Logo } from './UI';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: name || 'Demo User',
        email: email
      });
      onClose();
    }, 1500);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: 'Alex Morgan',
        email: 'alex@eventhorizon.live'
      });
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/85"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative max-h-[100dvh] w-full overflow-y-auto border-t-4 border-volt bg-ink-800 shadow-lift sm:max-w-md sm:rounded-stock"
          >
            <div className="flex items-start justify-between gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
              <div>
                <Logo className="mb-4 h-7 w-10" />
                <h2 id="auth-title" className="display text-5xl leading-[0.88] text-paper">
                  {isSignIn ? 'Welcome back' : 'Join Event Horizon'}
                </h2>
                <p className="mt-2 text-mute">
                  {isSignIn ? 'Sign in to see your tickets and bookings.' : 'Create an account to book events and keep your tickets.'}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="-mr-2 -mt-2 rounded-stock p-2 text-mute transition-colors hover:bg-ink-700 hover:text-paper"
              >
                <X size={22} />
              </button>
            </div>

            <div className="px-6 pb-6 pt-6 sm:px-8 sm:pb-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isSignIn && (
                  <div>
                    <label htmlFor="auth-name" className="field-label">Full name</label>
                    <input
                      id="auth-name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="field"
                      required
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="auth-email" className="field-label">Email address</label>
                  <input
                    id="auth-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="field"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="auth-password" className="field-label">Password</label>
                  <input
                    id="auth-password"
                    type="password"
                    autoComplete={isSignIn ? 'current-password' : 'new-password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="field"
                    required
                  />
                </div>

                <button type="submit" disabled={isLoading} className="btn btn-primary !mt-6 w-full py-4 text-xl">
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} aria-hidden="true" />
                      <span>Signing in</span>
                    </>
                  ) : isSignIn ? 'Sign in' : 'Create account'}
                </button>
              </form>

              <div className="my-6 flex items-center gap-4 text-sm text-mute">
                <div className="h-px flex-1 bg-ink-600" />
                <span>or</span>
                <div className="h-px flex-1 bg-ink-600" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={handleDemoLogin} disabled={isLoading} className="btn btn-secondary w-full">
                  Demo login
                </button>
                <button type="button" onClick={handleDemoLogin} disabled={isLoading} className="btn btn-secondary w-full">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-mute">
                {isSignIn ? "Don't have an account?" : 'Already have an account?'}
                <button
                  type="button"
                  onClick={() => setIsSignIn(!isSignIn)}
                  className="ml-2 font-bold text-volt underline-offset-4 hover:underline"
                >
                  {isSignIn ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
