
import React, { useState, useEffect, useMemo } from 'react';
import { GameState, Level } from '../types';
import JengaBlock from './JengaBlock';
import SimulatorHUD from './SimulatorHUD';
import SimulatorCard from './SimulatorCard';

// Updated data structure with detailed theoretical explanations
const GAME_LEVELS: Level[] = [
  {
    id: 1,
    title: "El Dilema de los KPIs",
    description: "El directorio exige 'eficiencia' inmediata. El equipo de desarrollo amenaza con rebelarse si se imponen métricas absurdas como líneas de código.",
    hint: "La cultura de Dyamanto se basa en la confianza, no en el control.",
    options: [
      { 
        text: "Imponer métricas duras (Líneas de código/día).", 
        stabilityImpact: -40, 
        moraleImpact: -50, 
        feedback: "💥 Error Crítico. El equipo siente que violaste la 'Confianza'. La productividad bajó por rebelión.", 
        theory: "Teoría de Cambio (Lewin)",
        theoryWhy: "Impusiste una fase de 'Cambio' agresiva sin antes 'Descongelar' las creencias del grupo. Al aumentar la fuerza coercitiva, solo generaste una fuerza de resistencia igual u opuesta."
      },
      { 
        text: "Negociar: 'Métricas de Salud' definidas por el equipo.", 
        stabilityImpact: 10, 
        moraleImpact: 20, 
        feedback: "✅ Éxito. Convertiste el control en un ejercicio de transparencia compartida.", 
        theory: "Gestión Participativa",
        theoryWhy: "Al involucrar a los empleados en el diseño del control (Justicia Procedimental), reduces la resistencia al cambio y alineas los objetivos personales con los de la organización."
      },
      { 
        text: "Ignorarlo y proteger al equipo.", 
        stabilityImpact: -10, 
        moraleImpact: 10, 
        feedback: "⏳ Temporal. El equipo está feliz, pero los inversores sospechan.", 
        theory: "Gestión de Límites (Boundary Spanning)",
        theoryWhy: "Actuaste como escudo, lo cual protege la moral a corto plazo, pero al aislar al equipo de la realidad externa (el directorio), arriesgas la viabilidad sistémica de la empresa."
      }
    ]
  },
  {
    id: 2,
    title: "La Vuelta a la Oficina",
    description: "Se vence el alquiler de la oficina. Hay opción de renovar o pasar a 'Full Remote'.",
    hint: "El espacio físico no define la cultura, pero los rituales sí.",
    options: [
      { 
        text: "Híbrido forzado (3 días).", 
        stabilityImpact: -30, 
        moraleImpact: -40, 
        feedback: "📉 Mala decisión. Dos Tech Leads renunciaron.", 
        theory: "Disonancia Cognitiva",
        theoryWhy: "Si predicas 'Autonomía' (Valor Adoptado) pero obligas a la presencialidad sin motivo (Artefacto), creas una incoherencia cultural que rompe el Contrato Psicológico."
      },
      { 
        text: "Full Remote + Retiros Trimestrales.", 
        stabilityImpact: 10, 
        moraleImpact: 30, 
        feedback: "🏆 Visión. Ahorraste costos y reforzaste la libertad.", 
        theory: "Cultura Fuerte vs Débil",
        theoryWhy: "Reemplazaste el control físico (débil) por rituales intensos de socialización (retiros), lo cual fortalece la cohesión sin sacrificar la autonomía valorada."
      },
      { 
        text: "Encuesta vinculante.", 
        stabilityImpact: 5, 
        moraleImpact: 15, 
        feedback: "🆗 Democrático. Valoraron la voz.", 
        theory: "Justicia Procedimental",
        theoryWhy: "A veces el resultado importa menos que el proceso. Permitir que el equipo decida valida su estatus y pertenencia, aumentando el compromiso con la decisión final."
      }
    ]
  },
  {
    id: 3,
    title: "Crisis de Burnout",
    description: "Proyecto 'Apex' atrasado. El cliente amenaza. El equipo trabaja 12hs diarias y está al límite.",
    hint: "Un equipo quemado no innova, solo sobrevive.",
    options: [
      { 
        text: "Exigir 'Crunch Time' (Fines de semana).", 
        stabilityImpact: -25, 
        moraleImpact: -70, 
        feedback: "⚠️ Peligroso. La calidad del código cae en picada.", 
        theory: "Modelo Demanda-Control",
        theoryWhy: "Aumentaste las demandas laborales sin aumentar el control o los recursos del equipo. Esto lleva inevitablemente a la tensión psicológica y al agotamiento (Burnout)."
      },
      { 
        text: "Recortar alcance (Negociar MVP).", 
        stabilityImpact: 15, 
        moraleImpact: 30, 
        feedback: "🛡️ Excelente. Priorizaste al equipo sobre el ego.", 
        theory: "Liderazgo de Servicio",
        theoryWhy: "Al remover obstáculos y proteger al equipo de demandas externas irreales, demuestras que el bienestar es un valor real, no solo un slogan, aumentando la lealtad."
      },
      { 
        text: "Contratar externos urgentes.", 
        stabilityImpact: 5, 
        moraleImpact: -10, 
        feedback: "😐 Parche. El equipo se siente invadido.", 
        theory: "Ley de Brooks",
        theoryWhy: "Añadir mano de obra a un proyecto de software atrasado lo atrasa más, debido a la complejidad de la comunicación y la curva de aprendizaje (Costo de Coordinación)."
      }
    ]
  },
  {
    id: 4,
    title: "Integración de IA",
    description: "IA puede hacer el 40% del trabajo junior. Inversores quieren reducir costos ya.",
    hint: "La tecnología debe potenciar, no reemplazar el alma.",
    options: [
      { 
        text: "Despedir Juniors y automatizar.", 
        stabilityImpact: -50, 
        moraleImpact: -60, 
        feedback: "🤖 Pánico. Seniors temen ser los siguientes.", 
        theory: "Violación del Contrato Psicológico",
        theoryWhy: "Rompiste la promesa implícita de seguridad y carrera. La confianza organizacional tarda años en construirse y segundos en destruirse."
      },
      { 
        text: "Capacitar 'AI Pilots' (Upskilling).", 
        stabilityImpact: 20, 
        moraleImpact: 20, 
        feedback: "🚀 Innovación. Oportunidad de desarrollo.", 
        theory: "Organización que Aprende (Senge)",
        theoryWhy: "Transformaste una amenaza externa en una oportunidad de aprendizaje. Fomentar la maestría personal aumenta la motivación intrínseca."
      },
      { 
        text: "Crear equipo experimental aislado.", 
        stabilityImpact: 10, 
        moraleImpact: 5, 
        feedback: "🧪 Cauteloso pero lento.", 
        theory: "Ambidestrez Organizacional",
        theoryWhy: "Separaste la explotación (negocio actual) de la exploración (IA). Es seguro, pero puede crear silos culturales entre 'los innovadores' y 'los viejos'."
      }
    ]
  },
  {
    id: 5,
    title: "El 'Rockstar' Tóxico",
    description: "Tu mejor programador es técnicamente brillante pero humilla a sus compañeros.",
    hint: "La manzana podrida pudre el cajón entero.",
    options: [
      { 
        text: "Despedirlo inmediatamente.", 
        stabilityImpact: -10, 
        moraleImpact: 40, 
        feedback: "✂️ Valiente. El equipo respira aliviado.", 
        theory: "Normas de Grupo",
        theoryWhy: "Al expulsar al desviado que viola las normas de respeto, reafirmas los límites culturales. El rendimiento del grupo supera al del individuo tóxico."
      },
      { 
        text: "Ignorarlo (Produce demasiado bien).", 
        stabilityImpact: 10, 
        moraleImpact: -50, 
        feedback: "☠️ Hipocresía. Valores rotos.", 
        theory: "Incongruencia de Valores",
        theoryWhy: "Demostraste que los resultados importan más que los valores. Esto legitima el comportamiento tóxico y erosiona la seguridad psicológica del resto."
      },
      { 
        text: "Coaching y ultimátum.", 
        stabilityImpact: 5, 
        moraleImpact: 10, 
        feedback: "🤝 Justo. Oportunidad de cambio.", 
        theory: "Refuerzo y Feedback",
        theoryWhy: "Aplicas corrección progresiva. Es justo dar una oportunidad, pero debe quedar claro que la competencia técnica no excusa la incompetencia emocional."
      }
    ]
  },
  {
    id: 6,
    title: "El Consultor Externo",
    description: "Viene un experto de Big Tech queriendo cambiar procesos por los de un libro.",
    hint: "La cultura se cultiva, no se importa.",
    options: [
      { 
        text: "Darle autoridad total.", 
        stabilityImpact: -20, 
        moraleImpact: -20, 
        feedback: "📚 Fracaso. Cada sistema es único.", 
        theory: "Ajuste Cultural",
        theoryWhy: "Intentar 'cortar y pegar' cultura de otra empresa ignora la historia y los supuestos básicos de Dyamanto. Genera rechazo inmunológico organizacional."
      },
      { 
        text: "Diagnóstico primero (Escuchar).", 
        stabilityImpact: 10, 
        moraleImpact: 10, 
        feedback: "🧠 Sabio. Entender antes de actuar.", 
        theory: "Investigación-Acción",
        theoryWhy: "El consultor efectivo facilita que la organización se entienda a sí misma (Schein), en lugar de imponer soluciones externas ('Doctor-Paciente')."
      },
      { 
        text: "Rechazarlo.", 
        stabilityImpact: -5, 
        moraleImpact: 5, 
        feedback: "🔒 Cerrado. Perdiste aprendizaje.", 
        theory: "Síndrome 'No inventado aquí'",
        theoryWhy: "Rechazar ideas solo por venir de afuera es una defensa del ego grupal que lleva a la ceguera estratégica y al estancamiento."
      }
    ]
  },
  {
    id: 7,
    title: "Salarios Transparentes",
    description: "Alguien filtró la planilla de sueldos. Hay inequidades claras y enojo.",
    hint: "La luz del sol es el mejor desinfectante.",
    options: [
      { 
        text: "Caza de brujas (Buscar al culpable).", 
        stabilityImpact: -50, 
        moraleImpact: -70, 
        feedback: "☠️ Ambiente de terror.", 
        theory: "Seguridad Psicológica (Edmondson)",
        theoryWhy: "Castigar al mensajero (o filtrador) en lugar de abordar el problema sistémico (inequidad) destruye la confianza y silencia futuros problemas."
      },
      { 
        text: "Nivelación Pública y Transparencia.", 
        stabilityImpact: 15, 
        moraleImpact: 30, 
        feedback: "⚖️ Justicia Radical. Sanador.", 
        theory: "Teoría de la Equidad (Adams)",
        theoryWhy: "Al restaurar el equilibrio entre inputs y outputs de forma transparente, eliminas la percepción de injusticia y recuperas la motivación."
      },
      { 
        text: "Ajustes privados (1 a 1).", 
        stabilityImpact: 5, 
        moraleImpact: -10, 
        feedback: "🤫 Opaco. La desconfianza persiste.", 
        theory: "Justicia Distributiva vs Procedimental",
        theoryWhy: "Arreglaste el dinero (distributiva) pero no el proceso (procedimental). El secreto mantiene la sospecha de que el sistema sigue siendo injusto."
      }
    ]
  },
  {
    id: 8,
    title: "Diversidad e Inclusión",
    description: "Equipo 90% hombres. Candidatos finales: Un amigo referido vs Una mujer experta.",
    hint: "La homogeneidad mata la creatividad.",
    options: [
      { 
        text: "Contratar al amigo (Cultural Fit).", 
        stabilityImpact: -15, 
        moraleImpact: 0, 
        feedback: "🚫 Estancamiento. Más de lo mismo.", 
        theory: "Pensamiento de Grupo (Groupthink)",
        theoryWhy: "Priorizar la comodidad y la afinidad sobre la diversidad reduce la fricción cognitiva necesaria para la innovación y la resolución compleja de problemas."
      },
      { 
        text: "Contratar experta (Cultural Add).", 
        stabilityImpact: 15, 
        moraleImpact: 10, 
        feedback: "🌍 Crecimiento. Diversidad cognitiva.", 
        theory: "Diversidad Cognitiva",
        theoryWhy: "No buscas alguien que 'encaje' (Fit), sino que 'sume' (Add). Perspectivas diferentes previenen puntos ciegos estratégicos."
      },
      { 
        text: "Contratar ambos.", 
        stabilityImpact: -10, 
        moraleImpact: 15, 
        feedback: "💰 Caro pero efectivo.", 
        theory: "Holgura Organizacional (Slack)",
        theoryWhy: "Tener recursos extra (holgura) permite experimentar y absorber shocks, aunque la eficiencia financiera a corto plazo disminuya."
      }
    ]
  },
  {
    id: 9,
    title: "Oferta de Compra",
    description: "Big Tech quiere comprar Dyamanto. Todos se harían ricos, pero pierden autonomía.",
    hint: "¿Cuál es el propósito real de la organización?",
    options: [
      { 
        text: "Vender y cobrar.", 
        stabilityImpact: -20, 
        moraleImpact: -50, 
        feedback: "💸 Rico pero vacío. Éxodo de talento.", 
        theory: "Motivación Intrínseca vs Extrínseca",
        theoryWhy: "El dinero (extrínseco) no sostiene el compromiso a largo plazo. Al vender el propósito (intrínseco), mataste el 'alma' de la empresa."
      },
      { 
        text: "Rechazar para mantener la cultura.", 
        stabilityImpact: 20, 
        moraleImpact: 60, 
        feedback: "💎 Identidad Pura. Celebración épica.", 
        theory: "Compromiso Afectivo",
        theoryWhy: "Reafirmar la identidad organizacional sobre el beneficio económico genera una lealtad emocional profunda (Engagement) inigualable."
      },
      { 
        text: "Joint Venture.", 
        stabilityImpact: 10, 
        moraleImpact: -10, 
        feedback: "🤝 Híbrido. Burocracia sube.", 
        theory: "Dependencia de Recursos",
        theoryWhy: "Aseguras recursos, pero la dependencia externa fuerza a la organización a modificar su estructura para satisfacer a quien controla esos recursos."
      }
    ]
  },
  {
    id: 10,
    title: "El Futuro",
    description: "Debes definir la visión a 5 años para cerrar tu legado.",
    hint: "El futuro es descentralizado.",
    options: [
      { 
        text: "Maximizar beneficios (IPO).", 
        stabilityImpact: -10, 
        moraleImpact: -10, 
        feedback: "📉 Aburrido. El fin de la magia.", 
        theory: "Primacía del Accionista",
        theoryWhy: "El enfoque tradicional de Friedman. Funciona financieramente, pero en la economía del conocimiento, desinspira al talento creativo."
      },
      { 
        text: "Convertirse en DAO (Cooperativa Digital).", 
        stabilityImpact: 20, 
        moraleImpact: 20, 
        feedback: "🚀 Futuro. Propiedad compartida.", 
        theory: "Gestión Autogestionada (Teal)",
        theoryWhy: "Evolucionar hacia la autogestión total (Laloux) distribuye el poder y la responsabilidad, creando un organismo vivo altamente adaptable."
      },
      { 
        text: "Expansión agresiva global.", 
        stabilityImpact: -20, 
        moraleImpact: 10, 
        feedback: "🌍 Riesgo cultural alto.", 
        theory: "Dilema de Crecimiento",
        theoryWhy: "Escalar rápido suele diluir la cultura fundacional. La estructura crece más rápido que la socialización, creando fragmentación."
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
  const [theoryWhy, setTheoryWhy] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastImpact, setLastImpact] = useState<{stability: number, morale: number}>({stability: 0, morale: 0});
  const [hintUsed, setHintUsed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [randomEvent, setRandomEvent] = useState<{text: string, impact: number} | null>(null);

  // Physics trajectories memoized
  const trajectories = useMemo(() => {
    return Array.from({ length: 9 }).map(() => ({
      x: (Math.random() - 0.5) * 600,
      y: 200 + Math.random() * 400,
      r: (Math.random() - 0.5) * 360
    }));
  }, [gameState === GameState.INTRO]);

  const currentLevel = GAME_LEVELS[levelIndex];
  
  // Dynamic Background
  const getBgColor = () => {
    if (morale > 70) return 'from-indigo-950 via-slate-900 to-indigo-950';
    if (morale > 40) return 'from-slate-900 via-stone-800 to-slate-900';
    return 'from-red-950 via-rose-950 to-slate-900';
  };

  // Game Loop Checks
  useEffect(() => {
    if ((stability <= 0 || morale <= 0) && gameState !== GameState.COLLAPSING && gameState !== GameState.LOST) {
      setGameState(GameState.COLLAPSING);
      setTimeout(() => setGameState(GameState.LOST), 1500);
    } else if (levelIndex >= GAME_LEVELS.length && !showFeedback && stability > 0 && morale > 0) {
      setGameState(GameState.WON);
    }
  }, [stability, morale, levelIndex, showFeedback, gameState]);

  // Events Logic
  const triggerRandomEvent = () => {
      const chance = Math.random();
      if (chance > 0.85 && levelIndex > 1 && levelIndex < 8) {
          const events = [
              { text: "📉 Caída de AWS: Estrés masivo.", impact: -10, type: 'morale' },
              { text: "🐦 Tweet Viral: Orgullo.", impact: 10, type: 'morale' },
              { text: "💸 Recorte de Presupuesto.", impact: -10, type: 'stability' },
              { text: "🦠 Gripe en la oficina.", impact: -5, type: 'stability' }
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
    
    if (selected.stabilityImpact > 0 && selected.moraleImpact > 0) setStreak(s => s + 1);
    else setStreak(0);

    setStability(prev => Math.min(100, Math.max(0, prev + selected.stabilityImpact)));
    setMorale(prev => Math.min(100, Math.max(0, prev + selected.moraleImpact)));

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        if (selected.stabilityImpact < 0) navigator.vibrate([100, 50, 100]);
        else navigator.vibrate(50);
    }

    setFeedback(selected.feedback);
    setTheory(selected.theory);
    setTheoryWhy(selected.theoryWhy || "");
    setShowFeedback(true);
  };

  const nextLevel = () => {
    setShowFeedback(false);
    setHintUsed(false);
    if (stability > 0 && morale > 0) triggerRandomEvent();
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
  };

  const isCollapsing = gameState === GameState.COLLAPSING || gameState === GameState.LOST;
  const tiltAngle = (100 - stability) * 0.2 * (levelIndex % 2 === 0 ? 1 : -1);

  return (
    <div className={`h-full w-full bg-gradient-to-br ${getBgColor()} text-white flex flex-col relative overflow-hidden font-sans transition-all duration-1000`}>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      {/* 1. TOP HUD - Respects Notch */}
      <SimulatorHUD 
        stability={stability}
        morale={morale}
        level={Math.min(levelIndex + 1, GAME_LEVELS.length)}
        totalLevels={GAME_LEVELS.length}
        streak={streak}
        onBack={onBack}
      />

      {/* 2. GAME AREA (Tower) - Flexible */}
      <div className="flex-1 relative flex items-center justify-center min-h-0 w-full z-10">
         <div 
            className="w-48 sm:w-56 transition-all duration-700 ease-out relative perspective-1000"
            style={{ 
                transform: isCollapsing 
                    ? 'translateY(100px)' 
                    : `rotate(${tiltAngle}deg) scale(${1 + (100-stability)*0.002}) translateY(${gameState === GameState.PLAYING ? '-15%' : '0'})`, 
                opacity: (gameState === GameState.INTRO || gameState === GameState.EVENT) ? 0.3 : 1
            }}
        >
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
      </div>

      {/* 3. INTERACTION AREA (Card) - Bottom safe aligned */}
      <div className="w-full flex justify-center items-end pb-safe z-30 shrink-0 relative px-4 mb-2">
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
            stability={stability}
            morale={morale}
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
