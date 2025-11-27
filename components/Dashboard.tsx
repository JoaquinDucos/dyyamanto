
import React, { useState, useMemo } from 'react';

const Dashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'lab' | 'game' | 'theory'>('lab');

  return (
    <div className="h-full bg-slate-50 flex flex-col font-sans relative overflow-hidden">
      {/* Header - Clean */}
      <div className="bg-white border-b border-slate-200 p-3 flex items-center justify-between shrink-0 z-20 shadow-sm">
        <button 
            onClick={onBack} 
            className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors active:scale-95"
            aria-label="Volver"
        >
          <span className="text-xl">🏠</span>
        </button>
        <div className="text-center">
          <h2 className="font-black text-base text-indigo-900 tracking-tight">DYAMANTO LAB</h2>
          <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Centro de Investigación</p>
        </div>
        <div className="w-10"></div> {/* Spacer for balance */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-24 relative bg-slate-50/50">
        {activeTab === 'lab' && <ScheinXRay />}
        {activeTab === 'game' && <CoherenceGame />}
        {activeTab === 'theory' && <TheoryDatabase />}
      </div>

      {/* Bottom Navigation - Modern */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 pb-safe flex justify-around items-center z-30 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
        <NavBtn label="Rayos X" icon="🩻" active={activeTab === 'lab'} onClick={() => setActiveTab('lab')} />
        <NavBtn label="Protocolo" icon="🧩" active={activeTab === 'game'} onClick={() => setActiveTab('game')} />
        <NavBtn label="Teoría" icon="📚" active={activeTab === 'theory'} onClick={() => setActiveTab('theory')} />
      </div>
    </div>
  );
};

const NavBtn: React.FC<{ label: string, icon: string, active: boolean, onClick: () => void }> = ({ label, icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all w-20 ${active ? 'text-indigo-600 bg-indigo-50 scale-105 shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
  >
    <span className="text-2xl">{icon}</span>
    <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

// --- SUB-COMPONENTS ---

const ScheinXRay = () => {
  const [depth, setDepth] = useState(0);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-black text-slate-800">Escáner Cultural</h3>
        <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
          Utiliza el deslizador para penetrar las capas de la cultura organizacional (Modelo de Schein).
        </p>
      </div>

      {/* X-Ray Viewport */}
      <div className="relative h-80 w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-900 group">
        
        {/* Layer 1: Artifacts (Visible) */}
        <div 
          className="absolute inset-0 bg-white p-6 flex flex-col items-center justify-center text-center transition-opacity duration-300"
          style={{ opacity: Math.max(0, 1 - depth / 50) }}
        >
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-500">🏢</div>
          <h4 className="text-xl font-bold text-slate-800 mb-2">ARTEFACTOS</h4>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>👕 Hoodies & Stickers</li>
            <li>💵 Pagos en dolares</li>
            <li>💬 Slack & Trabajo Remoto</li>
            <li>💻 Macs & Setup Remoto</li>
          </ul>
          <div className="absolute top-4 right-4 bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded">VISIBLE</div>
        </div>

        {/* Layer 2: Values (Espoused) */}
        <div 
            className="absolute inset-0 bg-indigo-600 p-6 flex flex-col items-center justify-center text-center transition-opacity duration-300"
            style={{ opacity: Math.max(0, Math.min(1, (depth - 25) / 50)) }}
        >
            <div className="text-6xl mb-4 text-indigo-200 group-hover:scale-110 transition-transform duration-500">📜</div>
            <h4 className="text-xl font-bold text-white mb-2">VALORES ADOPTADOS</h4>
            <ul className="text-sm text-indigo-100 space-y-2 font-medium">
                <li>"Confianza sobre Control"</li>
                <li>"Transparencia Radical"</li>
                <li>"Horizontalidad"</li>
            </ul>
            <div className="absolute top-4 right-4 bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded">CONSCIENTE</div>
        </div>

        {/* Layer 3: Assumptions (Deep) */}
        <div 
          className="absolute inset-0 bg-rose-900 p-6 flex flex-col items-center justify-center text-center transition-opacity duration-300"
          style={{ opacity: Math.max(0, (depth - 75) / 25) }}
        >
          <div className="text-6xl mb-4 text-rose-300 group-hover:scale-110 transition-transform duration-500">🧠</div>
          <h4 className="text-xl font-bold text-white mb-2">PRESUNCIONES BÁSICAS</h4>
          <ul className="text-sm text-rose-100 space-y-2 font-medium">
            <li>"La autoridad viene del saber, no del cargo."</li>
            <li>"El error es el costo de aprender."</li>
            <li>"La gente es buena por defecto."</li>
          </ul>
          <div className="absolute top-4 right-4 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded animate-pulse">INCONSCIENTE</div>
        </div>

        {/* Scanline Effect */}
        <div 
            className="absolute left-0 right-0 h-1 bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8)] z-10 pointer-events-none"
            style={{ top: `${depth}%` }}
        ></div>
      </div>

      {/* Control */}
      <div className="bg-white p-5 rounded-3xl shadow-lg shadow-indigo-100 border border-slate-100">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-3">
            <span>Superficie</span>
            <span>Profundidad</span>
        </div>
        <input 
            type="range" 
            min="0" 
            max="100" 
            value={depth} 
            onChange={(e) => setDepth(parseInt(e.target.value))}
            className="w-full h-4 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
        />
        <p className="text-center text-xs font-bold text-indigo-600 mt-3 bg-indigo-50 py-2 rounded-xl">
            Nivel de Análisis: {depth < 30 ? 'Observación' : depth < 70 ? 'Entrevistas' : 'Inmersión Total'}
        </p>
      </div>

      {/* Authors Credit */}
      <div className="mt-8 pt-8 border-t border-slate-200">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Equipo de Investigación</h4>
        <div className="flex flex-wrap justify-center gap-2">
            {['Branca, Belén', 'Ducos, Joaquín', 'Martínez P, Gonzalo', 'Varela V, Santiago', 'Yennaccaro, Francisco'].map((name, i) => (
                <div key={i} className="bg-white border border-slate-200 px-3 py-1.5 rounded-full text-[10px] font-medium text-slate-600 flex items-center gap-2 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    {name}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const CoherenceGame = () => {
  const [score, setScore] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const QUESTIONS = useMemo(() => [
    {
      problem: "Rumores de pasillo sobre despidos masivos.",
      solution: "Transparencia Radical (Comunicar hechos reales)",
      trap: "Gestión Centralizada (Evitar pánico)",
      theory: "Seguridad Psicológica"
    },
    {
      problem: "Un Senior comete un error que cuesta 5k USD.",
      solution: "Post-Mortem sin culpa (Aprendizaje)",
      trap: "Identificación de Responsables (Accountability)",
      theory: "Mentalidad de Crecimiento vs Fija"
    },
    {
      problem: "El equipo rechaza usar una nueva herramienta impuesta.",
      solution: "Descongelamiento (Dialogar y Vender)",
      trap: "Implementación Ágil (Fuerza por velocidad)",
      theory: "Gestión del Cambio (Lewin)"
    },
    {
      problem: "Disputa entre dos áreas por recursos.",
      solution: "Visión Sistémica (Objetivo Común)",
      trap: "Optimización por Deptos. (Eficiencia Local)",
      theory: "Pensamiento Sistémico (Senge)"
    }
  ], []);

  // Shuffle options logic (generated once per question index)
  const currentOptions = useMemo(() => {
    if (questionIdx >= QUESTIONS.length) return [];
    const q = QUESTIONS[questionIdx];
    const opts = [
        { text: q.solution, correct: true },
        { text: q.trap, correct: false }
    ];
    // Randomize simple sort
    return Math.random() > 0.5 ? opts : opts.reverse();
  }, [questionIdx, QUESTIONS]);

  const handleAnswer = (isCorrect: boolean) => {
    if (selectedAnswer !== null) return; // Prevent double click

    if (isCorrect) setScore(s => s + 1);
    
    // Slight delay to show color
    setTimeout(() => {
        if (questionIdx < QUESTIONS.length - 1) {
            setQuestionIdx(q => q + 1);
            setSelectedAnswer(null);
        } else {
            setGameFinished(true);
        }
    }, 800);
  };

  const getArchetype = () => {
      if (score === 4) return { title: "ARQUITECTO CULTURAL", icon: "🏆", desc: "Entiendes que la cultura es estrategia. Tu visión es sistémica y humana.", color: "text-emerald-600" };
      if (score >= 2) return { title: "LÍDER EN TRANSICIÓN", icon: "🌱", desc: "Tienes buenas intenciones, pero a veces caes en viejos paradigmas de control.", color: "text-yellow-600" };
      return { title: "DINOSAURIO CORPORATIVO", icon: "🦖", desc: "Tu enfoque tradicional está asfixiando la innovación. Necesitas 'descongelar' tus creencias.", color: "text-rose-600" };
  };

  const restart = () => {
      setScore(0);
      setQuestionIdx(0);
      setGameFinished(false);
      setSelectedAnswer(null);
  };

  if (gameFinished) {
      const arch = getArchetype();
      return (
          <div className="p-6 h-full flex flex-col items-center justify-center animate-slide-up text-center">
              <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-indigo-50 border border-slate-100 max-w-sm w-full">
                  <div className="text-6xl mb-4 animate-bounce">{arch.icon}</div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Tu Arquetipo de Liderazgo</p>
                  <h2 className={`text-2xl font-black mb-4 ${arch.color}`}>{arch.title}</h2>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">{arch.desc}</p>
                  <div className="bg-slate-50 rounded-xl p-3 mb-6 border border-slate-100">
                      <p className="text-slate-500 text-xs font-mono">Puntaje Final: {score}/{QUESTIONS.length}</p>
                  </div>
                  <button onClick={restart} className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all">
                      Intentar de Nuevo
                  </button>
              </div>
          </div>
      )
  }

  const currentQ = QUESTIONS[questionIdx];

  return (
    <div className="p-6 h-full flex flex-col items-center justify-center animate-slide-up">
        
        <div className="w-full max-w-sm relative">
            {/* Score Card */}
            <div className="absolute -top-12 right-0 bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg">
                Dilema {questionIdx + 1}/{QUESTIONS.length}
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-indigo-50 p-8 text-center border border-slate-100 relative overflow-hidden">
                <div className="text-4xl mb-6">⚡</div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">{currentQ.problem}</h3>
                <p className="text-xs text-slate-500 mb-8 italic">Elige la solución culturalmente coherente</p>

                <div className="space-y-3">
                    {currentOptions.map((opt, i) => (
                        <button 
                            key={i}
                            onClick={() => {
                                setSelectedAnswer(i);
                                handleAnswer(opt.correct);
                            }} 
                            disabled={selectedAnswer !== null}
                            className={`
                                w-full p-4 rounded-2xl text-xs font-bold border transition-all duration-200
                                ${selectedAnswer === i 
                                    ? (opt.correct ? 'bg-emerald-500 text-white border-emerald-500 shadow-emerald-200 shadow-lg' : 'bg-rose-500 text-white border-rose-500 shadow-rose-200 shadow-lg')
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-slate-50 shadow-sm'
                                }
                            `}
                        >
                            {opt.text}
                        </button>
                    ))}
                </div>
            </div>
             <p className="text-[10px] text-center mt-6 text-slate-400 font-medium">
                Tema: {currentQ.theory}
             </p>
        </div>
    </div>
  );
};

const TheoryDatabase = () => {
    const THEORIES = [
        {
            title: "Kurt Lewin",
            subtitle: "Gestión del Cambio",
            icon: "🧊",
            desc: "El cambio requiere tres etapas: Descongelar (romper inercia), Cambiar (nueva forma) y Recongelar (estabilizar). En Dyamanto, los 'bloques desplazados' representan la resistencia al cambio.",
            color: "bg-blue-100 text-blue-800"
        },
        {
            title: "Edgar Schein",
            subtitle: "Niveles de Cultura",
            icon: "🧅",
            desc: "La cultura tiene capas. Artefactos (lo visible), Valores (lo dicho) y Supuestos (lo inconsciente). Dyamanto falla cuando sus prácticas (oficina) contradicen sus valores (autonomía).",
            color: "bg-purple-100 text-purple-800"
        },
        {
            title: "Peter Senge",
            subtitle: "Organización que Aprende",
            icon: "🔄",
            desc: "Dyamanto aspira a ser una 'Learning Organization', donde el aprendizaje continuo y el pensamiento sistémico permiten adaptarse y crear futuro en lugar de solo reaccionar.",
            color: "bg-green-100 text-green-800"
        }
    ];

    return (
        <div className="p-6 space-y-4 animate-slide-up">
            <h3 className="font-black text-xl text-slate-800 mb-6">Base de Conocimiento</h3>
            {THEORIES.map((t, i) => (
                <div key={i} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${t.color}`}>
                            {t.icon}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800">{t.title}</h4>
                            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-2">{t.subtitle}</p>
                            <p className="text-xs text-slate-600 leading-relaxed">{t.desc}</p>
                        </div>
                    </div>
                </div>
            ))}
            
            <div className="p-4 bg-white/50 border border-slate-200 rounded-2xl text-center mt-8">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Materia</p>
                <p className="font-bold text-slate-800 text-sm">Comportamiento Organizacional</p>
                <p className="text-xs text-slate-500 mt-1">2do Cuatrimestre 2025</p>
            </div>
        </div>
    );
};

export default Dashboard;
