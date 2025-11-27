
import React from 'react';

interface LandingProps {
  onNavigate: (view: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  return (
    <div className="h-full bg-white flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-slate-50 to-white -z-10"></div>

      <div className="max-w-md w-full space-y-8 animate-fade-in flex flex-col h-full justify-center">
        
        <div className="space-y-2 shrink-0">
            <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-xl shadow-indigo-200 mb-6">
                💎
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">DYAMANTO</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Experiencia Interactiva</p>
            <p className="text-slate-400 text-[10px]">Comportamiento Organizacional 2025</p>
        </div>

        <div className="space-y-4 relative z-10 w-full">
            <p className="text-slate-600 text-sm font-medium mb-4">Selecciona tu módulo:</p>

            <div className="grid gap-4">
                <button 
                  onClick={() => onNavigate('simulator')} 
                  className="group relative w-full flex items-center p-4 bg-slate-900 rounded-3xl overflow-hidden hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl shadow-slate-200"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 group-hover:from-indigo-900 group-hover:to-purple-900 transition-colors duration-500"></div>
                    <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl mr-4 relative z-10 backdrop-blur-sm border border-white/10">
                        🏗️
                    </div>
                    <div className="text-left relative z-10 flex-1">
                        <h3 className="font-bold text-white text-base">Simulador de CEO</h3>
                        <p className="text-slate-400 text-[11px] group-hover:text-indigo-200 transition-colors">Equilibra Estructura y Moral</p>
                    </div>
                    <span className="text-slate-600 relative z-10 group-hover:text-white transition-colors">→</span>
                </button>

                <button 
                  onClick={() => onNavigate('leaks')} 
                  className="group relative w-full flex items-center p-4 bg-white border border-slate-100 rounded-3xl overflow-hidden hover:border-green-200 hover:bg-green-50/50 active:scale-95 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                    <div className="h-12 w-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl mr-4">
                        🕵️
                    </div>
                    <div className="text-left flex-1">
                        <h3 className="font-bold text-slate-900 text-base">Los Leaks</h3>
                        <p className="text-slate-500 text-[11px]">Gestiona la crisis del chat</p>
                    </div>
                    <span className="text-slate-300 group-hover:text-green-500 transition-colors">→</span>
                </button>

                <button 
                  onClick={() => onNavigate('dashboard')} 
                  className="group relative w-full flex items-center p-4 bg-white border border-slate-100 rounded-3xl overflow-hidden hover:border-indigo-200 hover:bg-indigo-50/50 active:scale-95 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                    <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mr-4">
                        📊
                    </div>
                    <div className="text-left flex-1">
                        <h3 className="font-bold text-slate-900 text-base">Mapa Cultural</h3>
                        <p className="text-slate-500 text-[11px]">Explora el ADN Dyamanto</p>
                    </div>
                    <span className="text-slate-300 group-hover:text-indigo-500 transition-colors">→</span>
                </button>
            </div>
        </div>

        <div className="text-[10px] text-slate-400 pt-4 shrink-0">
            <p className="opacity-50 mb-2 font-medium">Desarrollado por el equipo:</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-[250px] mx-auto opacity-70">
                <span>Branca</span>•<span>Ducos</span>•<span>Martínez P.</span>•<span>Varela V.</span>•<span>Yennaccaro</span>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Landing;
