
import React, { useState } from 'react';

// --- MAIL APP ---
export const MailApp: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <div className="h-full bg-slate-50 flex flex-col animate-pop">
        {/* Header */}
        <div className="bg-white p-4 pt-safe border-b border-slate-200 shadow-sm flex items-center justify-between sticky top-0 z-20">
            <button onClick={onBack} className="text-blue-500 font-bold text-sm">❮ Mailboxes</button>
            <h2 className="font-bold text-slate-800">Inbox (1)</h2>
            <button className="text-blue-500 font-bold text-sm">Edit</button>
        </div>
        
        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
            <div className="bg-white mt-4 border-t border-b border-slate-200">
                <div className="p-4 flex gap-3 border-b border-slate-100 relative group active:bg-slate-50 transition-colors cursor-pointer">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-slate-900 text-sm">RRHH Global</h3>
                            <span className="text-xs text-slate-400">Yesterday</span>
                        </div>
                        <p className="text-sm font-medium text-slate-800 mb-1">Nueva Política de Registro de Horas</p>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            Estimado equipo, para mejorar la eficiencia del proyecto "Apex", a partir de hoy se requerirá un log de actividad detallado cada 15 minutos en la plataforma...
                        </p>
                    </div>
                </div>
                {/* Older Emails */}
                <div className="p-4 flex gap-3 opacity-60">
                    <div className="w-2 h-2 mt-2 shrink-0"></div>
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
        
        {/* Bottom Bar */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500 pb-safe">
            Updated Just Now
        </div>
    </div>
);

// --- BROWSER APP (INTRANET) ---
export const BrowserApp: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <div className="h-full bg-white flex flex-col animate-slide-up">
        {/* Browser URL Bar */}
        <div className="bg-slate-100 p-2 pt-safe border-b border-slate-300 flex items-center gap-2 sticky top-0 z-20">
            <button onClick={onBack} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-200 rounded-full">✕</button>
            <div className="flex-1 bg-white rounded-lg h-8 flex items-center px-3 text-xs text-slate-600 shadow-sm">
                🔒 intranet.dyamanto.com/culture
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">D</div>
        </div>

        {/* Web Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
            <div className="max-w-md mx-auto bg-white rounded-none sm:rounded-xl shadow-sm min-h-[80vh] border border-slate-200 overflow-hidden">
                <div className="bg-indigo-900 text-white p-8 text-center">
                    <h1 className="text-2xl font-black tracking-tight mb-2">DYAMANTO</h1>
                    <p className="text-[10px] uppercase tracking-widest opacity-70">Internal Culture Manifesto</p>
                </div>
                <div className="p-6 space-y-8">
                    <section>
                        <h2 className="text-lg font-bold text-indigo-900 mb-2 border-b border-indigo-100 pb-2">1. Nuestra Misión</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Crear software de clase mundial sin sacrificar nuestra humanidad. Creemos en la <strong>autonomía</strong> sobre el control.
                        </p>
                    </section>
                    
                    <section>
                        <h2 className="text-lg font-bold text-indigo-900 mb-2 border-b border-indigo-100 pb-2">2. Valores Centrales</h2>
                        <ul className="space-y-3">
                            <li className="flex gap-3 items-start">
                                <span className="bg-green-100 text-green-700 p-1 rounded text-xs font-bold">TRUST</span>
                                <p className="text-sm text-slate-600">Confiamos por defecto. No vigilamos.</p>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="bg-purple-100 text-purple-700 p-1 rounded text-xs font-bold">FLAT</span>
                                <p className="text-sm text-slate-600">La mejor idea gana, sin importar el cargo.</p>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="bg-orange-100 text-orange-700 p-1 rounded text-xs font-bold">FLOW</span>
                                <p className="text-sm text-slate-600">Protegemos el foco. Minimizamos reuniones.</p>
                            </li>
                        </ul>
                    </section>

                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <p className="text-xs font-bold text-yellow-800 mb-1">⚠️ Recordatorio</p>
                        <p className="text-xs text-yellow-700">
                            Cualquier política que contradiga estos valores debe ser reportada inmediatamente al CEO.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- SETTINGS APP ---
export const SettingsApp: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <div className="h-full bg-[#F2F2F7] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="bg-[#F2F2F7] p-4 pt-safe sticky top-0 z-20">
            <button onClick={onBack} className="mb-2 text-blue-500 font-bold flex items-center gap-1">
                <span>❮ Settings</span>
            </button>
            <h1 className="text-3xl font-bold text-black">Ajustes</h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-12">
            
            {/* User Profile */}
            <div className="bg-white rounded-xl p-4 flex items-center gap-4 mb-6 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-slate-300 overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=CEO+Manager&background=random" className="w-full h-full" alt="User" />
                </div>
                <div>
                    <h2 className="text-xl font-medium">CEO Manager</h2>
                    <p className="text-sm text-slate-500">Apple ID, iCloud+, Media & Purchases</p>
                </div>
            </div>

            {/* Menu Group 1 */}
            <div className="bg-white rounded-xl overflow-hidden mb-6 shadow-sm">
                <MenuItem icon="✈️" color="bg-orange-500" label="Airplane Mode" toggle />
                <MenuItem icon="W" color="bg-blue-500" label="Wi-Fi" value="Dyamanto_5G" />
                <MenuItem icon="B" color="bg-blue-600" label="Bluetooth" value="On" />
            </div>

            {/* Credits Section */}
            <h3 className="text-xs font-bold text-slate-500 uppercase ml-4 mb-2">About This Experience</h3>
            <div className="bg-white rounded-xl overflow-hidden mb-6 shadow-sm">
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
            
            <button className="w-full bg-white text-red-500 font-medium py-3 rounded-xl shadow-sm mb-12">
                Factory Reset Simulation
            </button>
        </div>
    </div>
);

