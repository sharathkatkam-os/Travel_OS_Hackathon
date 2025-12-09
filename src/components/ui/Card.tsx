import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        backdrop-blur-lg bg-white/70
        rounded-2xl shadow-xl
        border border-white/40
        transition-all duration-300
        hover:shadow-2xl hover:scale-[1.02]
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}