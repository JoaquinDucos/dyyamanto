import React, { useState, useEffect } from 'react';

// --- SHARED WRAPPER ---
export const AppWrapper: React.FC<{ children: React.ReactNode, bg?: string, onBack: () => void, darkStatus?: boolean }> = ({ children, bg = 'bg-slate-50', onBack, darkStatus }) => (
    <div className={`h-full ${bg} flex flex-col animate-pop relative overflow-hidden font-sans`}>
        {/* Notch Safe Zone Clicker - acts as a hidden exit for convenience */}
        <div className="absolute top-0 left-0 right-0 h-8 z-50 cursor-pointer" onClick={onBack} title="Tap notch to exit"></div>
        {children}
        <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full z-50 pointer-events-none ${darkStatus ? 'bg-white/20' : 'bg-black/20'}`}></div>
    </div>
);

// --- SHARED HEADER ---
export const AppHeader: React.FC<{ title?: string, onBack: () => void, color?: string, light?: boolean, rightElement?: React.ReactNode }> = ({ title, onBack, color = 'text-blue-500', light, rightElement }) => (
    <div className={`pt-safe px-4 pb-2 flex items-center justify-between shrink-0 z-30 ${light ? 'text-white' : 'text-slate-900'} relative transition-colors duration-300`}>
        <button 
            onClick={onBack} 
            className={`flex items-center gap-1 font-medium text-base active:opacity-50 transition-opacity ${light ? 'text-white' : color} z-40`}
        >
            <span className="text-2xl leading-none pb-0.5">‹</span> Back
        </button>
        {title && <h2 className="font-bold text-base absolute left-1/2 -translate-x-1/2 pointer-events-none">{title}</h2>}
        <div className="w-12 flex justify-end z-40">
            {rightElement}
        </div>
    </div>
);

// --- MAIL APP ---
export const MailApp: React.FC<{ onBack: () => void, inbox?: any[], onReply?: (choice: 'cut' | 'invest') => void }> = ({ onBack, inbox, onReply }) => {
    const [selectedMail, setSelectedMail] = useState<any | null>(null);

    const handleReply = (choice: 'cut' | 'invest') => {
        if (onReply) onReply(choice);
        setSelectedMail(null);
    };

    return (
        <AppWrapper onBack={onBack}>
            {selectedMail ? (
                <div className="flex-1 flex flex-col bg-white">
                    <AppHeader onBack={() => setSelectedMail(null)} />
                    <div className="px-5 py-2 border-b border-slate-100">
                        <h2 className="text-xl font-bold leading-tight mb-2">{selectedMail.subject}</h2>
                        <div className="flex justify-between items-center text-xs text-slate-500">
                            <span className="font-bold text-slate-800">{selectedMail.sender}</span>
                            <span>{selectedMail.time}</span>
                        </div>
                    </div>
                    <div className="p-5 text-sm text-slate-800 leading-relaxed whitespace-pre-line flex-1">
                        {selectedMail.isInteractive ? (
                            <>
                                Estimado CEO,
                                
                                Hemos notado un aumento en el "Burn Rate". Necesitamos una acción inmediata para asegurar la próxima ronda de inversión.
                                
                                Tienes dos opciones:
                                1. Recortar beneficios (Fruta, Café, Eventos). Ahorra dinero pero daña la moral.
                                2. Invertir en Marketing. Arriesgado financieramente pero motiva el crecimiento.
                                
                                Esperamos su respuesta ASAP.
                                
                                - The Board
                            </>
                        ) : (
                            selectedMail.body || "Contenido del correo no disponible."
                        )}
                    </div>
                    {selectedMail.isInteractive && !selectedMail.read && (
                         <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-3 pb-safe">
                             <button onClick={() => handleReply('cut')} className="flex-1 bg-white border border-slate-200 text-red-600 font-bold py-3 rounded-xl shadow-sm active:scale-95">✂️ Recortar</button>
                             <button onClick={() => handleReply('invest')} className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md active:scale-95">📈 Invertir</button>
                         </div>
                    )}
                </div>
            ) : (
                <>
                    <AppHeader 
                        title="Inbox" 
                        onBack={onBack} 
                        rightElement={<button className="text-blue-500 font-bold text-sm">Edit</button>}
                    />
                    <div className="flex-1 overflow-y-auto">
                        <h3 className="font-bold text-slate-900 text-lg px-4 py-2">Dyamanto Corp</h3>
                        <div className="bg-white border-t border-b border-slate-200">
                            {inbox?.map((mail, i) => (
                                <div key={i} onClick={() => setSelectedMail(mail)} className={`p-4 flex gap-3 border-b border-slate-100 relative group active:bg-slate-50 transition-colors cursor-pointer ${!mail.read ? 'bg-blue-50/30' : ''}`}>
                                    <div className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${!mail.read ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className={`font-bold text-sm ${!mail.read ? 'text-slate-900' : 'text-slate-700'}`}>{mail.sender}</h3>
                                            <span className="text-xs text-slate-400">{mail.time}</span>
                                        </div>
                                        <p className="text-sm font-medium text-slate-800 mb-1 truncate">{mail.subject}</p>
                                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                            {mail.body ? mail.body.substring(0, 60) + "..." : (mail.isInteractive ? "URGENT: Action Required..." : "Click to read more...")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </AppWrapper>
    );
};

// --- BROWSER APP ---
export const BrowserApp: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <AppWrapper bg="bg-white" onBack={onBack}>
        {/* OS Header - Keeps consistent back button logic */}
        <AppHeader onBack={onBack} />

        {/* Browser Chrome (Address Bar) */}
        <div className="px-4 pb-2 bg-white/90 backdrop-blur-md border-b border-slate-200 z-20 sticky top-0">
            <div className="flex items-center gap-3">
                <div className="text-slate-400 text-lg">Aa</div>
                <div className="flex-1 h-9 bg-slate-100 rounded-xl flex items-center justify-center gap-2 text-xs text-slate-800 font-medium relative shadow-inner">
                    <span className="text-slate-400">🔒</span>
                    dyamanto.internal/culture
                    <div className="absolute right-2 w-4 h-4 rounded-full bg-slate-300 flex items-center justify-center text-[8px] text-white">↻</div>
                </div>
            </div>
        </div>

        {/* Web Content View */}
        <div className="flex-1 overflow-y-auto bg-slate-50 pb-20">
            {/* Website Header */}
            <div className="bg-[#0f172a] text-white p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                     <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl mb-4 shadow-lg shadow-indigo-500/30">💎</div>
                     <h1 className="text-2xl font-bold tracking-tight mb-2">DYAMANTO</h1>
                     <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-200 border border-white/5">Internal Wiki</span>
                </div>
            </div>

            {/* Website Body */}
            <div className="p-5 space-y-6">
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                     <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-3">Manifiesto Cultural</h2>
                     <p className="text-sm text-slate-600 leading-relaxed font-serif italic mb-4">
                        "En Dyamanto, no gestionamos personas, gestionamos el sistema. La autonomía no es un regalo, es la herramienta de producción más eficiente que existe."
                     </p>
                     <div className="flex gap-2">
                        <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold">#Trust</span>
                        <span className="px-2 py-1 bg-pink-50 text-pink-600 rounded text-[10px] font-bold">#NoEgo</span>
                     </div>
                 </div>

                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                     <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-3">Lecturas Obligatorias</h2>
                     <div className="space-y-3">
                         <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                             <div className="w-10 h-12 bg-slate-200 rounded flex items-center justify-center text-xl shadow-sm">📘</div>
                             <div>
                                 <h3 className="font-bold text-xs text-slate-800">Reinventing Organizations</h3>
                                 <p className="text-[10px] text-slate-400">Frederic Laloux</p>
                             </div>
                             <span className="ml-auto text-blue-500 text-xs font-bold">PDF</span>
                         </div>
                         <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                             <div className="w-10 h-12 bg-slate-200 rounded flex items-center justify-center text-xl shadow-sm">📕</div>
                             <div>
                                 <h3 className="font-bold text-xs text-slate-800">Radical Candor</h3>
                                 <p className="text-[10px] text-slate-400">Kim Scott</p>
                             </div>
                             <span className="ml-auto text-blue-500 text-xs font-bold">PDF</span>
                         </div>
                     </div>
                 </div>
                 
                 <div className="text-center text-xs text-slate-400 font-medium py-4">
                     © 2025 Dyamanto Corp. Internal Use Only.
                 </div>
            </div>
        </div>

        {/* Safari Bottom Toolbar */}
        <div className="bg-[#f8f8f8] border-t border-slate-200 px-6 py-3 pb-safe flex justify-between items-center text-blue-500 text-xl z-30">
            <button className="opacity-50 hover:opacity-100 cursor-default">‹</button>
            <button className="opacity-50 hover:opacity-100 cursor-default">›</button>
            <button className="hover:scale-110 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            </button>
            <button className="hover:scale-110 transition-transform">
                <svg width="20" height="20" viewBox="0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h.01"/><path d="M19.07 4.93L17 9h-4l2.07-4.07A2 2 0 0 1 17 3a2 2 0 0 1 2.07 1.93z"/><path d="M22 13h-4v-2a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2H2"/></svg>
            </button>
            <button className="hover:scale-110 transition-transform">
                <svg width="18" height="18" viewBox="0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4" ry="4"/></svg>
            </button>
        </div>
    </AppWrapper>
);

// --- CALENDAR APP ---
export const CalendarApp: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <AppWrapper bg="bg-white" onBack={onBack}>
        <AppHeader 
            onBack={onBack} 
            color="text-red-500" 
            rightElement={<div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-red-500 font-bold text-xs">JD</div>}
        />
        <div className="px-4 pb-4 border-b border-slate-100">
            <h1 className="text-red-500 font-bold text-xs uppercase mb-1">Octubre</h1>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Hoy</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="flex gap-4 group cursor-pointer">
                <div className="w-12 text-right text-xs text-slate-400 font-medium pt-1">09:00</div>
                <div className="flex-1 bg-red-50 p-4 rounded-2xl border-l-4 border-red-500 shadow-sm group-active:scale-[0.98] transition-transform">
                    <h3 className="font-bold text-slate-800 text-sm">Daily Standup ☕</h3>
                    <p className="text-xs text-slate-500 mt-1">Google Meet · Team Apex</p>
                </div>
            </div>
            <div className="flex gap-4 group cursor-pointer">
                <div className="w-12 text-right text-xs text-slate-400 font-medium pt-1">11:00</div>
                <div className="flex-1 bg-indigo-50 p-4 rounded-2xl border-l-4 border-indigo-500 shadow-sm group-active:scale-[0.98] transition-transform">
                    <h3 className="font-bold text-slate-800 text-sm">Design Review</h3>
                    <p className="text-xs text-slate-500 mt-1">Sala 'Laloux'</p>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="w-12 text-right text-xs text-slate-400 font-medium pt-1">13:00</div>
                <div className="border-t-2 border-red-500 w-full relative mt-2">
                    <span className="absolute -top-2.5 left-0 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">AHORA</span>
                </div>
            </div>
            <div className="flex gap-4 opacity-50">
                <div className="w-12 text-right text-xs text-slate-400 font-medium pt-1">15:00</div>
                <div className="flex-1 bg-slate-50 p-4 rounded-2xl border-l-4 border-slate-300">
                    <h3 className="font-bold text-slate-800 text-sm">Deep Work Block 🎧</h3>
                    <p className="text-xs text-slate-500 mt-1">No Meetings</p>
                </div>
            </div>
        </div>
    </AppWrapper>
);

// --- SETTINGS APP ---
export const SettingsApp: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <AppWrapper bg="bg-slate-100" onBack={onBack}>
        <AppHeader title="Settings" onBack={onBack} />
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
             <div className="bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm border border-slate-200">
                 <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-3xl">👤</div>
                 <div>
                     <h2 className="font-bold text-lg text-slate-900">CEO User</h2>
                     <p className="text-slate-500 text-sm">ceo@dyamanto.corp</p>
                 </div>
             </div>
             
             <div className="space-y-2">
                 <p className="text-xs font-bold text-slate-500 uppercase ml-2">General</p>
                 <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
                     <SettingItem icon="✈️" label="Airplane Mode" toggle />
                     <SettingItem icon="wifi" label="Wi-Fi" value="Dyamanto_5G" />
                     <SettingItem icon="bluetooth" label="Bluetooth" value="On" />
                 </div>
             </div>

             <div className="space-y-2">
                 <p className="text-xs font-bold text-slate-500 uppercase ml-2">Display</p>
                 <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
                     <SettingItem icon="☀️" label="Brightness" />
                     <SettingItem icon="Aa" label="Text Size" />
                 </div>
             </div>
        </div>
    </AppWrapper>
);

const SettingItem: React.FC<{ icon: string, label: string, value?: string, toggle?: boolean }> = ({ icon, label, value, toggle }) => (
    <div className="flex items-center justify-between p-3 border-b border-slate-100 last:border-0 active:bg-slate-50">
        <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-md flex items-center justify-center text-white text-sm ${icon === 'wifi' ? 'bg-blue-500' : icon === 'bluetooth' ? 'bg-blue-500' : 'bg-orange-500'}`}>
                {icon === 'wifi' ? '📶' : icon === 'bluetooth' ? 'ᛒ' : icon}
            </div>
            <span className="text-sm font-medium text-slate-900">{label}</span>
        </div>
        <div className="flex items-center gap-2">
            {value && <span className="text-sm text-slate-400">{value}</span>}
            {toggle && <div className="w-10 h-6 bg-slate-200 rounded-full p-1"><div className="w-4 h-4 bg-white rounded-full shadow-sm"></div></div>}
             {!toggle && <span className="text-slate-300">›</span>}
        </div>
    </div>
);

