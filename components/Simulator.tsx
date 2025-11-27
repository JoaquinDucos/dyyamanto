import React, { useState, useEffect, useMemo } from 'react';
import { GameState, Level } from '../types';
import JengaBlock from './JengaBlock';
import SimulatorHUD from './SimulatorHUD';
import SimulatorCard from './SimulatorCard';

// Updated data structure with balanced values and risk indicators
const GAME_LEVELS: Level[] = [
  {
    id: 1,
    title: "El Dilema de los KPIs",
    description: "El directorio exige 'eficiencia'. El equipo amenaza con rebelarse si se imponen métricas absurdas.",
    hint: "La confianza es la moneda más valiosa.",
    options: [
      { 
        text: "Imponer métricas duras (Líneas de código/día).", 
        stabilityImpact: -25, 
        moraleImpact: -30, 
        feedback: "💥 Error Crítico. El equipo siente que violaste la 'Confianza'. La productividad bajó por rebelión.", 
        theory: "Teoría de Cambio (Lewin)",
        theoryWhy: "Impusiste una fase de 'Cambio' agresiva sin antes 'Descongelar' las creencias del grupo. Generaste resistencia."
      },
      { 
        text: "Negociar: 'Métricas de Salud' del equipo.", 
        stabilityImpact: 10, 
        moraleImpact: 15, 
        feedback: "✅ Éxito. Convertiste el control en transparencia compartida.", 
        theory: "Gestión Participativa",
        theoryWhy: "Al involucrar a los empleados (Justicia Procedimental), reduces la resistencia y alineas objetivos."
      },
      { 
        text: "Ignorarlo y proteger al equipo.", 
        stabilityImpact: -15, 
        moraleImpact: 10, 
        feedback: "⏳ Temporal. El equipo está feliz, pero los inversores sospechan.", 
        theory: "Gestión de Límites",
        theoryWhy: "Actuaste como escudo, protegiendo la moral a corto plazo, pero arriesgando la viabilidad externa."
      }
    ]
  },
  {
    id: 2,
    title: "La Vuelta a la Oficina",
    description: "Se vence el alquiler. Hay opción de renovar o pasar a 'Full Remote'.",
    hint: "Los rituales definen la cultura, no las paredes.",
    options: [
      { 
        text: "Híbrido forzado (3 días).", 
        stabilityImpact: -20, 
        moraleImpact: -25, 
        feedback: "📉 Mala decisión. Hubo renuncias clave.", 
        theory: "Disonancia Cognitiva",
        theoryWhy: "Predicas autonomía pero obligas presencialidad. Esa incoherencia rompe el contrato psicológico."
      },
      { 
        text: "Full Remote + Retiros Trimestrales.", 
        stabilityImpact: 15, 
        moraleImpact: 20, 
        feedback: "🏆 Visión. Ahorro de costos y libertad.", 
        theory: "Cultura Fuerte vs Débil",
        theoryWhy: "Reemplazaste el control físico por rituales de socialización intensos, fortaleciendo la cohesión."
      },
      { 
        text: "Encuesta vinculante.", 
        stabilityImpact: 5, 
        moraleImpact: 10, 
        feedback: "🆗 Democrático. Valoraron la voz.", 
        theory: "Justicia Procedimental",
        theoryWhy: "El proceso de decisión compartido valida el estatus de los empleados y aumenta el compromiso."
      }
    ]
  },
  {
    id: 3,
    title: "Crisis de Burnout",
    description: "Proyecto 'Apex' atrasado. El equipo trabaja 12hs diarias y está al límite.",
    hint: "Un equipo quemado no innova, solo sobrevive.",
    options: [
      { 
        text: "Exigir 'Crunch Time' (Fines de semana).", 
        stabilityImpact: -15, 
        moraleImpact: -40, 
        feedback: "⚠️ Peligroso. La calidad cae en picada.", 
        theory: "Modelo Demanda-Control",
        theoryWhy: "Aumentar demandas sin dar control lleva al agotamiento inevitable (Burnout)."
      },
      { 
        text: "Recortar alcance (Negociar MVP).", 
        stabilityImpact: 10, 
        moraleImpact: 20, 
        feedback: "🛡️ Excelente. Priorizaste al equipo.", 
        theory: "Liderazgo de Servicio",
        theoryWhy: "Remover obstáculos y proteger al equipo demuestra que el bienestar es un valor real."
      },
      { 
        text: "Contratar externos urgentes.", 
        stabilityImpact: 5, 
        moraleImpact: -10, 
        feedback: "😐 Parche. El equipo se siente invadido.", 
        theory: "Ley de Brooks",
        theoryWhy: "Añadir mano de obra a un proyecto atrasado lo atrasa más por el costo de coordinación."
      }
    ]
  },
  {
    id: 4,
    title: "Integración de IA",
    description: "IA puede hacer el 40% del trabajo junior. Inversores quieren reducir costos.",
    hint: "La tecnología debe potenciar, no reemplazar.",
    options: [
      { 
        text: "Despedir Juniors y automatizar.", 
        stabilityImpact: -30, 
        moraleImpact: -40, 
        feedback: "🤖 Pánico. Seniors temen ser los siguientes.", 
        theory: "Contrato Psicológico",
        theoryWhy: "Rompiste la promesa de seguridad. La confianza tarda años en construirse y segundos en destruirse."
      },
      { 
        text: "Capacitar 'AI Pilots' (Upskilling).", 
        stabilityImpact: 15, 
        moraleImpact: 15, 
        feedback: "🚀 Innovación. Oportunidad de desarrollo.", 
        theory: "Organización que Aprende",
        theoryWhy: "Transformaste una amenaza en aprendizaje, fomentando la maestría personal."
      },
      { 
        text: "Crear equipo experimental aislado.", 
        stabilityImpact: 5, 
        moraleImpact: 0, 
        feedback: "🧪 Cauteloso pero lento.", 
        theory: "Ambidestrez Organizacional",
        theoryWhy: "Separar exploración de explotación es seguro, pero crea silos culturales."
      }
    ]
  },
  {
    id: 5,
    title: "El 'Rockstar' Tóxico",
    description: "Tu mejor programador es brillante pero humilla a sus compañeros.",
    hint: "La manzana podrida pudre el cajón.",
    options: [
      { 
        text: "Despedirlo inmediatamente.", 
        stabilityImpact: -5, 
        moraleImpact: 25, 
        feedback: "✂️ Valiente. El equipo respira.", 
        theory: "Normas de Grupo",
        theoryWhy: "Reafirmas los límites culturales. El rendimiento grupal supera al individuo tóxico."
      },
      { 
        text: "Ignorarlo (Produce demasiado bien).", 
        stabilityImpact: 5, 
        moraleImpact: -30, 
        feedback: "☠️ Hipocresía. Valores rotos.", 
        theory: "Incongruencia de Valores",
        theoryWhy: "Legitimar lo tóxico por resultados erosiona la seguridad psicológica."
      },
      { 
        text: "Coaching y ultimátum.", 
        stabilityImpact: 0, 
        moraleImpact: 5, 
        feedback: "🤝 Justo. Oportunidad de cambio.", 
        theory: "Refuerzo y Feedback",
        theoryWhy: "Corrección progresiva. Es justo dar una oportunidad, pero con límites claros."
      }
    ]
  },
  {
    id: 6,
    title: "Salarios Transparentes",
    description: "Se filtró la planilla de sueldos. Hay inequidades y enojo.",
    hint: "La luz del sol es el mejor desinfectante.",
    options: [
      { 
        text: "Caza de brujas (Buscar al culpable).", 
        stabilityImpact: -25, 
        moraleImpact: -40, 
        feedback: "☠️ Ambiente de terror.", 
        theory: "Seguridad Psicológica",
        theoryWhy: "Castigar al mensajero en lugar de abordar el problema sistémico destruye la confianza."
      },
      { 
        text: "Nivelación Pública y Transparencia.", 
        stabilityImpact: 10, 
        moraleImpact: 20, 
        feedback: "⚖️ Justicia Radical. Sanador.", 
        theory: "Teoría de la Equidad",
        theoryWhy: "Restaurar el equilibrio de forma transparente elimina la percepción de injusticia."
      },
      { 
        text: "Ajustes privados (1 a 1).", 
        stabilityImpact: 5, 
        moraleImpact: -5, 
        feedback: "🤫 Opaco. La desconfianza persiste.", 
        theory: "Justicia Distributiva",
        theoryWhy: "Arreglaste el dinero pero no el proceso. El secreto mantiene la sospecha."
      }
    ]
  }
];

