import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false }) => (
  <div className={`panel ${noPadding ? '' : 'p-5 md:p-6'} ${className}`}>{children}</div>
);

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  fullWidth = false,
  type = 'button',
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    ghost: 'btn-ghost',
  };
  return (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`btn ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
  >
    {children}
  </button>
  );
};

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'default' | 'outline' | 'hot';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  const styles = {
    default: 'bg-ink-700 text-paper',
    outline: 'border border-ink-500 text-paper-dim',
    hot: 'bg-coral text-ink-950',
  };
  return (
    <span className={`inline-block rounded-stock px-2 py-0.5 text-xs font-semibold ${styles[variant]}`}>
      {children}
    </span>
  );
};

/** The mark: a sun on the horizon line. */
export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 40 28" className={className} aria-hidden="true" focusable="false">
    <path d="M6 18a14 14 0 0 1 28 0z" fill="#ffe81a" />
    <rect x="0" y="21" width="40" height="5" fill="#ff5a4e" />
  </svg>
);