const MenuItem: React.FC<{ icon: string, color: string, label: string, value?: string, toggle?: boolean }> = ({ icon, color, label, value, toggle }) => (
    <div className="flex items-center p-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer">
        <div className={`w-7 h-7 rounded-md ${color} flex items-center justify-center text-white text-xs mr-3`}>{icon}</div>
        <div className="flex-1 flex justify-between items-center">
            <span className="text-sm font-medium text-slate-900">{label}</span>
            {value && <span className="text-sm text-slate-400 flex items-center gap-1">{value} <span className="text-xs">❯</span></span>}
            {toggle && <div className="w-10 h-6 bg-slate-200 rounded-full relative"><div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"></div></div>}
        </div>
    </div>
);

// --- PHONE APP (CONTACTS) ---
export const PhoneApp: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [calling, setCalling] = useState<string | null>(null);

    return (
        <div className="h-full bg-white flex flex-col animate-slide-up">
            {calling ? (
                // CALLING SCREEN
                <div className="flex-1 bg-slate-900 flex flex-col items-center justify-between py-16 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070')] opacity-20 blur-xl bg-cover"></div>
                    <div className="z-10 text-center mt-10">
                        <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl animate-pulse">
                            👤
                        </div>
                        <h2 className="text-3xl font-thin mb-1">{calling}</h2>
                        <p className="text-sm opacity-70 animate-pulse">calling mobile...</p>
                    </div>
                    
                    <div className="w-full px-12 z-10">
                         <div className="grid grid-cols-3 gap-6 mb-12">
                             {['Mute', 'Keypad', 'Speaker', 'Add Call', 'FaceTime', 'Contacts'].map(l => (
                                 <div key={l} className="flex flex-col items-center gap-2">
                                     <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-2xl backdrop-blur-md">●</div>
                                     <span className="text-[10px]">{l}</span>
                                 </div>
                             ))}
                         </div>
                         <button 
                            onClick={() => setCalling(null)}
                            className="w-16 h-16 bg-red-500 rounded-full mx-auto flex items-center justify-center text-2xl shadow-lg shadow-red-500/50 hover:scale-105 transition-transform"
                         >
                            📞
                         </button>
                    </div>
                </div>
            ) : (
                // CONTACT LIST
                <>
                    <div className="p-4 pt-safe border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                        <button onClick={onBack} className="text-blue-500">Back</button>
                        <h2 className="font-bold text-slate-800">Contacts</h2>
                        <button className="text-blue-500">+</button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4">
                        <div className="bg-slate-100 p-2 rounded-xl mb-4 text-center mt-2">
                            <input type="text" placeholder="Search" className="bg-transparent text-center text-sm w-full outline-none" />
                        </div>
                        
                        <div className="space-y-1">
                             <ContactItem name="Davide (CEO)" role="The Boss" onClick={() => setCalling("Davide (CEO)")} />
                             <ContactItem name="Javi (Tech Lead)" role="Rebel Leader" onClick={() => setCalling("Javi")} />
                             <ContactItem name="Ana (Senior)" role="Peacemaker" onClick={() => setCalling("Ana")} />
                             <ContactItem name="Sofia (PO)" role="Bureaucrat" onClick={() => setCalling("Sofia")} />
                             <ContactItem name="RRHH Global" role="Do Not Call" onClick={() => {}} disabled />
                        </div>
                    </div>
                     {/* Tab Bar Mock */}
                    <div className="border-t border-slate-200 p-2 flex justify-around text-[10px] text-slate-400 pb-safe">
                        <div className="flex flex-col items-center gap-1"><span className="text-lg">★</span>Favorites</div>
                        <div className="flex flex-col items-center gap-1"><span className="text-lg">🕒</span>Recents</div>
                        <div className="flex flex-col items-center gap-1 text-blue-500"><span className="text-lg">👥</span>Contacts</div>
                        <div className="flex flex-col items-center gap-1"><span className="text-lg">罒</span>Keypad</div>
                        <div className="flex flex-col items-center gap-1"><span className="text-lg">oo</span>Voicemail</div>
                    </div>
                </>
            )}
        </div>
    );
};

const ContactItem: React.FC<{ name: string, role: string, onClick: () => void, disabled?: boolean }> = ({ name, role, onClick, disabled }) => (
    <div 
        onClick={!disabled ? onClick : undefined}
        className={`flex items-center gap-4 p-3 border-b border-slate-100 cursor-pointer ${disabled ? 'opacity-50' : 'hover:bg-slate-50'}`}
    >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${disabled ? 'bg-slate-300' : 'bg-gradient-to-tr from-slate-400 to-slate-600'}`}>
            {name[0]}
        </div>
        <div>
            <h3 className="font-bold text-slate-800 text-sm">{name}</h3>
            <p className="text-xs text-slate-500">{role}</p>
        </div>
    </div>
);