// --- WEATHER APP ---
export const WeatherApp: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <AppWrapper bg="bg-gradient-to-b from-sky-400 to-sky-600" onBack={onBack} darkStatus>
        <AppHeader onBack={onBack} light rightElement={<span className="text-white text-xl">≡</span>} />
        <div className="flex-1 flex flex-col items-center pt-8 text-white px-6">
            <h2 className="text-3xl font-light">Buenos Aires</h2>
            <p className="text-sm font-medium opacity-90">Partly Cloudy</p>
            <h1 className="text-9xl font-thin mt-2 ml-4">24°</h1>
            
            <div className="flex gap-8 mt-4 text-sm font-medium">
                <span>H:28°</span>
                <span>L:18°</span>
            </div>

            <div className="w-full bg-white/20 backdrop-blur-md rounded-3xl mt-12 p-4 border border-white/10">
                <p className="text-xs uppercase font-bold opacity-70 mb-4 border-b border-white/10 pb-2">Hourly Forecast</p>
                <div className="flex justify-between">
                    <WeatherHour time="Now" icon="☀️" temp="24°" />
                    <WeatherHour time="15" icon="⛅" temp="25°" />
                    <WeatherHour time="16" icon="☁️" temp="24°" />
                    <WeatherHour time="17" icon="☁️" temp="23°" />
                    <WeatherHour time="18" icon="🌙" temp="21°" />
                </div>
            </div>
        </div>
    </AppWrapper>
);

