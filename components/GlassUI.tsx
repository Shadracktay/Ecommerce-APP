import React from 'react';
import { X } from 'lucide-react';

// --- Card ---
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div
      className={`
        bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl 
        ${hoverEffect ? 'transition-transform duration-300 hover:-translate-y-1 hover:bg-white/15' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// --- Button ---
interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/30 border border-white/10",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm",
    danger: "bg-red-500/80 hover:bg-red-500 text-white shadow-lg shadow-red-500/30 border border-white/10",
    ghost: "bg-transparent hover:bg-white/5 text-gray-300 hover:text-white"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

// --- Input ---
interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const GlassInput: React.FC<GlassInputProps> = ({ label, icon, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-xs font-medium text-gray-300 ml-1">{label}</label>}
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full bg-white/5 border border-white/10 rounded-xl 
            ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 
            text-white placeholder-gray-500 outline-none
            focus:border-indigo-400/50 focus:bg-white/10 transition-all duration-300
          `}
          {...props}
        />
      </div>
    </div>
  );
};

// --- Select ---
interface GlassSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const GlassSelect: React.FC<GlassSelectProps> = ({ label, options, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-xs font-medium text-gray-300 ml-1">{label}</label>}
      <div className="relative group">
        <select
          className={`
            w-full bg-white/5 border border-white/10 rounded-xl 
            px-4 py-2.5 
            text-white placeholder-gray-500 outline-none appearance-none
            focus:border-indigo-400/50 focus:bg-white/10 transition-all duration-300
            cursor-pointer
          `}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-slate-800 text-white">{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    </div>
  );
};

// --- Modal ---
interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const GlassModal: React.FC<GlassModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg animate-in fade-in zoom-in-95 duration-300">
        <GlassCard className="overflow-hidden border-white/20 shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode; color?: 'green' | 'blue' | 'yellow' | 'red' }> = ({ children, color = 'blue' }) => {
  const colors = {
    green: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    yellow: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    red: "bg-red-500/20 text-red-300 border-red-500/30",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
};
