
import React from 'react';

interface SimulatorHUDProps {
  stability: number;
  morale: number;
  level: number;
  totalLevels: number;
  streak: number;
  onBack: () => void;
}

const SimulatorHUD: React.FC<SimulatorHUDProps> = ({ stability, morale, level, totalLevels, streak, onBack }) => {
  return (
    <div className="flex justify-between items-start p-3 pt-safe z-30 m-2 rounded-2xl glass shrink-0 transition-all duration-300">
        
        {/* Back Button */}
        <button 
            onClick={onBack} 
            className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full hover:bg-white/20 transition-all active:scale-95 border border-white/5 shadow-sm"
            aria-label="Volver"
        >
            <span className="text-lg">🏠</span>
        </button>
        
        {/* Stats Container */}
        <div className="flex flex-col flex-1 mx-4 space-y-2 mt-1 min-w-0 max-w-md">
            {/* Stability Bar */}
            <div className="flex flex-col group">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                    <span className="text-indigo-200 truncate mr-2 group-hover:text-indigo-100 transition-colors">Estructura</span>
                    <span className="text-white/90">{stability}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900/50 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm">
                    <div 
                        className={`h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)] ${stability > 50 ? 'bg-gradient-to-r from-indigo-500 to-blue-400' : 'bg-gradient-to-r from-red-500 to-orange-400 animate-pulse-fast'}`} 
                        style={{ width: `${stability}%` }}
                    ></div>
                </div>
            </div>
            
            {/* Morale Bar */}
            <div className="flex flex-col group">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                    <span className="text-pink-200 truncate mr-2 group-hover:text-pink-100 transition-colors">Moral</span>
                    <span className="text-white/90">{morale}% {morale > 80 ? '🔥' : morale < 30 ? '😭' : '😐'}</span>
                </div>
                <div className="w-full h-2 bg-slate-900/50 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm">
                    <div 
                        className={`h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(236,72,153,0.5)] ${morale > 50 ? 'bg-gradient-to-r from-pink-500 to-rose-400' : 'bg-gradient-to-r from-orange-500 to-amber-400'}`} 
                        style={{ width: `${morale}%` }}
                    ></div>
                </div>
            </div>
        </div>

        {/* Level & Streak */}
        <div className="flex flex-col gap-1 items-end shrink-0 min-w-[3rem]">
             <div className="text-xs font-black bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 shadow-inner whitespace-nowrap text-white/90">
                {level}/{totalLevels}
            </div>
            {streak > 2 && (
                <div className="text-[9px] text-yellow-300 font-bold animate-bounce whitespace-nowrap drop-shadow-md">
                    Streak x{streak}!
                </div>
            )}
        </div>
      </div>
  );
};

export default SimulatorHUD;
