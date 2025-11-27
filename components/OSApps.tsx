
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
export const MailApp: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <AppWrapper onBack={onBack}>
        <AppHeader 
            title="Inbox (1)" 
            onBack={onBack} 
            rightElement={<button className="text-blue-500 font-bold text-sm">Edit</button>}
        />
        <div className="flex-1 overflow-y-auto">
            <h3 className="font-bold text-slate-900 text-lg px-4 py-2">Dyamanto Corp</h3>
            <div className="bg-white border-t border-b border-slate-200">
                <div className="p-4 flex gap-3 border-b border-slate-100 relative group active:bg-slate-50 transition-colors cursor-pointer">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-slate-900 text-sm">RRHH Global</h3>
                            <span className="text-xs text-slate-400">Yesterday</span>
                        </div>
                        <p className="text-sm font-medium text-slate-800 mb-1">Nueva Política de Registro de Horas</p>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            Estimado equipo, para mejorar la eficiencia del proyecto "Apex", a partir de hoy se requerirá un log de actividad detallado...
                        </p>
                    </div>
                </div>
                <div className="p-4 flex gap-3 opacity-60">
                    <div className="w-2.5 h-2.5 mt-2 shrink-0"></div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-slate-900 text-sm">Javi (Tech Lead)</h3>
                            <span className="text-xs text-slate-400">Friday</span>
                        </div>
                        <p className="text-sm font-medium text-slate-800 mb-1">Re: Servidor AWS Caído</p>
                        <p className="text-xs text-slate-500 line-clamp-2">
                            Ya levanté la instancia. Fue un error de configuración en el load balancer. No se preocupen.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500 pb-safe">
            Updated Just Now
        </div>
    </AppWrapper>
);

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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h.01"/><path d="M19.07 4.93L17 9h-4l2.07-4.07A2 2 0 0 1 17 3a2 2 0 0 1 2.07 1.93z"/><path d="M22 13h-4v-2a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2H2"/></svg>
            </button>
            <button className="hover:scale-110 transition-transform">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4" ry="4"/></svg>
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

// --- PHOTOS APP ---
export const PhotosApp: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <AppWrapper bg="bg-white" onBack={onBack}>
        <AppHeader title="Recents" onBack={onBack} />
        <div className="grid grid-cols-3 gap-0.5 px-0.5 pb-20 overflow-y-auto">
            {[
                'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500', 
                'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500', 
                'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500', 
                'https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=500', 
                'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500', 
                'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500', 
                'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500', 
                'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500', 
                'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500' 
            ].map((url, i) => (
                <div key={i} className="aspect-square bg-slate-100 overflow-hidden relative group cursor-pointer">
                    <img src={url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Gallery" />
                </div>
            ))}
        </div>
    </AppWrapper>
);

// --- WEATHER APP ---
export const WeatherApp: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <AppWrapper bg="bg-gradient-to-b from-blue-400 to-blue-600" onBack={onBack} darkStatus>
        <AppHeader onBack={onBack} light />
        
        <div className="flex flex-col items-center pt-8 text-white p-6 text-center animate-slide-up">
            <h2 className="text-2xl font-medium tracking-wide">Dyamanto HQ</h2>
            <h1 className="text-9xl font-thin mt-2 mb-4 tracking-tighter">22°</h1>
            <p className="text-lg font-medium opacity-90">Organizational Climate: Sunny</p>
            <div className="flex gap-3 mt-2 text-base font-medium opacity-80">
                <span>H:28°</span>
                <span>L:15°</span>
            </div>
            
            <div className="mt-12 w-full bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-lg">
                <div className="text-xs font-bold uppercase opacity-70 mb-4 border-b border-white/10 pb-3 text-left flex items-center gap-2">
                    <span className="text-lg">📅</span> Forecast
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-bold opacity-80">NOW</span>
                        <span className="text-2xl my-2 drop-shadow-md">☀️</span>
                        <span className="text-[10px] font-bold uppercase opacity-70">High Morale</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-bold opacity-80">14PM</span>
                        <span className="text-2xl my-2 drop-shadow-md">🌩️</span>
                        <span className="text-[10px] font-bold uppercase opacity-70">Deadline</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-bold opacity-80">16PM</span>
                        <span className="text-2xl my-2 drop-shadow-md">⛅</span>
                        <span className="text-[10px] font-bold uppercase opacity-70">Retro</span>
                    </div>
                     <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-bold opacity-80">18PM</span>
                        <span className="text-2xl my-2 drop-shadow-md">🍻</span>
                        <span className="text-[10px] font-bold uppercase opacity-70">Beer</span>
                    </div>
                </div>
            </div>
        </div>
    </AppWrapper>
);

