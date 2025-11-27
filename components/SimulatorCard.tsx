
import React from 'react';
import { GameState, Level } from '../types';

interface SimulatorCardProps {
  gameState: GameState;
  currentLevel?: Level;
  randomEvent: { text: string; impact: number } | null;
  feedback: string;
  theory: string;
  theoryWhy?: string;
  showFeedback: boolean;
  hintUsed: boolean;
  isCollapsing: boolean;
  stability: number;
  morale: number;
  levelIndex: number;
  totalLevels: number;
  lastImpact: { stability: number; morale: number };
  onStart: () => void;
  onChoice: (index: number) => void;
  onNext: () => void;
  onContinue: () => void;
  onRestart: () => void;
  onBack: () => void;
  onUseHint: () => void;
}

const SimulatorCard: React.FC<SimulatorCardProps> = ({
  gameState,
  currentLevel,
  randomEvent,
  feedback,
  theory,
  theoryWhy,
  showFeedback,
  hintUsed,
  isCollapsing,
  stability,
  morale,
  lastImpact,
  onStart,
  onChoice,
  onNext,
  onContinue,
  onRestart,
  onBack,
  onUseHint
}) => {

  // --- INTRO STATE ---
  if (gameState === GameState.INTRO) {
    return (
      <div className="glass bg-slate-900/60 p-8 rounded-[2rem] text-center shadow-2xl animate-slide-up w-full max-w-sm backdrop-blur-xl border border-white/10">
        <div className="text-7xl mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transform hover:scale-110 transition-transform cursor-default">🏛️</div>
        <h2 className="text-3xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200 tracking-tight">
          CEO Simulator
        </h2>
        <p className="text-indigo-100/80 text-sm mb-8 leading-relaxed font-medium px-4">
          Equilibra la <strong>Estructura</strong> y la <strong>Cultura</strong>. <br/>
          Tus decisiones construyen o destruyen la organización.
        </p>
        <button 
          onClick={onStart}
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] text-white tracking-widest active:scale-95 transition-all text-sm uppercase"
        >
          Iniciar Gestión
        </button>
      </div>
    );
  }

  // --- EVENT STATE ---
  if (gameState === GameState.EVENT && randomEvent) {
    return (
      <div className="glass bg-slate-800/90 p-8 rounded-[2rem] text-center shadow-2xl animate-pop border border-yellow-500/30 w-full max-w-sm backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-yellow-500/5 pointer-events-none"></div>
        <div className="text-6xl mb-4 animate-shake filter drop-shadow-lg">⚡</div>
        <h3 className="text-sm font-black text-yellow-400 uppercase tracking-widest mb-4 border-b border-yellow-500/20 pb-2">Evento Aleatorio</h3>
        <p className="text-white text-lg font-medium mb-6 leading-snug">{randomEvent.text}</p>
        <div className={`font-mono font-bold text-xl mb-8 py-2 px-4 rounded-lg inline-block ${randomEvent.impact < 0 ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
          Impacto: {randomEvent.impact > 0 ? '+' : ''}{randomEvent.impact}
        </div>
        <button onClick={onContinue} className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-xl text-white font-bold transition-all active:scale-95 text-sm uppercase tracking-wide">
          Continuar
        </button>
      </div>
    );
  }

  // --- COLLAPSE / LOST ---
  if (gameState === GameState.LOST || gameState === GameState.COLLAPSING) {
     return (
        <div className="bg-rose-950/80 backdrop-blur-xl p-8 rounded-[2rem] text-center shadow-2xl border border-rose-500/50 animate-slide-up z-50 w-full max-w-sm">
            <div className="text-7xl mb-4 animate-shake grayscale-[0.2]">🏚️</div>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tighter">COLAPSO</h2>
            <div className="w-16 h-1 bg-rose-500 mx-auto mb-4 rounded-full"></div>
            <p className="text-rose-100 text-sm mb-8 font-medium leading-relaxed">
                {stability <= 0 ? "La falta de procesos sólidos derrumbó la estructura." : "El equipo renunció masivamente. Sin cultura no hay empresa."}
            </p>
            <button onClick={onRestart} className="bg-rose-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-rose-900/50 hover:bg-rose-500 transition-all w-full uppercase tracking-widest active:scale-95 text-sm">
                Reconstruir
            </button>
        </div>
     );
  }

  // --- WIN ---
  if (gameState === GameState.WON) {
      return (
        <div className="bg-emerald-900/80 backdrop-blur-xl p-8 rounded-[2rem] text-center shadow-2xl border border-emerald-400/50 animate-slide-up z-50 w-full max-w-sm">
            <div className="text-7xl mb-4 animate-bounce filter drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]">💎</div>
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">CULTURA DE DIAMANTE</h2>
            <p className="text-emerald-100/80 text-xs mb-6 uppercase tracking-wide">Organización Resiliente</p>
            
            <div className="grid grid-cols-2 gap-4 text-xs bg-black/20 p-4 rounded-2xl mb-8 border border-white/5">
                <div className="flex flex-col items-center">
                    <p className="text-emerald-400/70 font-bold uppercase text-[10px] mb-1">Estabilidad</p>
                    <p className="text-2xl text-emerald-300 font-black">{stability}%</p>
                </div>
                <div className="flex flex-col items-center border-l border-white/10">
                    <p className="text-pink-400/70 font-bold uppercase text-[10px] mb-1">Moral</p>
                    <p className="text-2xl text-pink-300 font-black">{morale}%</p>
                </div>
            </div>
            <button onClick={onBack} className="bg-white text-emerald-900 px-8 py-4 rounded-2xl font-bold shadow-xl w-full hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-wider">
                Volver al Hub
            </button>
        </div>
      );
  }

  // --- PLAYING: FEEDBACK (With Detailed Theory) ---
  if (gameState === GameState.PLAYING && showFeedback) {
      const isBad = feedback.includes('Error') || feedback.includes('Colapso') || feedback.includes('Mala') || feedback.includes('Pánico');
      return (
        <div className="glass bg-slate-900/90 text-white p-5 rounded-[2rem] shadow-2xl animate-pop border border-white/10 w-full max-w-sm backdrop-blur-xl overflow-hidden flex flex-col max-h-[70vh]">
             
             {/* Score Header */}
             <div className="flex justify-center gap-8 mb-4 bg-black/30 p-2 rounded-xl border border-white/5 shrink-0">
                <div className={`flex flex-col items-center animate-slide-up ${lastImpact.stability >= 0 ? 'text-indigo-400' : 'text-red-400'}`}>
                    <span className="text-xl font-black tracking-tighter">{lastImpact.stability > 0 ? '+' : ''}{lastImpact.stability}</span>
                    <span className="text-[9px] uppercase font-bold opacity-60 tracking-wider">Estabilidad</span>
                </div>
                <div className="w-px bg-white/10 h-full"></div>
                <div className={`flex flex-col items-center animate-slide-up ${lastImpact.morale >= 0 ? 'text-pink-400' : 'text-orange-400'}`} style={{animationDelay: '100ms'}}>
                    <span className="text-xl font-black tracking-tighter">{lastImpact.morale > 0 ? '+' : ''}{lastImpact.morale}</span>
                    <span className="text-[9px] uppercase font-bold opacity-60 tracking-wider">Moral</span>
                </div>
             </div>

             <div className="flex-1 overflow-y-auto pr-1">
                 {/* Outcome Text */}
                 <div className="mb-4 flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-xl shrink-0 mt-0.5 filter drop-shadow-lg">{isBad ? '❌' : '✅'}</span>
                    <p className="font-bold text-sm leading-snug text-slate-100 pt-1">{feedback}</p>
                 </div>

                 {/* Theory Deep Dive */}
                 <div className="bg-indigo-950/60 p-4 rounded-xl mb-4 border border-indigo-500/30 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 text-6xl opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500">🎓</div>
                    
                    <div className="relative z-10">
                        <p className="text-[9px] text-indigo-300 font-black uppercase mb-1 tracking-widest flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                            Teoría Aplicada
                        </p>
                        <p className="text-sm font-bold text-white mb-2 leading-tight">"{theory}"</p>
                        
                        {/* The "Why" Section */}
                        {theoryWhy && (
                            <div className="mt-2 pt-2 border-t border-indigo-500/20">
                                 <p className="text-[11px] text-indigo-100 leading-relaxed">
                                    <span className="text-indigo-400 font-bold uppercase text-[9px] mr-1 block mb-0.5">Análisis:</span>
                                    {theoryWhy}
                                 </p>
                            </div>
                        )}
                    </div>
                 </div>
             </div>

             <button 
                onClick={onNext}
                className="w-full bg-white text-slate-900 font-black py-3.5 rounded-xl hover:bg-indigo-50 transition-all shadow-lg active:scale-95 text-sm uppercase tracking-wide shrink-0 mt-2"
            >
                Continuar
            </button>
        </div>
      );
  }

  // --- PLAYING: QUESTION ---
  if (gameState === GameState.PLAYING && currentLevel) {
      return (
        <div className="glass bg-slate-800/80 backdrop-blur-xl text-white p-6 rounded-[2rem] shadow-2xl animate-slide-up border border-white/10 w-full max-w-md flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-4 shrink-0">
                <h3 className="text-xs font-black text-indigo-200 uppercase tracking-widest truncate pr-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    {currentLevel.title}
                </h3>
                {!hintUsed && (
                    <button onClick={onUseHint} className="text-[10px] bg-indigo-500/20 text-indigo-200 px-3 py-1.5 rounded-full border border-indigo-500/50 hover:bg-indigo-500/30 transition-colors whitespace-nowrap font-bold active:scale-95 flex items-center gap-1">
                        💡 Pista
                    </button>
                )}
                {hintUsed && <span className="text-[10px] text-yellow-300 animate-pulse whitespace-nowrap font-bold bg-yellow-500/10 px-2 py-1 rounded">Asesor Activo</span>}
            </div>
            
            {/* Description area */}
            <div className="mb-5 shrink-0">
                 {hintUsed && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-xl mb-3 text-[11px] text-yellow-100 italic flex gap-2 items-start animate-fade-in">
                         <span className="not-italic text-lg">👨‍🏫</span>
                         <span className="leading-snug">"{currentLevel.hint}"</span>
                    </div>
                )}
                <p className="text-slate-200 text-sm leading-relaxed font-medium">
                    {currentLevel.description}
                </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-2.5">
                {currentLevel.options.map((opt, i) => (
                    <button 
                        key={i}
                        onClick={() => onChoice(i)}
                        className="text-left p-4 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400/50 hover:bg-white/10 transition-all active:scale-[0.98] text-xs font-medium flex items-center group relative overflow-hidden shrink-0 shadow-md"
                    >
                        {/* Hover Effect */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <span className="mr-3 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-lg text-[10px] font-bold shadow-md group-hover:scale-110 transition-transform border border-white/10">
                            {String.fromCharCode(65 + i)}
                        </span>
                        <span className="leading-snug opacity-90 group-hover:opacity-100 transition-opacity">{opt.text}</span>
                    </button>
                ))}
            </div>
        </div>
      );
  }

  return null;
};

export default SimulatorCard;
