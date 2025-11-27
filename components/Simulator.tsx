
import React, { useState, useEffect, useMemo } from 'react';
import { GameState, Level } from '../types';
import JengaBlock from './JengaBlock';

const GAME_LEVELS: Level[] = [
  {
    id: 1,
    title: "El Dilema de los KPIs",
    description: "El directorio de Dyamanto exige 'eficiencia' inmediata. El equipo de desarrollo amenaza con rebelarse si se imponen métricas absurdas.",
    hint: "La cultura de Dyamanto se basa en la confianza, no en el control.",
    options: [
      {
        text: "Imponer métricas duras (Líneas de código/día).",
        stabilityImpact: -40,
        moraleImpact: -50,
        feedback: "💥 Error Crítico. El equipo siente que violaste la 'Confianza'. La productividad bajó por rebelión.",
        theory: "Teoría de Lewin: Aumentaste la presión sin descongelar la cultura."
      },
      {
        text: "Negociar: 'Métricas de Salud' definidas por el equipo.",
        stabilityImpact: 10,
        moraleImpact: 20,
        feedback: "✅ Éxito. Convertiste el control en un ejercicio de transparencia compartida.",
        theory: "Participación: Reduce la resistencia al cambio."
      },
      {
        text: "Ignorar al directorio y proteger al equipo (Delay).",
        stabilityImpact: -10,
        moraleImpact: 10,
        feedback: "⏳ Temporal. El equipo está feliz, pero los inversores sospechan. Ganaste tiempo.",
        theory: "Gestión de Stakeholders: A veces hay que comprar paz social."
      }
    ]
  },
  {
    id: 2,
    title: "La Vuelta a la Oficina",
    description: "Se vence el alquiler de la oficina vieja. Hay opción de renovar por mucho dinero o pasar a 'Full Remote'.",
    hint: "El espacio físico no define la cultura.",
    options: [
      {
        text: "Volver a la oficina 3 días (Híbrido forzado).",
        stabilityImpact: -30,
        moraleImpact: -40,
        feedback: "📉 Mala decisión. Dos Tech Leads renunciaron. La cultura Dyamanto es asincrónica.",
        theory: "Disonancia Cognitiva: La práctica contradice los valores declarados."
      },
      {
        text: "Full Remote + Retiros Trimestrales (Off-sites).",
        stabilityImpact: 10,
        moraleImpact: 30,
        feedback: "🏆 Visión. Ahorraste costos y reforzaste la cultura de libertad.",
        theory: "Cultura Fuerte: Los rituales (retiros) reemplazan al control físico."
      },
      {
        text: "Encuesta vinculante: Que el equipo vote.",
        stabilityImpact: 5,
        moraleImpact: 15,
        feedback: "🆗 Democrático. El resultado fue mixto, pero valoraron la voz.",
        theory: "Justicia Procedimental: El proceso es tan importante como el resultado."
      }
    ]
  },
  {
    id: 3,
    title: "Crisis de Burnout",
    description: "El proyecto 'Apex' está atrasado. El cliente amenaza con irse. El equipo está trabajando 12 horas diarias.",
    hint: "Un equipo quemado no innova.",
    options: [
      {
        text: "Exigir 'Crunch Time' (Fines de semana).",
        stabilityImpact: -25,
        moraleImpact: -70,
        feedback: "⚠️ Peligroso. La gente está agotada. La calidad del código cae en picada.",
        theory: "Estrés Laboral: Superaste la capacidad de afrontamiento del grupo."
      },
      {
        text: "Recortar alcance (MVP) y mantener fecha.",
        stabilityImpact: 15,
        moraleImpact: 30,
        feedback: "🛡️ Excelente. Priorizaste al equipo sobre el contrato. La lealtad sube.",
        theory: "Liderazgo de Servicio: Cuidar al equipo asegura sostenibilidad."
      },
      {
        text: "Contratar freelancers externos de urgencia.",
        stabilityImpact: 5,
        moraleImpact: -10,
        feedback: "😐 Parche. Ayudó a entregar, pero el equipo se sintió invadido.",
        theory: "Cohesión Grupal: Los externos pueden romper la dinámica interna."
      }
    ]
  },
  {
    id: 4,
    title: "Integración de IA",
    description: "La IA puede hacer el 40% del trabajo junior. Los inversores quieren reducir costos de personal.",
    hint: "La tecnología debe potenciar, no reemplazar.",
    options: [
      {
        text: "Despedir Juniors y automatizar.",
        stabilityImpact: -50,
        moraleImpact: -60,
        feedback: "🤖 Pánico. Los Seniors temen ser los siguientes. El clima es fúnebre.",
        theory: "Contrato Psicológico: Roto. La lealtad desapareció."
      },
      {
        text: "Capacitar a todos como 'AI Pilots'.",
        stabilityImpact: 20,
        moraleImpact: 20,
        feedback: "🚀 Innovación. Transformaste una amenaza en una oportunidad de desarrollo.",
        theory: "Organización que Aprende (Senge): Adaptabilidad constante."
      },
      {
        text: "Formar un equipo experimental de IA.",
        stabilityImpact: 10,
        moraleImpact: 5,
        feedback: "🧪 Cauteloso. Buen primer paso, pero lento.",
        theory: "Gestión del Cambio: Los pilotos reducen el riesgo percibido."
      }
    ]
  },
  {
    id: 5,
    title: "Salud Mental",
    description: "Un desarrollador clave (Rockstar) es brillante pero tóxico con sus compañeros.",
    hint: "La manzana podrida pudre el cajón.",
    options: [
      {
        text: "Despedirlo. La cultura es innegociable.",
        stabilityImpact: -10,
        moraleImpact: 40,
        feedback: "✂️ Valiente. Perdiste velocidad técnica, pero el equipo respira aliviado.",
        theory: "Normas Grupales: Tolerancia cero a la toxicidad refuerza valores."
      },
      {
        text: "Ignorarlo. Produce demasiado bien.",
        stabilityImpact: 10,
        moraleImpact: -50,
        feedback: "☠️ Hipocresía. Los valores de 'Respeto' son papel mojado.",
        theory: "Incongruencia Cultural: Lo que haces habla más fuerte que lo que dices."
      },
      {
        text: "Coaching obligatorio y ultimátum.",
        stabilityImpact: 5,
        moraleImpact: 10,
        feedback: "🤝 Justo. Le diste una oportunidad de corregir.",
        theory: "Desarrollo Organizacional: Creer en la capacidad de cambio de las personas."
      }
    ]
  },
  {
    id: 6,
    title: "El Consultor Externo",
    description: "Contratan a un experto que quiere cambiar todos los procesos de Dyamanto por los de un libro.",
    hint: "La cultura no se importa, se cultiva.",
    options: [
      {
        text: "Darle autoridad total. 'Él es el experto'.",
        stabilityImpact: -20,
        moraleImpact: -20,
        feedback: "📚 Fracaso. La cultura no se importa, se construye.",
        theory: "Cultura Organizacional: Cada sistema social es único."
      },
      {
        text: "Diagnóstico primero: 'Observa 2 semanas'.",
        stabilityImpact: 10,
        moraleImpact: 10,
        feedback: "🧠 Sabio. Diagnóstico antes de intervención.",
        theory: "Modelo de Schein: Entender las presunciones básicas antes de tocar los artefactos."
      },
      {
        text: "Rechazarlo. 'Nosotros sabemos más'.",
        stabilityImpact: -5,
        moraleImpact: 5,
        feedback: "🔒 Cerrado. Reforzaste la identidad, pero perdiste aprendizaje.",
        theory: "Síndrome de 'No inventado aquí': Rechazo a lo externo."
      }
    ]
  },
  {
    id: 7,
    title: "Salarios Transparentes",
    description: "Se filtró una planilla de sueldos. Hay inequidades grandes entre gente del mismo rango.",
    hint: "La justicia percibida es crítica.",
    options: [
      {
        text: "Caza de brujas: Despedir al filtrador.",
        stabilityImpact: -50,
        moraleImpact: -70,
        feedback: "☠️ Tóxico. Mataste al mensajero pero el problema sigue. Miedo generalizado.",
        theory: "Seguridad Psicológica: Destruida completamente."
      },
      {
        text: "Nivelación Salarial Pública (Open Salary).",
        stabilityImpact: 15,
        moraleImpact: 30,
        feedback: "⚖️ Justicia Radical. Doloroso financieramente, pero sanador culturalmente.",
        theory: "Equidad Organizacional: Fundamental para la motivación."
      },
      {
        text: "Ajustes privados 'caso por caso'.",
        stabilityImpact: 5,
        moraleImpact: -10,
        feedback: "🤫 Opaco. La desconfianza persiste.",
        theory: "Transparencia: La falta de ella genera rumores."
      }
    ]
  },
  {
    id: 8,
    title: "Diversidad e Inclusión",
    description: "El equipo es 90% hombres. Tienes 2 candidatos: un amigo de la casa y una mujer externa muy calificada.",
    hint: "La homogeneidad mata la creatividad.",
    options: [
      {
        text: "Contratar al amigo. 'Cultural fit' asegurado.",
        stabilityImpact: -15,
        moraleImpact: 0,
        feedback: "🚫 Estancamiento. Refuerzas el sesgo de afinidad. Dyamanto se vuelve un club de amigos.",
        theory: "Pensamiento de Grupo (Groupthink): La falta de diversidad reduce la innovación."
      },
      {
        text: "Contratar a la mujer. Nuevas perspectivas.",
        stabilityImpact: 15,
        moraleImpact: 10,
        feedback: "🌍 Crecimiento. La diversidad cognitiva mejora la resolución de problemas.",
        theory: "Innovación: Requiere fricción creativa y puntos de vista diversos."
      },
      {
        text: "Contratar a ambos.",
        stabilityImpact: -10,
        moraleImpact: 15,
        feedback: "💰 Caro. Resolviste el dilema gastando presupuesto extra.",
        theory: "Holgura Organizacional: Recursos extra permiten evitar conflictos."
      }
    ]
  },
  {
    id: 9,
    title: "La Oferta de Compra",
    description: "Una Big Tech quiere comprar Dyamanto. Mucho dinero, pero Dyamanto perdería su marca y autonomía.",
    hint: "El propósito es el pegamento de la organización.",
    options: [
      {
        text: "Vender. 'Es solo negocios'.",
        stabilityImpact: -20,
        moraleImpact: -50,
        feedback: "💸 Rico pero vacío. El propósito de 'Autonomía' desaparece. Éxodo masivo.",
        theory: "Propósito: El dinero es un factor higiénico, no motivacional a largo plazo."
      },
      {
        text: "Rechazar. 'Somos piratas'.",
        stabilityImpact: 20,
        moraleImpact: 60,
        feedback: "💎 Identidad Pura. El equipo celebra como si hubieran ganado el mundial.",
        theory: "Compromiso Afectivo: La gente se queda por la misión."
      },
      {
        text: "Venta parcial (Joint Venture).",
        stabilityImpact: 10,
        moraleImpact: -10,
        feedback: "🤝 Híbrido. Ganaste recursos pero perdiste agilidad.",
        theory: "Estructura: La burocracia aumenta con el tamaño."
      }
    ]
  },
  {
    id: 10,
    title: "El Futuro",
    description: "Dyamanto sobrevivió. Ahora toca definir la visión a 5 años. ¿Qué priorizas?",
    hint: "El futuro es descentralizado.",
    options: [
      {
        text: "Maximizar beneficios (Modelo Clásico).",
        stabilityImpact: -10,
        moraleImpact: -10,
        feedback: "📉 Aburrido. Volviste a la gestión tradicional.",
        theory: "Teoría Clásica vs. Contemporánea."
      },
      {
        text: "DAO (Org. Autónoma Descentralizada).",
        stabilityImpact: 20,
        moraleImpact: 20,
        feedback: "🚀 Futuro. Llevaste la 'Horizontalidad' al extremo lógico.",
        theory: "Nuevos Paradigmas Organizacionales."
      },
      {
        text: "Expansión Global Agresiva.",
        stabilityImpact: -20,
        moraleImpact: 10,
        feedback: "🌍 Riesgo. Creces rápido pero la cultura se diluye.",
        theory: "Escalabilidad Cultural: El desafío de mantener valores al crecer."
      }
    ]
  }
];