interface SimulatorProps {
    onBack: () => void;
    globalStability: number;
    globalMorale: number;
    setGlobalStability: (val: number | ((prev: number) => number)) => void;
    setGlobalMorale: (val: number | ((prev: number) => number)) => void;
    unlockBadge: (id: string) => void;
}

const Simulator: React.FC<SimulatorProps> = ({ 
    onBack, 
    globalStability, 
    globalMorale, 
    setGlobalStability, 
    setGlobalMorale,
    unlockBadge 
}) => {
  const [levelIndex, setLevelIndex] = useState(0);
  const [gameState, setGameState] = useState<GameState>(GameState.INTRO);
  const [feedback, setFeedback] = useState<string>("");
  const [theory, setTheory] = useState<string>("");
  const [theoryWhy, setTheoryWhy] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastImpact, setLastImpact] = useState<{stability: number, morale: number}>({stability: 0, morale: 0});
  const [hintUsed, setHintUsed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [randomEvent, setRandomEvent] = useState<{text: string, impact: number} | null>(null);

  const trajectories = useMemo(() => {
    return Array.from({ length: 9 }).map(() => ({
      x: (Math.random() - 0.5) * 600,
      y: 200 + Math.random() * 400,
      r: (Math.random() - 0.5) * 360
    }));
  }, [gameState === GameState.INTRO]);

  const currentLevel = GAME_LEVELS[levelIndex];
  
  const getBgColor = () => {
    if (globalMorale > 70) return 'from-indigo-950 via-slate-900 to-indigo-950';
    if (globalMorale > 40) return 'from-slate-900 via-stone-800 to-slate-900';
    return 'from-red-950 via-rose-950 to-slate-900';
  };

  useEffect(() => {
    if (showFeedback || gameState === GameState.INTRO) return;

    if (globalStability <= 0 || globalMorale <= 0) {
        if (gameState !== GameState.COLLAPSING && gameState !== GameState.LOST) {
            setGameState(GameState.COLLAPSING);
            setTimeout(() => setGameState(GameState.LOST), 1500);
        }
    } else if (levelIndex >= GAME_LEVELS.length && gameState !== GameState.WON) {
        setGameState(GameState.WON);
        unlockBadge('SURVIVOR'); // Win the game
        if (globalMorale > 80) unlockBadge('PEOPLE_FIRST');
        if (globalStability > 80) unlockBadge('ARCHITECT');
        if (streak > 4) unlockBadge('CONSISTENT');
    }
  }, [globalStability, globalMorale, levelIndex, showFeedback, gameState, streak]);

  const handleChoice = (optionIndex: number) => {
    if (!currentLevel) return;
    const selected = currentLevel.options[optionIndex];
    setLastImpact({ stability: selected.stabilityImpact, morale: selected.moraleImpact });
    
    if (selected.stabilityImpact > 0 && selected.moraleImpact > 0) {
        setStreak(s => {
            const newStreak = s + 1;
            if (newStreak === 3) unlockBadge('MOMENTUM');
            return newStreak;
        });
    } else {
        setStreak(0);
    }

    // Specific Badge Logic based on Level ID and Choice
    if (currentLevel.id === 3 && optionIndex === 1) unlockBadge('SERVANT_LEADER'); // Recortar alcance
    if (currentLevel.id === 5 && optionIndex === 0) unlockBadge('CULTURE_GUARD'); // Despedir Rockstar
    if (currentLevel.id === 6 && optionIndex === 1) unlockBadge('TRANSPARENCY'); // Salarios públicos

    setGlobalStability(prev => Math.min(100, Math.max(0, prev + selected.stabilityImpact)));
    setGlobalMorale(prev => Math.min(100, Math.max(0, prev + selected.moraleImpact)));

    setFeedback(selected.feedback);
    setTheory(selected.theory);
    setTheoryWhy(selected.theoryWhy || "");
    setShowFeedback(true);
  };

  const nextLevel = () => {
    setShowFeedback(false);
    setHintUsed(false);
    if (globalStability <= 0 || globalMorale <= 0) return;

    if (Math.random() > 0.8 && levelIndex < GAME_LEVELS.length - 1) {
         triggerRandomEvent();
    } else {
         setLevelIndex(prev => prev + 1);
    }
  };

  const triggerRandomEvent = () => {
      const events = [
          { text: "📉 Caída de AWS: Estrés masivo.", impact: -5, type: 'morale' },
          { text: "🐦 Tweet Viral: Orgullo.", impact: 10, type: 'morale' },
          { text: "💸 Recorte de Presupuesto.", impact: -5, type: 'stability' },
      ];
      const evt = events[Math.floor(Math.random() * events.length)];
      setRandomEvent({ text: evt.text, impact: evt.impact });
      
      if (evt.type === 'morale') setGlobalMorale(m => Math.min(100, Math.max(0, m + evt.impact)));
      else setGlobalStability(s => Math.min(100, Math.max(0, s + evt.impact)));
      
      setGameState(GameState.EVENT);
      unlockBadge('CHAOS_MANAGER');
  };

  const nextLevelDirect = () => {
      setRandomEvent(null);
      setGameState(GameState.PLAYING);
      setLevelIndex(prev => prev + 1);
  };

  const restart = () => {
      setLevelIndex(0);
      setGlobalStability(100);
      setGlobalMorale(90); 
      setStreak(0);
      setGameState(GameState.INTRO);
      setShowFeedback(false);
      setHintUsed(false);
  };

  const useHint = () => {
      if (!hintUsed && globalMorale > 10) {
          setGlobalMorale(m => m - 5);
          setHintUsed(true);
      }
  };

  const isCollapsing = gameState === GameState.COLLAPSING || gameState === GameState.LOST;
  const tiltAngle = (100 - globalStability) * 0.2 * (levelIndex % 2 === 0 ? 1 : -1);

  return (
    <div className={`h-full w-full bg-gradient-to-br ${getBgColor()} text-white flex flex-col relative overflow-hidden font-sans transition-all duration-1000`}>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      <SimulatorHUD 
        stability={globalStability}
        morale={globalMorale}
        level={Math.min(levelIndex + 1, GAME_LEVELS.length)}
        totalLevels={GAME_LEVELS.length}
        streak={streak}
        onBack={onBack}
      />

      <div className="flex-1 relative flex items-center justify-center min-h-0 w-full z-10">
         <div 
            className="w-48 sm:w-56 transition-all duration-700 ease-out relative perspective-1000"
            style={{ 
                transform: isCollapsing 
                    ? 'translateY(100px)' 
                    : `rotate(${tiltAngle}deg) scale(${1 + (100-globalStability)*0.002}) translateY(${gameState === GameState.PLAYING ? '-10%' : '0'})`, 
                opacity: (gameState === GameState.INTRO || gameState === GameState.EVENT) ? 0.3 : 1
            }}
        >
            <div className={`h-6 w-full -ml-[2%] bg-slate-800 rounded-lg mb-2 shadow-2xl border-t border-slate-600 transition-opacity duration-300 ${isCollapsing ? 'opacity-0' : 'opacity-100'}`}></div>

            <div className="flex flex-col-reverse gap-1 perspective-origin-bottom">
                <JengaBlock type="value" label="PROPÓSITO" stability={globalStability} index={0} isFalling={isCollapsing} trajectory={trajectories[0]} />
                <JengaBlock type="value" label="CONFIANZA" stability={globalStability} index={1} isFalling={isCollapsing} trajectory={trajectories[1]} />
                <JengaBlock type="practice" label="HORIZONTALIDAD" stability={globalStability} index={2} isFalling={isCollapsing} trajectory={trajectories[2]} />
                <JengaBlock type="practice" label="REMOTO" stability={globalStability} index={3} isFalling={isCollapsing} trajectory={trajectories[3]} />
                <JengaBlock type="result" label="AGILIDAD" stability={globalStability} index={4} isFalling={isCollapsing} trajectory={trajectories[4]} />
                {levelIndex > 2 && <JengaBlock type={globalMorale < 50 ? 'danger' : 'practice'} label="CLIMA" stability={globalStability} index={5} isFalling={isCollapsing} trajectory={trajectories[5]} />}
                {levelIndex > 4 && <JengaBlock type="displaced" label="LIDERAZGO" stability={globalStability} index={6} isFalling={isCollapsing} trajectory={trajectories[6]} />}
                {levelIndex > 5 && <JengaBlock type="result" label="TALENTO" stability={globalStability} index={7} isFalling={isCollapsing} trajectory={trajectories[7]} />}
            </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-end pb-safe z-30 shrink-0 relative px-4 mb-4">
         <SimulatorCard 
            gameState={gameState}
            currentLevel={currentLevel}
            randomEvent={randomEvent}
            feedback={feedback}
            theory={theory}
            theoryWhy={theoryWhy}
            showFeedback={showFeedback}
            hintUsed={hintUsed}
            isCollapsing={isCollapsing}
            stability={globalStability}
            morale={globalMorale}
            lastImpact={lastImpact}
            levelIndex={levelIndex}
            totalLevels={GAME_LEVELS.length}
            onStart={() => setGameState(GameState.PLAYING)}
            onChoice={handleChoice}
            onNext={nextLevel}
            onContinue={nextLevelDirect}
            onRestart={restart}
            onBack={onBack}
            onUseHint={useHint}
         />
      </div>
    </div>
  );
};

export default Simulator;