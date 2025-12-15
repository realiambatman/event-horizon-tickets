import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, noPadding = false }) => (
  <motion.div
    onClick={onClick}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`bg-white border border-slate-200 rounded-xl shadow-card hover:shadow-soft transition-all duration-300 ${noPadding ? '' : 'p-6'} ${className}`}
  >
    {children}
  </motion.div>
);

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  fullWidth = false
}) => {
  const baseStyle = "px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    // Updated primary to be Black (slate-900) instead of Blue
    primary: "bg-slate-900 text-white hover:bg-indigo-600 shadow-sm hover:shadow-md disabled:bg-slate-300",
    secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-sm",
    danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100",
    ghost: "bg-transparent text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'default' | 'outline' | 'success';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  const styles = {
    default: "bg-slate-100 text-slate-600",
    outline: "border border-slate-200 text-slate-500 bg-transparent",
    success: "bg-emerald-100 text-emerald-700",
  }
  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wide font-semibold ${styles[variant]}`}>
      {children}
    </span>
  );
};