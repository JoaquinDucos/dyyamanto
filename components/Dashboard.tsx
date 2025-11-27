
import React, { useState } from 'react';

const Dashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'lab' | 'game' | 'theory'>('lab');

  return (
    <div className="h-full bg-slate-50 flex flex-col font-sans relative overflow-hidden">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 flex items-center justify-between shrink-0 z-20">
        <button onClick={onBack} className="text-2xl w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors active:scale-90">
          🔙
        </button>
        <div className="text-center">
          <h2 className="font-black text-lg text-indigo-900 tracking-tight">DYAMANTO LAB</h2>
          <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Centro de Investigación</p>
        </div>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-24 relative">
        {activeTab === 'lab' && <ScheinXRay />}
        {activeTab === 'game' && <CoherenceGame />}
        {activeTab === 'theory' && <TheoryDatabase />}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 pb-safe flex justify-around items-center z-30 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
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
    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all w-20 ${active ? 'text-indigo-600 bg-indigo-50 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
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
        <p className="text-xs text-slate-500 max-w-xs mx-auto">
          Utiliza el deslizador para penetrar las capas de la cultura organizacional (Modelo de Schein).
        </p>
      </div>

      {/* X-Ray Viewport */}
      <div className="relative h-80 w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-900">
        
        {/* Layer 1: Artifacts (Visible) */}
        <div 
          className="absolute inset-0 bg-white p-6 flex flex-col items-center justify-center text-center transition-opacity duration-300"
          style={{ opacity: Math.max(0, 1 - depth / 50) }}
        >
          <div className="text-6xl mb-4">🏢</div>
          <h4 className="text-xl font-bold text-slate-800 mb-2">ARTEFACTOS</h4>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>👕 Hoodies & Stickers</li>
            <li>🕹️ Jenga Tower</li>
            <li>💬 Slack & Emojis</li>
            <li>💻 Macs & Setup Remoto</li>
          </ul>
          <div className="absolute top-4 right-4 bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded">VISIBLE</div>
        </div>

        {/* Layer 2: Values (Espoused) */}
        <div 
            className="absolute inset-0 bg-indigo-600 p-6 flex flex-col items-center justify-center text-center transition-opacity duration-300"
            style={{ opacity: Math.max(0, Math.min(1, (depth - 25) / 50)) }}
        >
            <div className="text-6xl mb-4 text-indigo-200">📜</div>
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
          <div className="text-6xl mb-4 text-rose-300">🧠</div>
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
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">
            <span>Superficie</span>
            <span>Profundidad</span>
        </div>
        <input 
            type="range" 
            min="0" 
            max="100" 
            value={depth} 
            onChange={(e) => setDepth(parseInt(e.target.value))}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <p className="text-center text-xs font-bold text-indigo-600 mt-2">
            Nivel de Análisis: {depth < 30 ? 'Observación' : depth < 70 ? 'Entrevistas' : 'Inmersión Total'}
        </p>
      </div>

      {/* Authors Credit */}
      <div className="mt-8 pt-8 border-t border-slate-200">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Equipo de Investigación</h4>
        <div className="grid grid-cols-2 gap-2">
            {['Branca, Belén', 'Ducos, Joaquín', 'Martínez P, Gonzalo', 'Varela V, Santiago', 'Yennaccaro, Francisco'].map((name, i) => (
                <div key={i} className="bg-white border border-slate-200 p-2 rounded-lg text-[10px] font-medium text-slate-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
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
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const QUESTIONS = [
    {
      problem: "Rumores de pasillo sobre despidos masivos.",
      solution: "Transparencia Radical (Comunicar hechos reales)",
      trap: "Silencio Administrativo (Evitar pánico)",
      theory: "Seguridad Psicológica"
    },
    {
      problem: "Un Senior comete un error que cuesta 5k USD.",
      solution: "Post-Mortem sin culpa (Aprendizaje)",
      trap: "Descuento de sueldo (Castigo)",
      theory: "Mentalidad de Crecimiento vs Fija"
    },
    {
      problem: "El equipo rechaza usar una nueva herramienta impuesta.",
      solution: "Descongelamiento (Lewin) - Dialogar primero",
      trap: "Imposición por Autoridad (Fuerza)",
      theory: "Gestión del Cambio"
    },
    {
      problem: "Disputa entre dos áreas por recursos.",
      solution: "Visión Sistémica (Objetivo Común)",
      trap: "Competencia Interna (Ganar-Perder)",
      theory: "Pensamiento Sistémico (Senge)"
    }
  ];

  const handleAnswer = (isCorrect: boolean) => {
    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(s => s + 1);
    
    setTimeout(() => {
        setFeedback(null);
        if (questionIdx < QUESTIONS.length - 1) {
            setQuestionIdx(q => q + 1);
        } else {
            // Reset logic could go here
            setQuestionIdx(0); 
            setScore(0);
        }
    }, 1500);
  };

  const currentQ = QUESTIONS[questionIdx];

  return (
    <div className="p-6 h-full flex flex-col items-center justify-center animate-slide-up">
        
        <div className="w-full max-w-sm relative">
            {/* Score Card */}
            <div className="absolute -top-12 right-0 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                Score: {score}/{QUESTIONS.length}
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center border-2 border-slate-100 relative overflow-hidden">
                {feedback && (
                    <div className={`absolute inset-0 flex items-center justify-center z-10 ${feedback === 'correct' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                        <span className="text-6xl animate-pop">{feedback === 'correct' ? '✅' : '❌'}</span>
                    </div>
                )}
                
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Dilema #{questionIdx + 1}</h4>
                <div className="text-4xl mb-6">🌩️</div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{currentQ.problem}</h3>
                <p className="text-xs text-slate-500 mb-8">¿Cuál es la solución coherente con Dyamanto?</p>

                <div className="space-y-3">
                    {/* Randomize order logic simplified for demo */}
                    <button onClick={() => handleAnswer(true)} className="w-full p-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs transition-colors border border-indigo-200">
                        {currentQ.solution}
                    </button>
                    <button onClick={() => handleAnswer(false)} className="w-full p-4 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-xl text-xs transition-colors border border-slate-200">
                        {currentQ.trap}
                    </button>
                </div>
            </div>
             <p className="text-[10px] text-center mt-6 text-slate-400">
                Basado en: {currentQ.theory}
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
                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${t.color}`}>
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
            
            <div className="p-4 bg-slate-100 rounded-xl text-center mt-8">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Materia</p>
                <p className="font-bold text-slate-800 text-sm">Comportamiento Organizacional</p>
                <p className="text-xs text-slate-500 mt-1">2do Cuatrimestre 2025</p>
            </div>
        </div>
    );
};

export default Dashboard;
