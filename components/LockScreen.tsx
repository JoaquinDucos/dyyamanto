import React, { useState, useEffect } from 'react';

const LockScreen: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const [time, setTime] = useState(new Date());
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    setIsUnlocking(true);
    setTimeout(onUnlock, 400); // Wait for animation
  };

  return (
    <div 
        onClick={handleUnlock}
        className={`absolute inset-0 z-40 bg-cover bg-center flex flex-col items-center justify-between pb-safe pt-20 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] cursor-pointer
        ${isUnlocking ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')" }}
    >
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

        {/* Lock Icon */}
        <div className="flex flex-col items-center animate-fade-in w-full px-6">
            <div className="text-white/80 mb-4 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Dyamanto Locked
            </div>
            {/* Clock */}
            <h1 className="text-7xl sm:text-8xl font-thin tracking-tighter text-white drop-shadow-2xl">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </h1>
            <p className="text-lg text-white/90 font-medium tracking-wide mt-2 mb-8">
                {time.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>

            {/* Notifications Stack */}
            <div className="w-full max-w-sm space-y-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
                 <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex gap-3 shadow-sm hover:scale-[1.02] transition-transform">
                      <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-xl shrink-0 shadow-sm">💬</div>
                      <div className="min-w-0">
                          <div className="flex justify-between items-baseline">
                               <h4 className="text-sm font-bold text-white">Leaks</h4>
                               <span className="text-[10px] text-white/60">2m ago</span>
                          </div>
                          <p className="text-xs text-white/90 truncate">Javi: "Che, vieron el mail de RRHH? 😡"</p>
                      </div>
                 </div>

                 <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex gap-3 shadow-sm hover:scale-[1.02] transition-transform opacity-90">
                      <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-xl shrink-0 shadow-sm">✉️</div>
                      <div className="min-w-0">
                          <div className="flex justify-between items-baseline">
                               <h4 className="text-sm font-bold text-white">Mail</h4>
                               <span className="text-[10px] text-white/60">1h ago</span>
                          </div>
                          <p className="text-xs text-white/90 truncate">RRHH: Nueva Política de Registro...</p>
                      </div>
                 </div>
            </div>
        </div>

        {/* Bottom Actions */}
        <div className="w-full px-12 flex justify-between items-end mb-4 animate-slide-up relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xl shadow-lg transition-transform active:scale-90">
                🔦
            </div>
            
            <div className="flex flex-col items-center gap-2 opacity-80">
                 <p className="text-[10px] uppercase font-bold tracking-widest text-white/70 animate-pulse">Touch to Unlock</p>
                 <div className="w-32 h-1 bg-white/50 rounded-full"></div>
            </div>

            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xl shadow-lg transition-transform active:scale-90">
                📷
            </div>
        </div>
    </div>
  );
};

export default LockScreen;