const WeatherHour = ({ time, icon, temp }: any) => (
    <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold">{time}</span>
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-bold">{temp}</span>
    </div>
);

// --- MUSIC APP ---
export const MusicApp: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <AppWrapper bg="bg-gradient-to-b from-rose-900 to-black" onBack={onBack} darkStatus>
        <AppHeader onBack={onBack} title="Music" light color="text-rose-500" />
        <div className="flex-1 flex flex-col p-8">
            <div className="aspect-square bg-slate-800 rounded-2xl shadow-2xl mb-8 overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-6xl filter drop-shadow-lg">🎵</span>
                </div>
            </div>
            
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-1">Focus Flow</h2>
                <p className="text-rose-400 font-medium">Dyamanto Beats</p>
            </div>

            <div className="w-full bg-white/10 h-1 rounded-full mb-2 overflow-hidden">
                <div className="w-1/3 h-full bg-white/50"></div>
            </div>
            <div className="flex justify-between text-xs text-slate-400 font-medium font-mono mb-8">
                <span>1:23</span>
                <span>-3:45</span>
            </div>

            <div className="flex justify-between items-center px-4">
                <button className="text-3xl text-white/50 hover:text-white">⏮</button>
                <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg hover:scale-105 active:scale-95 transition-transform text-black pl-1">▶</button>
                <button className="text-3xl text-white/50 hover:text-white">⏭</button>
            </div>
        </div>
    </AppWrapper>
);

