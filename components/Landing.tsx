
import React from 'react';

interface LandingProps {
  onNavigate: (view: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  return (
    <div className="h-full bg-slate-50 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      
      <div className="max-w-md w-full space-y-8 animate-fade-in flex flex-col h-full justify-center">
        
        <div className="space-y-2 shrink-0">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">DYAMANTO</h1>
            <p className="text-slate-600 font-medium uppercase tracking-widest text-xs">Experiencia Interactiva</p>
            <p className="text-slate-400 text-[10px]">Comportamiento Organizacional 2025</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-indigo-100 border border-slate-100 space-y-6 relative overflow-hidden shrink-0">
            {/* Decorative background blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <p className="text-slate-600 leading-relaxed font-light text-sm relative z-10">
                Bienvenidos al informe final. <br/>
                <span className="font-semibold text-slate-800">Elige tu desafío:</span>
            </p>

            <div className="grid gap-4 relative z-10">
                <button 
                  onClick={() => onNavigate('simulator')} 
                  className="group relative w-full flex items-center p-4 bg-slate-900 rounded-2xl overflow-hidden hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-slate-900/20"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center text-xl mr-3 relative z-10 group-hover:bg-white/20 transition-colors">
                        🏗️
                    </div>
                    <div className="text-left relative z-10 flex-1">
                        <h3 className="font-bold text-white text-base">Simulador de CEO</h3>
                        <p className="text-slate-400 text-[10px] group-hover:text-indigo-100">Evita el colapso cultural.</p>
                    </div>
                    <span className="text-slate-500 relative z-10 group-hover:text-white">→</span>
                </button>

                <button 
                  onClick={() => onNavigate('leaks')} 
                  className="group relative w-full flex items-center p-4 bg-white border-2 border-slate-100 rounded-2xl overflow-hidden hover:border-indigo-500 hover:bg-slate-50 active:scale-95 transition-all duration-300 shadow-sm"
                >
                    <div className="h-10 w-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl mr-3">
                        🕵️
                    </div>
                    <div className="text-left flex-1">
                        <h3 className="font-bold text-slate-900 text-base">Los Leaks</h3>
                        <p className="text-slate-500 text-[10px]">Chat confidencial.</p>
                    </div>
                    <span className="text-slate-300 group-hover:text-indigo-500">→</span>
                </button>
            </div>
        </div>

        <div className="text-xs text-slate-400 pt-4 shrink-0">
            <p className="opacity-50 mb-1">Equipo:</p>
            <p className="font-medium">Branca, Ducos, Martínez Pagola, Varela Villarruel, Yennaccaro</p>
        </div>

      </div>
    </div>
  );
};

export default Landing;
