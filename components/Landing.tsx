
import React, { useState, useEffect } from 'react';

interface LandingProps {
  onNavigate: (view: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full bg-cover bg-center flex flex-col relative overflow-hidden text-white" 
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')" }}>
      
      {/* Overlay Gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 pointer-events-none"></div>

      {/* OS Header / Status Bar Area */}
      <div className="pt-10 px-6 flex justify-between items-start animate-fade-in shrink-0 z-10">
        <div className="flex flex-col drop-shadow-md">
            <span className="text-5xl font-thin tracking-tighter text-white">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-sm font-medium opacity-90 uppercase tracking-widest pl-1 text-slate-100">
                {time.toLocaleDateString([], { weekday: 'long', day: 'numeric' })}
            </span>
        </div>
      </div>

      {/* Main Grid - Apps */}
      <div className="flex-1 p-6 grid grid-cols-4 content-start gap-y-6 gap-x-4 mt-4 z-10">
        
        {/* ROW 1 */}
        {/* APP 1: SIMULATOR */}
        <AppIcon 
            icon="🏗️" 
            label="CEO Sim" 
            color="bg-gradient-to-br from-indigo-500 to-blue-600" 
            onClick={() => onNavigate('simulator')} 
        />

        {/* APP 2: LEAKS (Chat) */}
        <AppIcon 
            icon="💬" 
            label="WhatsApp" 
            color="bg-[#25D366]" 
            badge={3}
            onClick={() => onNavigate('leaks')} 
        />

        {/* APP 3: DASHBOARD */}
        <AppIcon 
            icon="📊" 
            label="Analytics" 
            color="bg-white text-black" 
            onClick={() => onNavigate('dashboard')} 
        />

         {/* APP 4: SETTINGS */}
         <AppIcon 
            icon="⚙️" 
            label="Ajustes" 
            color="bg-slate-500/80 backdrop-blur-md" 
            onClick={() => onNavigate('settings')} 
        />
      </div>

      {/* DOCK (Bottom Bar) */}
      <div className="mx-4 mb-6 pt-4 pb-safe bg-white/10 backdrop-blur-2xl rounded-[2.5rem] flex justify-evenly items-end border border-white/10 shadow-2xl shrink-0 z-20">
          <DockIcon icon="📞" color="bg-green-500" onClick={() => onNavigate('phone')} />
          <DockIcon icon="🌐" color="bg-sky-400" onClick={() => onNavigate('browser')} />
          <DockIcon icon="📧" color="bg-indigo-500" onClick={() => onNavigate('mail')} badge={1} />
          <DockIcon icon="🎵" color="bg-pink-500" onClick={() => {}} /> {/* Decorative for now */}
      </div>
    </div>
  );
};

const AppIcon: React.FC<{ icon: string, label: string, color: string, onClick: () => void, badge?: number }> = ({ icon, label, color, onClick, badge }) => (
    <div className="flex flex-col items-center gap-2 group cursor-pointer active:scale-90 transition-transform duration-200 tap-highlight-transparent" onClick={onClick}>
        <div className={`relative w-[15vw] h-[15vw] max-w-[60px] max-h-[60px] rounded-[22%] ${color} flex items-center justify-center shadow-lg border border-white/10`}>
            <span className="text-2xl sm:text-3xl select-none">{icon}</span>
            {badge && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-slate-900/50 shadow-sm animate-bounce z-10">
                    {badge}
                </div>
            )}
        </div>
        <span className="text-[11px] font-medium drop-shadow-md text-center leading-tight tracking-tight text-white/90">{label}</span>
    </div>
);

const DockIcon: React.FC<{ icon: string, color: string, onClick: () => void, badge?: number }> = ({ icon, color, onClick, badge }) => (
    <div className={`relative w-12 h-12 mb-3 rounded-2xl ${color} flex items-center justify-center text-2xl shadow-lg cursor-pointer active:scale-90 active:brightness-75 transition-all`} onClick={onClick}>
        <span className="select-none">{icon}</span>
        {badge && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-[#121212] z-10">
                {badge}
            </div>
        )}
    </div>
);

export default Landing;