// --- MUSIC APP ---
export const MusicApp: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <AppWrapper bg="bg-gradient-to-b from-slate-900 to-black" onBack={onBack} darkStatus>
        <AppHeader onBack={onBack} light color="text-pink-500" />
        <div className="p-8 flex flex-col h-full text-white pb-20">
            <div className="w-full aspect-square bg-slate-800 rounded-2xl shadow-2xl mb-10 overflow-hidden relative group mx-auto max-w-sm border border-white/10">
                <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800" className="w-full h-full object-cover opacity-80" alt="Album" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center pl-2 text-4xl shadow-lg ring-1 ring-white/50 cursor-pointer hover:scale-110 transition-transform active:scale-95">▶</div>
                </div>
            </div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 tracking-tight">Deep Work Flow</h1>
                <p className="text-pink-400 font-medium text-lg">Dyamanto Beats</p>
            </div>
            {/* Progress */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full mb-2 cursor-pointer group">
                <div className="w-1/3 h-full bg-white rounded-full group-hover:bg-pink-500 transition-colors relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform"></div>
                </div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 font-bold mb-10">
                <span>1:23</span>
                <span>-3:45</span>
            </div>
            {/* Controls */}
            <div className="flex justify-between items-center px-6">
                 <button className="text-4xl text-white/50 hover:text-white transition-colors">⏮</button>
                 <button className="text-7xl text-white hover:scale-105 transition-transform active:scale-95">⏸</button>
                 <button className="text-4xl text-white/50 hover:text-white transition-colors">⏭</button>
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
             <AppHeader onBack={onBack} light color="text-orange-500" title="World Clock" />
             <div className="p-4 pt-4">
                 <h1 className="text-3xl font-bold text-white mb-6 px-2">World Clock</h1>
                 <div className="space-y-0">
                     <div className="flex justify-between items-baseline border-b border-white/10 py-4 px-2 hover:bg-white/5 transition-colors">
                         <div>
                             <p className="text-slate-400 text-xs font-medium">Today, +0HRS</p>
                             <p className="text-2xl text-white font-light">Buenos Aires</p>
                         </div>
                         <div className="text-5xl text-white font-thin tracking-wider">
                             {time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                         </div>
                     </div>
                     <div className="flex justify-between items-baseline border-b border-white/10 py-4 px-2 hover:bg-white/5 transition-colors opacity-60">
                         <div>
                             <p className="text-slate-400 text-xs font-medium">Today, -3HRS</p>
                             <p className="text-2xl text-white font-light">Mexico City</p>
                         </div>
                         <div className="text-5xl text-white font-thin tracking-wider">
                             {new Date(time.getTime() - 3*60*60*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                         </div>
                     </div>
                     <div className="flex justify-between items-baseline border-b border-white/10 py-4 px-2 hover:bg-white/5 transition-colors opacity-60">
                         <div>
                             <p className="text-slate-400 text-xs font-medium">Tomorrow, +12HRS</p>
                             <p className="text-2xl text-white font-light">Tokyo</p>
                         </div>
                         <div className="text-5xl text-white font-thin tracking-wider">
                             {new Date(time.getTime() + 12*60*60*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                         </div>
                     </div>
                 </div>
             </div>
        </AppWrapper>
    );
};

// --- SETTINGS APP ---
export const SettingsApp: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <AppWrapper bg="bg-[#F2F2F7]" onBack={onBack}>
        <AppHeader onBack={onBack} title="Settings" />
        <div className="px-4 pb-2">
             <h1 className="text-3xl font-bold text-black mb-4">Settings</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-12">
            <div className="bg-white rounded-xl p-4 flex items-center gap-4 mb-6 shadow-sm border border-slate-200/60">
                <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border border-slate-100">
                    <img src="https://ui-avatars.com/api/?name=CEO+Manager&background=random" className="w-full h-full" alt="User" />
                </div>
                <div>
                    <h2 className="text-xl font-medium text-slate-900">CEO Manager</h2>
                    <p className="text-xs text-slate-500">Apple ID, iCloud+, Media & Purchases</p>
                </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden mb-6 shadow-sm border border-slate-200/60">
                <MenuItem icon="✈️" color="bg-orange-500" label="Airplane Mode" toggle />
                <MenuItem icon="W" color="bg-blue-500" label="Wi-Fi" value="Dyamanto_5G" />
                <MenuItem icon="B" color="bg-blue-600" label="Bluetooth" value="On" />
            </div>
            <h3 className="text-xs font-bold text-slate-500 uppercase ml-4 mb-2">About This Experience</h3>
            <div className="bg-white rounded-xl overflow-hidden mb-6 shadow-sm border border-slate-200/60">
                 <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <span className="text-sm font-medium">Assignment</span>
                    <span className="text-sm text-slate-500">Comportamiento Org.</span>
                 </div>
                 <div className="p-4 border-b border-slate-100">
                    <span className="text-sm font-medium block mb-2">Credits</span>
                    <div className="text-xs text-slate-500 grid grid-cols-1 gap-1">
                        <p>Branca, Belén</p>
                        <p>Ducos, Joaquín</p>
                        <p>Martínez P, Gonzalo</p>
                        <p>Varela V, Santiago</p>
                        <p>Yennaccaro, Francisco</p>
                    </div>
                 </div>
                 <div className="p-4 flex justify-between items-center">
                    <span className="text-sm font-medium">Version</span>
                    <span className="text-sm text-slate-500">DyamantoOS 2.0.1</span>
                 </div>
            </div>
        </div>
    </AppWrapper>
);

const MenuItem: React.FC<{ icon: string, color: string, label: string, value?: string, toggle?: boolean }> = ({ icon, color, label, value, toggle }) => (
    <div className="flex items-center p-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100">
        <div className={`w-7 h-7 rounded-md ${color} flex items-center justify-center text-white text-xs mr-3`}>{icon}</div>
        <div className="flex-1 flex justify-between items-center">
            <span className="text-sm font-medium text-slate-900">{label}</span>
            {value && <span className="text-sm text-slate-400 flex items-center gap-1">{value} <span className="text-xs">❯</span></span>}
            {toggle && <div className="w-10 h-6 bg-slate-200 rounded-full relative"><div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"></div></div>}
        </div>
    </div>
);

// --- PHONE APP ---
export const PhoneApp: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [calling, setCalling] = useState<string | null>(null);
    return (
        <AppWrapper bg="bg-white" onBack={onBack}>
            {calling ? (
                <div className="flex-1 bg-slate-900 flex flex-col items-center justify-between py-16 text-white relative overflow-hidden h-full z-40">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070')] opacity-20 blur-xl bg-cover"></div>
                    <div className="z-10 text-center mt-10">
                        <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl animate-pulse">👤</div>
                        <h2 className="text-3xl font-thin mb-1">{calling}</h2>
                        <p className="text-sm opacity-70 animate-pulse">calling mobile...</p>
                    </div>
                    <div className="w-full px-12 z-10 mb-8 flex justify-center">
                         <button onClick={() => setCalling(null)} className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-2xl shadow-lg hover:bg-red-600 active:scale-95 transition-all">📞</button>
                    </div>
                </div>
            ) : (
                <>
                    <AppHeader onBack={onBack} title="Contacts" rightElement={<button className="text-blue-500 text-2xl leading-none font-light">+</button>} />
                    <div className="flex-1 overflow-y-auto px-4">
                        <div className="space-y-1 mt-2">
                             <ContactItem name="Davide (CEO)" role="The Boss" onClick={() => setCalling("Davide (CEO)")} />
                             <ContactItem name="Javi (Tech Lead)" role="Rebel Leader" onClick={() => setCalling("Javi")} />
                             <ContactItem name="Ana (Senior)" role="Peacemaker" onClick={() => setCalling("Ana")} />
                             <ContactItem name="Sofia (PO)" role="Bureaucrat" onClick={() => setCalling("Sofia")} />
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