// --- CLOCK APP ---
export const ClockApp: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const t = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    return (
        <AppWrapper bg="bg-black" onBack={onBack} darkStatus>
            <AppHeader onBack={onBack} title="Clock" light color="text-orange-500" />
            <div className="flex-1 flex flex-col items-center justify-center">
                 <div className="text-7xl font-thin text-white tabular-nums tracking-tighter">
                     {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </div>
                 <div className="text-xl text-slate-500 font-medium mt-2">
                     {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                 </div>
            </div>
            <div className="px-4 pb-20 w-full">
                 <div className="flex justify-between items-center py-4 border-b border-white/10">
                     <div>
                         <span className="text-3xl text-slate-400 font-light">08:00</span>
                         <p className="text-xs text-slate-500">Alarm</p>
                     </div>
                     <div className="w-12 h-7 bg-green-500 rounded-full relative">
                         <div className="absolute right-0.5 top-0.5 w-6 h-6 bg-white rounded-full shadow-sm"></div>
                     </div>
                 </div>
            </div>
        </AppWrapper>
    );
}

// --- AWARDS APP (NEW) ---
export const BADGES = {
    'SURVIVOR': { 
        title: 'Survivor', 
        icon: '🏆', 
        desc: 'Completaste la simulación sin que la empresa colapse.', 
        criteria: 'Llega al final de todos los niveles del Simulador.',
        rarity: 'Común' 
    },
    'PEOPLE_FIRST': { 
        title: 'People First', 
        icon: '❤️', 
        desc: 'Priorizaste a las personas sobre los procesos de forma consistente.', 
        criteria: 'Termina el simulador con la Moral > 80%.',
        rarity: 'Raro' 
    },
    'ARCHITECT': { 
        title: 'Arquitecto', 
        icon: '🏗️', 
        desc: 'Construiste cimientos sólidos y escalables.', 
        criteria: 'Termina el simulador con la Estabilidad > 80%.',
        rarity: 'Raro' 
    },
    'SERVANT_LEADER': { 
        title: 'Servant Leader', 
        icon: '🛡️', 
        desc: 'Protegiste al equipo del burnout asumiendo el costo político.', 
        criteria: 'En el nivel "Crisis de Burnout", elige recortar el alcance.',
        rarity: 'Épico' 
    },
    'CULTURE_GUARD': { 
        title: 'Culture Guard', 
        icon: '⚔️', 
        desc: 'No toleraste toxicidad, incluso de un alto performer.', 
        criteria: 'Despide al "Rockstar" tóxico inmediatamente.',
        rarity: 'Legendario' 
    },
    'TRANSPARENCY': { 
        title: 'Glass House', 
        icon: '🪟', 
        desc: 'Hiciste públicos los salarios. Transparencia radical.', 
        criteria: 'Elige "Nivelación Pública" en la crisis de salarios.',
        rarity: 'Legendario' 
    },
    'MOMENTUM': { 
        title: 'Momentum', 
        icon: '🔥', 
        desc: 'Lograste una racha perfecta de decisiones coherentes.', 
        criteria: 'Acierta 3 decisiones seguidas que suban tanto Moral como Estabilidad.',
        rarity: 'Común' 
    },
    'CHAOS_MANAGER': { 
        title: 'Chaos Manager', 
        icon: '🌀', 
        desc: 'Navegaste la incertidumbre de un evento aleatorio.', 
        criteria: 'Sobrevive a cualquier evento aleatorio en el simulador.',
        rarity: 'Común' 
    },
    'CONSISTENT': { 
        title: 'Consistencia', 
        icon: '💎', 
        desc: 'Demostraste un liderazgo sólido y predecible.', 
        criteria: 'Mantén una racha positiva (Streak) mayor a 4.',
        rarity: 'Épico' 
    },
    // NEW BADGES
    'GAMER': {
        title: 'The Gamer',
        icon: '🎮',
        desc: 'Priorizaste el bienestar del equipo con una partida de Valorant.',
        criteria: 'En Leaks, acepta jugar videojuegos con el equipo.',
        rarity: 'Raro'
    },
    'WHISTLEBLOWER': {
        title: 'Double Agent',
        icon: '🕵️',
        desc: 'Filtraste información sensible para desviar la atención.',
        criteria: 'En Leaks, decide filtrar los sueldos.',
        rarity: 'Raro'
    },
    'IRON_FIST': {
        title: 'Iron Fist',
        icon: '👊',
        desc: 'Impulsaste la autoridad por sobre la empatía.',
        criteria: 'En Leaks, sé autoritario con Javi.',
        rarity: 'Común'
    },
    'DIPLOMAT': {
        title: 'Diplomat',
        icon: '🤝',
        desc: 'Resolviste una crisis de liderazgo sin despedir a nadie.',
        criteria: 'En Leaks, logra que Javi se quede y admita su error.',
        rarity: 'Épico'
    },
    'CFO_MINDSET': {
        title: 'CFO Mindset',
        icon: '💰',
        desc: 'Tomaste decisiones financieras difíciles ante la presión de los inversores.',
        criteria: 'En la auditoría de Mail, recorta el presupuesto.',
        rarity: 'Raro'
    }
};

export const AwardsApp: React.FC<{ onBack: () => void, unlockedBadges: string[] }> = ({ onBack, unlockedBadges }) => {
    const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

    const activeBadge = selectedBadge ? BADGES[selectedBadge as keyof typeof BADGES] : null;
    const isUnlocked = selectedBadge && unlockedBadges.includes(selectedBadge);

    return (
        <AppWrapper bg="bg-slate-900" onBack={onBack} darkStatus>
            <AppHeader title="Logros" onBack={onBack} light color="text-yellow-400" />
            <div className="px-4 pb-4">
                 <h1 className="text-3xl font-black text-white mb-1">Hall of Fame</h1>
                 <p className="text-slate-400 text-xs">Toca una medalla para ver cómo ganarla.</p>
            </div>
            
            {/* IMPROVED GRID: auto-rows-fr prevents overlapping */}
            <div className="flex-1 overflow-y-auto px-4 pb-20 grid grid-cols-2 gap-4 content-start">
                {Object.entries(BADGES).map(([id, badge]) => {
                    const unlocked = unlockedBadges.includes(id);
                    return (
                        <button 
                            key={id} 
                            onClick={() => setSelectedBadge(id)}
                            className={`
                                rounded-3xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden border transition-all active:scale-95 min-h-[140px]
                                ${unlocked ? 'bg-slate-800 border-yellow-500/30 shadow-lg shadow-yellow-900/20' : 'bg-slate-800/50 border-white/5 opacity-60 hover:opacity-80'}
                            `}
                        >
                            {unlocked && <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent pointer-events-none"></div>}
                            <div className={`text-4xl mb-3 transition-transform duration-500 ${unlocked ? 'scale-110 filter drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'grayscale blur-[1px]'}`}>
                                {badge.icon}
                            </div>
                            <h3 className={`font-bold text-sm mb-1 leading-tight ${unlocked ? 'text-white' : 'text-slate-500'}`}>{badge.title}</h3>
                            {unlocked ? (
                                <span className="text-[9px] font-bold text-green-400 uppercase tracking-wider">Desbloqueado</span>
                            ) : (
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Bloqueado</span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* DETAIL MODAL */}
            {selectedBadge && activeBadge && (
                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in" onClick={() => setSelectedBadge(null)}>
                    <div className="bg-[#1c1c1e] w-full max-w-sm rounded-[2rem] p-8 relative shadow-2xl border border-white/10 animate-slide-up" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setSelectedBadge(null)} className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white">✕</button>
                        
                        <div className="flex flex-col items-center text-center">
                            <div className={`text-7xl mb-6 ${isUnlocked ? 'animate-bounce filter drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]' : 'grayscale opacity-50'}`}>
                                {activeBadge.icon}
                            </div>
                            <h2 className={`text-2xl font-black mb-2 ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                                {activeBadge.title}
                            </h2>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mb-6 border ${
                                activeBadge.rarity === 'Legendario' ? 'bg-purple-900/50 text-purple-300 border-purple-500/50' : 
                                activeBadge.rarity === 'Épico' ? 'bg-indigo-900/50 text-indigo-300 border-indigo-500/50' :
                                'bg-slate-700 text-slate-300 border-slate-600'
                            }`}>
                                {activeBadge.rarity}
                            </span>

                            <div className="bg-black/30 rounded-2xl p-4 w-full mb-4 border border-white/5">
                                <p className="text-xs text-slate-400 uppercase font-bold mb-2">Descripción</p>
                                <p className="text-sm text-white/90 leading-relaxed">
                                    {isUnlocked ? activeBadge.desc : '??? (Desbloquea para ver)'}
                                </p>
                            </div>

                            <div className={`rounded-2xl p-4 w-full border ${isUnlocked ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
                                <p className={`text-xs uppercase font-bold mb-2 ${isUnlocked ? 'text-green-400' : 'text-red-400'}`}>
                                    {isUnlocked ? '¡Completado!' : 'Cómo ganar'}
                                </p>
                                <p className={`text-sm leading-relaxed ${isUnlocked ? 'text-green-100' : 'text-red-100 font-medium'}`}>
                                    {activeBadge.criteria}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppWrapper>
    );
};

// --- PHONE APP ---
export const PhoneApp: React.FC<{ onBack: () => void, initialIncomingCall?: string | null, onCallEnded?: () => void }> = ({ onBack, initialIncomingCall, onCallEnded }) => {
    const [calling, setCalling] = useState<string | null>(initialIncomingCall || null);
    
    // Auto answer simulation if incoming call is active
    const [incomingState, setIncomingState] = useState<'ringing' | 'connected' | 'ended'>(initialIncomingCall ? 'ringing' : 'ended');

    useEffect(() => {
        if (initialIncomingCall) {
            setCalling(initialIncomingCall);
            setIncomingState('ringing');
        }
    }, [initialIncomingCall]);

    const handleAcceptCall = () => {
        setIncomingState('connected');
        setTimeout(() => {
            setIncomingState('ended');
            setCalling(null);
            if (onCallEnded) setTimeout(onCallEnded, 500); // Trigger OS callback
        }, 3000);
    };

    const handleDeclineCall = () => {
        setIncomingState('ended');
        setCalling(null);
        if (onCallEnded) setTimeout(onCallEnded, 200);
    };

    return (
        <AppWrapper bg="bg-white" onBack={onBack}>
            {calling ? (
                <div className="flex-1 bg-slate-900 flex flex-col items-center justify-between py-16 text-white relative overflow-hidden h-full z-40">
                    {/* Background Animation for Ringing */}
                    <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070')] opacity-20 blur-xl bg-cover ${incomingState === 'ringing' ? 'animate-pulse' : ''}`}></div>
                    
                    <div className="z-10 text-center mt-10">
                        <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl animate-pulse">
                            {incomingState === 'connected' ? '🔊' : '👤'}
                        </div>
                        <h2 className="text-3xl font-thin mb-1">{calling}</h2>
                        <p className="text-sm opacity-70 animate-pulse">
                            {incomingState === 'ringing' ? 'Incoming Video Call...' : incomingState === 'connected' ? '00:03' : 'Ending...'}
                        </p>
                        {incomingState === 'connected' && <p className="text-xs text-red-400 mt-2 font-bold">¡ESTÁS DESPEDIDO!</p>}
                    </div>

                    <div className="w-full px-12 z-10 mb-8 flex justify-around items-center">
                         {incomingState === 'ringing' ? (
                            <>
                                <button onClick={handleDeclineCall} className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-2xl shadow-lg hover:bg-red-600 active:scale-95 transition-all">✖</button>
                                <button onClick={handleAcceptCall} className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-2xl shadow-lg hover:bg-green-600 active:scale-95 transition-all animate-bounce">📞</button>
                            </>
                         ) : (
                             <button onClick={() => { setCalling(null); if(onCallEnded) onCallEnded(); }} className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-2xl shadow-lg hover:bg-red-600 active:scale-95 transition-all">📞</button>
                         )}
                    </div>
                </div>
            ) : (
                <>
                    <AppHeader onBack={onBack} title="Contacts" rightElement={<button className="text-blue-500 text-2xl leading-none font-light">+</button>} />
                    <div className="flex-1 overflow-y-auto px-4">
                        <div className="space-y-1 mt-2">
                             <ContactItem name="Davide (CEO)" role="The Boss" onClick={() => { setCalling("Davide (CEO)"); setIncomingState('ringing'); }} />
                             <ContactItem name="Javi (Tech Lead)" role="Rebel Leader" onClick={() => { setCalling("Javi"); setIncomingState('ringing'); }} />
                             <ContactItem name="Ana (Senior)" role="Peacemaker" onClick={() => { setCalling("Ana"); setIncomingState('ringing'); }} />
                             <ContactItem name="Sofia (PO)" role="Bureaucrat" onClick={() => { setCalling("Sofia"); setIncomingState('ringing'); }} />
                        </div>
                    </div>
                    {/* Fake Tab Bar */}
                    <div className="h-16 border-t border-slate-200 flex justify-around items-center text-slate-400 text-xs pb-safe bg-slate-50/50 backdrop-blur-md">
                        <div className="flex flex-col items-center gap-1"><span className="text-xl">★</span>Favorites</div>
                        <div className="flex flex-col items-center gap-1"><span className="text-xl">🕒</span>Recents</div>
                        <div className="flex flex-col items-center gap-1 text-blue-500"><span className="text-xl">👥</span>Contacts</div>
                        <div className="flex flex-col items-center gap-1"><span className="text-xl">罒</span>Keypad</div>
                    </div>
                </>
            )}
        </AppWrapper>
    );
};

const ContactItem: React.FC<{ name: string, role: string, onClick: () => void }> = ({ name, role, onClick }) => (
    <div onClick={onClick} className="flex items-center gap-4 p-3 border-b border-slate-100 cursor-pointer hover:bg-slate-50 active:bg-slate-100 transition-colors">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-tr from-slate-400 to-slate-600">{name[0]}</div>
        <div>
            <h3 className="font-bold text-slate-800 text-sm">{name}</h3>
            <p className="text-xs text-slate-500">{role}</p>
        </div>
    </div>
);