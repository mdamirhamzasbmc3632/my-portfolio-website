import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  }[size];

  return (
    <div
      className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#0a1118] to-[#06090e] border-2 border-sky-400/60 shadow-[0_0_20px_rgba(56,189,248,0.3)] group-hover:border-cyan-300 group-hover:shadow-[0_0_28px_rgba(56,189,248,0.55)] transition-all duration-300 select-none shrink-0 overflow-hidden ${sizeClasses} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-[#10b981]/25 via-transparent to-[#38bdf8]/30 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center justify-center font-black tracking-tight leading-none">
        <span className="bg-gradient-to-r from-[#34d399] via-[#22d3ee] to-[#38bdf8] bg-clip-text text-transparent font-black tracking-tighter drop-shadow-sm">
          AH
        </span>
        <span className="text-[7px] text-cyan-300/80 font-bold uppercase tracking-widest -mt-0.5">
          MEDIA
        </span>
      </div>
    </div>
  );
};
