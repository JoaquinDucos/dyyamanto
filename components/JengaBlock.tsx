
import React from 'react';

interface JengaBlockProps {
  type: 'value' | 'practice' | 'result' | 'displaced' | 'danger';
  label?: string;
  stability?: number; // 0 to 100
  index?: number;
  isFalling?: boolean;
  trajectory?: { x: number; y: number; r: number }; // New physics prop
}

const JengaBlock: React.FC<JengaBlockProps> = ({ type, label, stability = 100, index = 0, isFalling = false, trajectory }) => {
  let colorClass = '';
  
  switch (type) {
    case 'value': // Base (Purple/Dark)
      colorClass = 'bg-slate-800 text-slate-200 border-slate-900 ring-1 ring-slate-700';
      break;
    case 'practice': // Middle (Indigo)
      colorClass = 'bg-indigo-600 text-indigo-100 border-indigo-800 ring-1 ring-indigo-500';
      break;
    case 'result': // Top (Teal)
      colorClass = 'bg-emerald-500 text-emerald-900 border-emerald-700 ring-1 ring-emerald-400';
      break;
    case 'displaced': // Loose (Orange)
      colorClass = 'bg-amber-500 text-amber-900 border-amber-700 ring-1 ring-amber-400';
      break;
    case 'danger': // Red/Warning
      colorClass = 'bg-rose-600 text-white border-rose-800 animate-pulse ring-1 ring-rose-500';
      break;
  }

  // Calculate simulated "physics" offset based on stability
  const chaosFactor = (100 - stability) / 100;
  
  // Random shift for visual effect while standing
  const randomShift = index % 2 === 0 ? chaosFactor * 12 : -chaosFactor * 12;
  const randomRot = index % 3 === 0 ? chaosFactor * 4 : -chaosFactor * 4;

  // Collapse Physics
  const fallStyle = isFalling && trajectory ? {
      transform: `translate(${trajectory.x}px, ${trajectory.y}px) rotate(${trajectory.r}deg)`,
      opacity: 0,
      transition: 'all 0.8s ease-in'
  } : {
      transform: stability < 60 ? `translateX(${randomShift}px) rotate(${randomRot}deg)` : 'none',
      animation: stability < 30 ? 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both infinite' : 'none',
  };

  return (
    <div 
      style={fallStyle}
      className={`
        relative h-12 w-full rounded-md border-b-4 border-r-4 
        flex items-center justify-center text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-xl
        transition-all duration-700 ease-in-out backdrop-blur-sm
        ${colorClass}
        hover:brightness-110 z-10
      `}
    >
      <span className="truncate px-1 drop-shadow-md">{label}</span>
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none rounded-md"></div>
    </div>
  );
};

export default JengaBlock;