const Simulator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [levelIndex, setLevelIndex] = useState(0);
  const [stability, setStability] = useState(100);
  const [morale, setMorale] = useState(80);
  const [gameState, setGameState] = useState<GameState>(GameState.INTRO);
  const [feedback, setFeedback] = useState<string>("");
  const [theory, setTheory] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastImpact, setLastImpact] = useState<{stability: number, morale: number}>({stability: 0, morale: 0});
  const [hintUsed, setHintUsed] = useState(false);
  const [streak, setStreak] = useState(0);
  
  // Random Event State
  const [randomEvent, setRandomEvent] = useState<{text: string, impact: number} | null>(null);

  // Generate physics trajectories only once per game reset
  const trajectories = useMemo(() => {
    return Array.from({ length: 9 }).map(() => ({
      x: (Math.random() - 0.5) * 600, // Explode sideways
      y: 200 + Math.random() * 400,   // Fall down
      r: (Math.random() - 0.5) * 360  // Rotate wildly
    }));
  }, [gameState === GameState.INTRO]); // Regenerate when game restarts

  const currentLevel = GAME_LEVELS[levelIndex];
  const tiltAngle = (100 - stability) * 0.2 * (levelIndex % 2 === 0 ? 1 : -1);

  const getBgColor = () => {
    if (morale > 70) return 'from-indigo-950 via-slate-900 to-indigo-950';
    if (morale > 40) return 'from-slate-900 via-stone-800 to-slate-900';
    return 'from-red-950 via-rose-950 to-slate-900';
  };

  useEffect(() => {
    if ((stability <= 0 || morale <= 0) && gameState !== GameState.COLLAPSING && gameState !== GameState.LOST) {
      setGameState(GameState.COLLAPSING);
      setTimeout(() => setGameState(GameState.LOST), 2000); // Wait for explosion animation
    } else if (levelIndex >= GAME_LEVELS.length && !showFeedback && stability > 0 && morale > 0) {
      setGameState(GameState.WON);
    }
  }, [stability, morale, levelIndex, showFeedback, gameState]);

  const triggerRandomEvent = () => {
      const chance = Math.random();
      if (chance > 0.8 && levelIndex > 1 && levelIndex < 8) {
          const events = [
              { text: "📉 Caída de Servidores AWS: El equipo está estresado.", impact: -10, type: 'morale' },
              { text: "🐦 Tweet Viral Positivo: Orgullo de pertenencia.", impact: 10, type: 'morale' },
              { text: "💸 Inversor Retira Fondos: Ajuste de presupuesto.", impact: -10, type: 'stability' },
              { text: "🦠 Gripe estacional: 20% del equipo enfermo.", impact: -5, type: 'stability' }
          ];
          const evt = events[Math.floor(Math.random() * events.length)];
          setRandomEvent({ text: evt.text, impact: evt.impact });
          
          if (evt.type === 'morale') setMorale(m => Math.min(100, Math.max(0, m + evt.impact)));
          else setStability(s => Math.min(100, Math.max(0, s + evt.impact)));
          
          setGameState(GameState.EVENT);
      } else {
          nextLevelDirect();
      }
  };

  const handleChoice = (optionIndex: number) => {
    const selected = currentLevel.options[optionIndex];
    setLastImpact({ stability: selected.stabilityImpact, morale: selected.moraleImpact });
    
    // Check for streak (Good choices usually add morale or stability)
    if (selected.stabilityImpact > 0 && selected.moraleImpact > 0) {
        setStreak(s => s + 1);
    } else {
        setStreak(0);
    }

    setStability(prev => Math.min(100, Math.max(0, prev + selected.stabilityImpact)));
    setMorale(prev => Math.min(100, Math.max(0, prev + selected.moraleImpact)));

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        if (selected.stabilityImpact < 0) navigator.vibrate([100, 50, 100, 50, 200]);
        else navigator.vibrate(50);
    }

    setFeedback(selected.feedback);
    setTheory(selected.theory);
    setShowFeedback(true);
  };

  const nextLevel = () => {
    setShowFeedback(false);
    setHintUsed(false);
    if (stability > 0 && morale > 0) {
        triggerRandomEvent();
    }
  };

  const nextLevelDirect = () => {
      setRandomEvent(null);
      setGameState(GameState.PLAYING);
      setLevelIndex(prev => prev + 1);
  };

  const useHint = () => {
      if (!hintUsed && morale > 10) {
          setMorale(m => m - 10);
          setHintUsed(true);
      }
  };

  const restart = () => {
      setLevelIndex(0);
      setStability(100);
      setMorale(80);
      setStreak(0);
      setGameState(GameState.INTRO);
      setShowFeedback(false);
      setHintUsed(false);
  }

  const isCollapsing = gameState === GameState.COLLAPSING || gameState === GameState.LOST;

  return (
    <div className={`h-full w-full bg-gradient-to-br ${getBgColor()} text-white flex flex-col relative overflow-hidden font-sans transition-all duration-1000`}>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      {/* HUD & Navigation */}
      <div className="flex justify-between items-start p-3 pt-safe z-20 glass m-2 rounded-2xl backdrop-blur-md border-b border-white/10 shrink-0">
        
        {/* IMPROVED BACK BUTTON */}
        <button 
            onClick={onBack} 
            className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full hover:bg-white/20 transition-all active:scale-95 border border-white/5"
            aria-label="Volver"
        >
            <span className="text-xl">🏠</span>
        </button>
        
        <div className="flex flex-col flex-1 mx-3 space-y-2 mt-1 min-w-0">
            {/* Stability Bar */}
            <div className="flex flex-col">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                    <span className="text-indigo-300 truncate mr-2">Estructura</span>
                    <span>{stability}%</span>
                </div>
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-700 ease-out ${stability > 50 ? 'bg-indigo-400' : 'bg-red-500'}`} style={{ width: `${stability}%` }}></div>
                </div>
            </div>
            
            {/* Morale Bar */}
            <div className="flex flex-col">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                    <span className="text-pink-300 truncate mr-2">Moral</span>
                    <span>{morale}% {morale > 80 ? '🔥' : morale < 30 ? '😭' : '😐'}</span>
                </div>
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-700 ease-out ${morale > 50 ? 'bg-pink-400' : 'bg-orange-500'}`} style={{ width: `${morale}%` }}></div>
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-1 items-end shrink-0">
             <div className="text-xs font-black bg-white/10 px-3 py-1 rounded-lg border border-white/10 shadow-inner whitespace-nowrap">
                {Math.min(levelIndex + 1, GAME_LEVELS.length)}/10
            </div>
            {streak > 2 && <div className="text-[10px] text-yellow-300 font-bold animate-pulse whitespace-nowrap">Streak x{streak}!</div>}
        </div>
      </div>

      {/* Main Game Area - Flex & Centered for Responsiveness */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 p-4 pb-32 overflow-hidden min-h-0">
        
        {/* TOWER - SCALED FOR MOBILE */}
        <div 
            className="w-48 sm:w-56 mb-4 transition-all duration-1000 ease-out relative perspective-1000 shrink-0"
            style={{ 
                transform: isCollapsing ? 'none' : `rotate(${tiltAngle}deg) scale(${1 + (100-stability)*0.002})`,
                opacity: (gameState === GameState.INTRO || gameState === GameState.EVENT) ? 0.2 : 1
            }}
        >
             {/* Score Popup */}
             {showFeedback && (
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex gap-4 z-50 animate-pop pointer-events-none">
                    <div className={`font-black text-2xl drop-shadow-md ${lastImpact.stability >= 0 ? 'text-indigo-400' : 'text-red-500'}`}>
                        {lastImpact.stability >= 0 ? '+' : ''}{lastImpact.stability} 🏗️
                    </div>
                    <div className={`font-black text-2xl drop-shadow-md ${lastImpact.morale >= 0 ? 'text-pink-400' : 'text-orange-500'}`}>
                        {lastImpact.morale >= 0 ? '+' : ''}{lastImpact.morale} ❤️
                    </div>
                </div>
            )}

            {/* Tower Base */}
            <div className={`h-6 w-full -ml-[2%] bg-slate-800 rounded-lg mb-2 shadow-2xl border-t border-slate-600 transition-opacity duration-300 ${isCollapsing ? 'opacity-0' : 'opacity-100'}`}></div>

            <div className="flex flex-col-reverse gap-1 perspective-origin-bottom">
                <JengaBlock type="value" label="PROPÓSITO" stability={stability} index={0} isFalling={isCollapsing} trajectory={trajectories[0]} />
                <JengaBlock type="value" label="CONFIANZA" stability={stability} index={1} isFalling={isCollapsing} trajectory={trajectories[1]} />
                <JengaBlock type="practice" label="HORIZONTALIDAD" stability={stability} index={2} isFalling={isCollapsing} trajectory={trajectories[2]} />
                <JengaBlock type="practice" label="REMOTO" stability={stability} index={3} isFalling={isCollapsing} trajectory={trajectories[3]} />
                <JengaBlock type="result" label="AGILIDAD" stability={stability} index={4} isFalling={isCollapsing} trajectory={trajectories[4]} />
                {levelIndex > 2 && <JengaBlock type={morale < 50 ? 'danger' : 'practice'} label="CLIMA" stability={stability} index={5} isFalling={isCollapsing} trajectory={trajectories[5]} />}
                {levelIndex > 4 && <JengaBlock type="displaced" label="LIDERAZGO" stability={stability} index={6} isFalling={isCollapsing} trajectory={trajectories[6]} />}
                {levelIndex > 6 && <JengaBlock type="result" label="TALENTO" stability={stability} index={7} isFalling={isCollapsing} trajectory={trajectories[7]} />}
                {levelIndex > 8 && <JengaBlock type="value" label="INNOVACIÓN" stability={stability} index={8} isFalling={isCollapsing} trajectory={trajectories[8]} />}
            </div>
        </div>

        {/* UI PANELS (Absolute positioning to overlay tower on small screens) */}
        <div className="w-full max-w-sm absolute bottom-4 z-30 pb-safe">
            
            {/* INTRO */}
            {gameState === GameState.INTRO && (
                <div className="glass p-6 rounded-3xl text-center shadow-2xl animate-slide-up bg-slate-900/60 mx-4 border border-white/10">
                    <div className="text-6xl mb-4 drop-shadow-lg">🏛️</div>
                    <h2 className="text-2xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">CEO Simulator</h2>
                    <p className="text-slate-300 text-xs mb-6 leading-relaxed">
                        Equilibra la <strong>Estabilidad</strong> de la empresa y la <strong>Moral</strong> del equipo.
                    </p>
                    <button 
                        onClick={() => setGameState(GameState.PLAYING)}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-500/40 hover:scale-[1.02] text-white tracking-widest active:scale-95 transition-all"
                    >
                        INICIAR GESTIÓN
                    </button>
                </div>
            )}

            {/* EVENT */}
            {gameState === GameState.EVENT && randomEvent && (
                 <div className="glass bg-slate-800 p-6 rounded-3xl text-center shadow-2xl animate-pop border-2 border-yellow-500/50 mx-4">
                     <div className="text-5xl mb-4 animate-shake">⚡</div>
                     <h3 className="text-lg font-bold text-yellow-400 mb-2">EVENTO ALEATORIO</h3>
                     <p className="text-white text-base mb-6">{randomEvent.text}</p>
                     <div className="text-red-400 font-mono font-bold text-lg mb-6">
                         Impacto: {randomEvent.impact}
                     </div>
                     <button onClick={nextLevelDirect} className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl text-white font-bold transition-colors">
                         Continuar
                     </button>
                 </div>
            )}

            {/* PLAYING - QUESTION */}
            {gameState === GameState.PLAYING && !showFeedback && currentLevel && (
                <div className="bg-slate-800/95 backdrop-blur-md text-white p-5 rounded-3xl shadow-2xl animate-slide-up border border-white/10 mx-2">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-black text-indigo-300 leading-tight">{currentLevel.title}</h3>
                        {!hintUsed && (
                            <button onClick={useHint} className="text-[10px] bg-indigo-500/20 text-indigo-200 px-2 py-1 rounded border border-indigo-500/50 hover:bg-indigo-500/40 transition-colors whitespace-nowrap">
                                💡 Pista (-10 Moral)
                            </button>
                        )}
                        {hintUsed && <span className="text-[10px] text-yellow-300 animate-pulse whitespace-nowrap">Asesor activado</span>}
                    </div>
                    
                    {hintUsed && (
                        <div className="bg-yellow-500/10 border border-yellow-500/30 p-2 rounded-xl mb-3 text-[10px] text-yellow-200 italic">
                             "Asesor: {currentLevel.hint}"
                        </div>
                    )}

                    <p className="text-slate-300 text-xs mb-4 leading-relaxed border-l-2 border-indigo-500 pl-3">
                        {currentLevel.description}
                    </p>
                    <div className="grid gap-2 max-h-[30vh] overflow-y-auto pr-1">
                        {currentLevel.options.map((opt, i) => (
                            <button 
                                key={i}
                                onClick={() => handleChoice(i)}
                                className="text-left p-3 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400 hover:bg-white/10 transition-all active:scale-[0.98] text-xs font-medium flex items-center group relative overflow-hidden shrink-0"
                            >
                                <span className="mr-3 bg-indigo-600 text-white w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-lg text-[10px] font-bold shadow-lg group-hover:scale-110 transition-transform z-10">
                                    {String.fromCharCode(65 + i)}
                                </span>
                                <span className="z-10 relative leading-tight">{opt.text}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* PLAYING - FEEDBACK */}
            {gameState === GameState.PLAYING && showFeedback && (
                <div className="glass bg-slate-900/95 text-white p-6 rounded-3xl shadow-2xl animate-pop border border-white/20 mx-4">
                     <div className="mb-3 flex items-center gap-3">
                        <span className="text-4xl filter drop-shadow-md">
                            {feedback.includes('Error') || feedback.includes('Colapso') || feedback.includes('Mala') || feedback.includes('Pánico') ? '❌' : '✨'}
                        </span>
                        <div className="h-px bg-white/20 flex-1"></div>
                     </div>
                     <p className="font-bold text-sm mb-4 leading-snug">{feedback}</p>
                     <div className="bg-indigo-900/30 p-3 rounded-xl mb-6 border border-indigo-500/20">
                        <p className="text-[10px] text-indigo-300 font-black uppercase mb-1 tracking-widest">💡 Teoría Aplicada</p>
                        <p className="text-xs italic text-slate-300 leading-relaxed">"{theory}"</p>
                     </div>
                     <button 
                        onClick={nextLevel}
                        className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg active:scale-95 text-sm"
                    >
                        {levelIndex < GAME_LEVELS.length - 1 ? 'Siguiente Desafío →' : 'Ver Informe Final'}
                    </button>
                </div>
            )}

            {/* GAME OVER */}
            {gameState === GameState.LOST && (
                <div className="bg-rose-950/95 backdrop-blur-xl p-6 rounded-3xl text-center shadow-2xl border-2 border-rose-500 animate-slide-up z-50 mx-4">
                    <div className="text-6xl mb-4 animate-shake">🏚️</div>
                    <h2 className="text-3xl font-black text-white mb-2 tracking-tighter">COLAPSO</h2>
                    <p className="text-rose-200 text-sm mb-6 font-medium">
                        {stability <= 0 ? "La falta de procesos sólidos derrumbó la estructura." : "El equipo renunció masivamente (Moral 0)."}
                    </p>
                    <button onClick={restart} className="bg-rose-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-rose-500 transition-colors w-full uppercase tracking-widest active:scale-95 text-sm">
                        Reconstruir Dyamanto
                    </button>
                </div>
            )}

            {/* WIN */}
            {gameState === GameState.WON && (
                <div className="bg-emerald-900/95 backdrop-blur-xl p-6 rounded-3xl text-center shadow-2xl border-2 border-emerald-400 animate-slide-up z-50 mx-4">
                    <div className="text-6xl mb-4 animate-bounce">💎</div>
                    <h2 className="text-2xl font-black text-white mb-2">CULTURA DE DIAMANTE</h2>
                    <div className="grid grid-cols-2 gap-4 text-xs bg-black/30 p-4 rounded-xl mb-6 text-center font-mono">
                        <div>
                            <p className="text-slate-400">Estabilidad</p>
                            <p className="text-xl text-emerald-300 font-bold">{stability}</p>
                        </div>
                        <div>
                            <p className="text-slate-400">Moral</p>
                            <p className="text-xl text-pink-300 font-bold">{morale}</p>
                        </div>
                    </div>
                    <button onClick={onBack} className="bg-white text-emerald-900 px-8 py-4 rounded-full font-bold shadow-lg w-full hover:scale-105 transition-transform text-sm">
                        Volver al Hub
                    </button>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default Simulator;
