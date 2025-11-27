import React from 'react';

interface LandingProps {
  onNavigate: (view: string) => void;
  stability: number;
  morale: number;
}

const Landing: React.FC<LandingProps> = ({ onNavigate, stability, morale }) => {
  return (
    <div className="h-full w-full bg-cover bg-center flex flex-col relative overflow-hidden text-white" 
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop')" }}>
      
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-transparent to-black/60 pointer-events-none"></div>
      <div className="w-full h-safe-top"></div>

      <div className="flex-1 px-6 pt-12 pb-24 overflow-y-auto no-scrollbar space-y-8 z-10">
        
        {/* WIDGET */}
        <div className="w-full animate-scale-in origin-top">
             <div 
                className="w-full glass rounded-[2rem] p-5 relative overflow-hidden cursor-pointer group active:scale-[0.98] transition-all"
                onClick={() => onNavigate('simulator')}
             >
                 <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-tr from-indigo-500 to-purple-500 dyamanto-logo shadow-lg"></div>
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">Dyamanto HQ</span>
                    </div>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold backdrop-blur-md border border-white/10">LIVE</span>
                 </div>

                 <div className="flex gap-4 items-end relative z-10">
                     <div className="flex-1">
                        <p className="text-[10px] text-indigo-200 uppercase font-bold mb-1">Estabilidad</p>
                        <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden border border-white/10">
                            <div className={`h-full transition-all duration-1000 ${stability > 50 ? 'bg-indigo-400' : 'bg-red-400'}`} style={{width: `${stability}%`}}></div>
                        </div>
                     </div>
                     <div className="flex-1">
                        <p className="text-[10px] text-pink-200 uppercase font-bold mb-1">Moral</p>
                         <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden border border-white/10">
                            <div className={`h-full transition-all duration-1000 ${morale > 50 ? 'bg-pink-400' : 'bg-orange-400'}`} style={{width: `${morale}%`}}></div>
                        </div>
                     </div>
                 </div>
                 <div className="absolute -right-6 -bottom-10 text-9xl opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">💎</div>
             </div>
        </div>

        {/* APPS GRID */}
        <div className="grid grid-cols-4 gap-x-4 gap-y-8">
            <AppIcon icon="🏗️" label="Simulator" gradient="bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600" onClick={() => onNavigate('simulator')} />
            <AppIcon icon="💬" label="Whatsapp" gradient="bg-gradient-to-br from-green-400 to-emerald-600" badge={3} onClick={() => onNavigate('leaks')} />
            <AppIcon icon="📊" label="Data Lab" gradient="bg-gradient-to-br from-blue-400 to-cyan-600" onClick={() => onNavigate('dashboard')} />
            <AppIcon icon="⚙️" label="Settings" gradient="bg-gradient-to-br from-slate-500 to-slate-700" onClick={() => onNavigate('settings')} />
            
            <AppIcon icon="📅" label="Calendar" gradient="glass" onClick={() => onNavigate('calendar')} />
            <AppIcon icon="🏆" label="Logros" gradient="bg-gradient-to-br from-yellow-400 to-orange-500" onClick={() => onNavigate('awards')} />
            <AppIcon icon="☁️" label="Weather" gradient="glass" onClick={() => onNavigate('weather')} />
            <AppIcon icon="⏰" label="Clock" gradient="glass" onClick={() => onNavigate('clock')} />
        </div>
      </div>

      {/* DOCK */}
      <div className="mx-4 mb-4 glass-panel rounded-[2.5rem] flex justify-evenly items-center py-4 px-2 shrink-0 z-20 shadow-2xl relative">
          <DockIcon icon="📞" color="bg-green-500" onClick={() => onNavigate('phone')} />
          <DockIcon icon="🧭" color="bg-blue-500" onClick={() => onNavigate('browser')} />
          <DockIcon icon="✉️" color="bg-indigo-500" onClick={() => onNavigate('mail')} badge={1} />
          <DockIcon icon="🎵" color="bg-pink-500" onClick={() => onNavigate('music')} />
      </div>
    </div>
  );
};

const AppIcon: React.FC<{ icon: string, label: string, gradient: string, onClick: () => void, badge?: number }> = ({ icon, label, gradient, onClick, badge }) => (
    <div className="flex flex-col items-center gap-2 group cursor-pointer active:scale-90 transition-transform duration-200 tap-highlight-transparent" onClick={onClick}>
        <div className={`relative w-[64px] h-[64px] rounded-[18px] ${gradient} ${gradient === 'glass' ? 'app-icon-glass' : 'shadow-lg shadow-black/20'} flex items-center justify-center border border-white/10 group-hover:brightness-110 transition-all`}>
            <span className="text-3xl filter drop-shadow-md select-none">{icon}</span>
            {badge && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-[11px] font-bold border-2 border-slate-900 shadow-sm animate-bounce z-10">
                    {badge}
                </div>
            )}
        </div>
        <span className="text-[11px] font-medium text-white/90 drop-shadow-md text-center leading-tight tracking-wide">{label}</span>
    </div>
);

const DockIcon: React.FC<{ icon: string, color: string, onClick: () => void, badge?: number }> = ({ icon, color, onClick, badge }) => (
    <div className={`relative w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-2xl shadow-lg cursor-pointer active:scale-75 hover:-translate-y-2 transition-all duration-300 border border-white/10`} onClick={onClick}>
        <span className="filter drop-shadow-sm select-none">{icon}</span>
        {badge && (
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-slate-900 z-10">
                {badge}
            </div>
        )}
    </div>
);

export default Landing;