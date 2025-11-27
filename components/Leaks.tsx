import React, { useEffect, useState, useRef } from 'react';
import { ChatNode, Message } from '../types';
import MessageBubble from './MessageBubble';
import ChatHeader from './ChatHeader';

// Assets
const SAPEEE_IMG_URL = "https://preview.redd.it/z3nj57t6grm61.jpg?auto=webp&s=9eecb9cefdd01cd2be90c4cdc5653e300d27d37f";
const HOMER_GIF_URL = "https://media.giphy.com/media/COYGe9rZvfiaQ/giphy.gif"; 
const FIST_BUMP_URL = "https://media.giphy.com/media/Ke3CM1NVkULWo/giphy.gif"; 
const VALORANT_GIF = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZ4eGp2c3B4Z3B4Z3B4Z3B4Z3B4Z3B4Z3B4Z3B4Z3B4/3o7527pa7qs9kCG78A/giphy.gif";

// Story Data
const STORY_NODES: Record<string, ChatNode> = {
  'start': {
    id: 'start',
    messages: [
      { id: '1', role: 'dev', sender: 'Javi (Tech Lead)', text: 'Che @channel, vieron el mail de RRHH?? 😡', delay: 200 },
      { id: 'img1', role: 'dev', sender: 'Javi', type: 'image', contentUrl: SAPEEE_IMG_URL, delay: 600 },
      { id: '2', role: 'dev', sender: 'Ana', text: 'Sí, cualquiera. Dicen que hay que loguear cada 15 minutos??', delay: 1500 },
      { id: '3', role: 'dev', sender: 'Javi', text: 'Esto es micromanagement puro. Si no confían, avisen y nos vamos.', delay: 2500 },
      { id: '4', role: 'system', sender: 'System', text: '🔔 Sofia (Product Owner) está grabando un audio...', delay: 3000 },
      { id: 'audio1', role: 'manager', sender: 'Sofia', type: 'audio', contentUrl: '15s', delay: 4000 },
      { id: '6', role: 'dev', sender: 'Javi', text: 'Sofi, todo bien, pero el audio no me dice nada nuevo.', delay: 5000 },
    ],
    options: [
      { text: '⛔ Autoridad: "Las normas están para cumplirse."', nextNodeId: 'authoritarian', type: 'risky' },
      { text: '🤝 Empatía: "¿Qué proponen para medir?"', nextNodeId: 'empathic', type: 'safe' },
      { text: '😎 Meme: Mandar Sticker para relajar.', nextNodeId: 'cool_manager', type: 'neutral' }
    ]
  },
  'cool_manager': {
      id: 'cool_manager',
      messages: [
          { id: 'cm1', role: 'hero', sender: 'Tú', type: 'image', contentUrl: HOMER_GIF_URL, delay: 500 },
          { id: 'cm2', role: 'dev', sender: 'Ana', text: 'Jajaja ok, ese estuvo bueno.', delay: 1500, triggerReaction: { targetId: 'cm1', emoji: '😂' } }, 
          { id: 'cm3', role: 'hero', sender: 'Tú', text: 'Tranquilos. Nadie va a loguear cada 15 min mientras yo esté acá. Déjenme hablar con RRHH.', delay: 2500 },
          { id: 'cm4', role: 'dev', sender: 'Javi', text: 'Te tomamos la palabra. Pero ojo.', delay: 3500 },
      ],
      options: [
        { text: 'Enviar "Epic Handshake" (Compromiso)', nextNodeId: 'sticker_commit', type: 'safe' },
        { text: 'Cambiar tema: Trivia Cultural', nextNodeId: 'quiz_time', type: 'neutral' }
      ]
  },
  'sticker_commit': {
      id: 'sticker_commit',
      messages: [
          { id: 'sc1', role: 'hero', sender: 'Tú', type: 'sticker', contentUrl: FIST_BUMP_URL, delay: 500 }, 
          { id: 'sc2', role: 'dev', sender: 'Javi', text: 'Dillon! You son of a b****! 🦾', delay: 1500, triggerReaction: { targetId: 'sc1', emoji: '🔥' } },
          { id: 'sc3', role: 'dev', sender: 'Ana', text: 'Bueno, suficiente. A trabajar que el backlog no espera.', delay: 3000 }
      ],
      autoNext: 'gaming_proposal' 
  },
  'empathic': {
    id: 'empathic',
    messages: [
      { id: 'e1', role: 'hero', sender: 'Tú', text: 'Entiendo el enojo. La "Autonomía" es clave. ¿Qué les molesta concretamente?', delay: 500 },
      { id: 'e2', role: 'dev', sender: 'Javi', text: 'Que nos midan por tiempo y no por objetivos. Es injusto.', delay: 2000 },
      { id: 'e3', role: 'manager', sender: 'Sofia', text: 'Tienen razón. ¿Y si proponemos otra forma?', delay: 3500 }
    ],
    options: [
      { text: 'Reunión mañana para co-crear métricas.', nextNodeId: 'cocreation', type: 'safe' },
      { text: 'Filtrar sueldos (Desviar atención).', nextNodeId: 'leak_salary', type: 'risky' }
    ]
  },
  'cocreation': {
    id: 'cocreation',
    messages: [
      { id: 'c1', role: 'hero', sender: 'Tú', text: 'Ignoren el mail. Mañana definimos nosotros cómo medir el avance (Story points). ¿Trato?', delay: 500 },
      { id: 'c2', role: 'dev', sender: 'Javi', text: 'Ok. Eso me sirve.', delay: 2000, triggerReaction: { targetId: 'c1', emoji: '👍' } },
    ],
    autoNext: 'gaming_proposal'
  },
  'authoritarian': {
    id: 'authoritarian',
    messages: [
      { id: 'a1', role: 'hero', sender: 'Tú', text: 'Equipo, son normas de la empresa. Por favor, acaten y sigan trabajando.', delay: 500 },
      { id: 'sys_hack', role: 'system', sender: 'System', text: '⚠️ Javi cambió el nombre del grupo a "Corporate Slaves"', delay: 1200 },
      { id: 'a2', role: 'dev', sender: 'Javi', text: 'Ah, listo. "Acaten". Pensé que éramos socios.', delay: 1500, triggerReaction: { targetId: 'a1', emoji: '👎' } },
      { id: 'a3', role: 'dev', sender: 'Ana', text: 'Qué decepción.', delay: 2500 },
      { id: 'sys_leave', role: 'system', sender: 'System', text: '🚪 Javi ha abandonado el grupo.', delay: 3500 }
    ],
    options: [
      { text: 'Llamar a Javi urgente (Pedir perdón).', nextNodeId: 'redemption', type: 'safe' },
      { text: 'Dejarlo ir: "Nadie es imprescindible".', nextNodeId: 'fired_ending', type: 'risky' }
    ]
  },
  'redemption': {
      id: 'redemption',
      messages: [
          { id: 'r1', role: 'hero', sender: 'Tú', text: '(Llamada) Javi, volvé. Me equivoqué con el tono.', delay: 500 },
          { id: 'r2', role: 'system', sender: 'System', text: 'Javi se unió al grupo.', delay: 1500 },
          { id: 'r3', role: 'dev', sender: 'Javi', text: 'Vuelvo por el equipo. Pero el clima está roto.', delay: 2500 },
           { id: 'sys_rename', role: 'system', sender: 'System', text: 'Ana cambió el nombre del grupo a "Dyamanto Devs"', delay: 3000 }
      ],
      autoNext: 'work_mode_tense'
  },
  'gaming_proposal': {
      id: 'gaming_proposal',
      messages: [
          { id: 'sys_focus', role: 'system', sender: 'System', text: '🔔 Focus Mode Activado durante 2 horas...', delay: 1000 },
          { id: 'gp0', role: 'system', sender: 'System', text: '--- 2 Horas Después ---', delay: 2500 },
          { id: 'gp1', role: 'dev', sender: 'Javi', text: 'Che, @Tú, ya que salvamos el día y estamos productivos...', delay: 3500 },
          { id: 'gp2', role: 'dev', sender: 'Javi', text: '¿Sale un Valorant rapidito? Es "Team Building" 😉', delay: 4500 },
          { id: 'gp3', role: 'dev', sender: 'Ana', text: 'Javi, son las 3 de la tarde. Sofi nos mata.', delay: 5500 }
      ],
      options: [
          { text: '🎮 Sumarse: "¡Soy main Jett! Una sola."', nextNodeId: 'gaming_accepted', type: 'risky' },
          { text: '👷 Rechazar: "No abusen. A trabajar."', nextNodeId: 'gaming_rejected', type: 'safe' }
      ]
  },
  'gaming_accepted': {
      id: 'gaming_accepted',
      messages: [
          { id: 'ga1', role: 'hero', sender: 'Tú', text: 'Sale. Pasen Discord. Pero si perdemos, codear el doble.', delay: 500 },
          { id: 'sys_game', role: 'system', sender: 'System', text: '🎮 ESTADO: JUGANDO VALORANT - NO MOLESTAR', delay: 1000 },
          { id: 'ga2', role: 'dev', sender: 'Javi', type: 'sticker', contentUrl: VALORANT_GIF, delay: 1500 },
          { id: 'ga3', role: 'system', sender: 'System', text: '⏳ 45 minutos después...', delay: 3000 }
      ],
      autoNext: 'ceo_surprise_gaming'
  },
  'gaming_rejected': {
      id: 'gaming_rejected',
      messages: [
          { id: 'gr1', role: 'hero', sender: 'Tú', text: 'Chicos, no tiren de la cuerda. Aprecio la onda, pero hay deadline.', delay: 500 },
          { id: 'gr2', role: 'dev', sender: 'Javi', text: 'Bueno, bueno. 😒', delay: 1500, triggerReaction: { targetId: 'gr1', emoji: '😢' } },
      ],
      autoNext: 'ceo_surprise_working'
  },
  'work_mode_tense': {
      id: 'work_mode_tense',
      messages: [
          { id: 'wmt1', role: 'hero', sender: 'Tú', text: 'Sigamos con el sprint. Enfocados.', delay: 500 },
          { id: 'wmt2', role: 'dev', sender: 'Ana', text: 'Ok.', delay: 1500 }
      ],
      autoNext: 'ceo_surprise_working'
  },
  'ceo_surprise_gaming': {
      id: 'ceo_surprise_gaming',
      messages: [
          { id: 'csg1', role: 'ceo', sender: 'Davide (CEO)', text: 'Buenas. Estuve viendo el dashboard de JIRA...', delay: 500 },
          { id: 'csg2', role: 'ceo', sender: 'Davide (CEO)', text: '¿Por qué no hay commits en la última hora? Y escucho gritos en el Discord general.', delay: 2500 },
          { id: 'csg3', role: 'dev', sender: 'Javi', text: '😳', delay: 3500 }
      ],
      options: [
          { text: '🛡️ Defender: "Actividad de integración planificada."', nextNodeId: 'defense_shield', type: 'action' },
          { text: '🤥 Venderlos: "Javi insistió, yo les dije no."', nextNodeId: 'defense_betrayal', type: 'risky' }
      ],
      timeout: 10,
      timeoutNextNodeId: 'silence_guilt'
  },
  'ceo_surprise_working': {
      id: 'ceo_surprise_working',
      messages: [
          { id: 'csw1', role: 'ceo', sender: 'Davide (CEO)', text: 'Buenas gente. Vengo monitoreando el repo.', delay: 500 },
          { id: 'csw2', role: 'dev', sender: 'Ana', text: 'Hola Davide. Estamos cerrando el módulo.', delay: 1500 },
          { id: 'csw3', role: 'ceo', sender: 'Davide (CEO)', text: 'Veo buen ritmo. Pero noto el clima tenso.', delay: 3000 }
      ],
      options: [
          { text: 'Pedir bono: "Merecen un premio."', nextNodeId: 'ask_bonus', type: 'safe' },
          { text: 'Profesional: "Estamos enfocados."', nextNodeId: 'win_legend', type: 'neutral' }
      ]
  },
  'silence_guilt': {
      id: 'silence_guilt',
      messages: [
          { id: 'sg1', role: 'hero', sender: 'Tú', text: '...', delay: 500 },
          { id: 'sg2', role: 'ceo', sender: 'Davide (CEO)', text: '¿Nadie responde? El silencio otorga. Mañana hablamos.', delay: 2000 }
      ],
      autoNext: 'lose_fired'
  },
  'defense_shield': {
      id: 'defense_shield',
      messages: [
          { id: 'ds1', role: 'hero', sender: 'Tú', text: 'Davide, asumo la responsabilidad. Estábamos drenando estrés para evitar burnout.', delay: 500 },
          { id: 'ds2', role: 'ceo', sender: 'Davide (CEO)', text: 'Ok. Es arriesgado, pero si entregan mañana, lo acepto.', delay: 2500 },
          { id: 'ds3', role: 'dev', sender: 'Javi', text: 'Gracias @Tú. Sos un crack. Mañana entregamos.', delay: 4000, triggerReaction: { targetId: 'ds1', emoji: '❤️' } }
      ],
      autoNext: 'win_legend'
  },
  'defense_betrayal': {
      id: 'defense_betrayal',
      messages: [
          { id: 'db1', role: 'hero', sender: 'Tú', text: 'Fue idea de Javi. Yo no quería.', delay: 500 },
          { id: 'db2', role: 'dev', sender: 'Javi', text: '¿Qué? Vos estabas jugando de Jett!', delay: 1500 },
          { id: 'db3', role: 'ceo', sender: 'Davide (CEO)', text: 'Suficiente. No tolero mentiras. Pasen por RRHH.', delay: 3000 }
      ],
      autoNext: 'lose_fired'
  },
  'win_legend': {
    id: 'win_legend',
    messages: [
       { id: 'w1', role: 'system', sender: 'RESULTADO', text: '🏆 LEYENDA CULTURAL', delay: 500 },
       { id: 'w2', role: 'system', sender: 'Feedback', text: 'Gestión impecable. Equilibrio entre diversión y responsabilidad.', delay: 1500 }
    ]
  },
  'lose_fired': {
      id: 'lose_fired',
      messages: [
          { id: 'lf1', role: 'system', sender: 'RESULTADO', text: '☠️ DESPIDO', delay: 500 },
          { id: 'lf2', role: 'system', sender: 'Feedback', text: 'La falta de integridad o el autoritarismo destruyeron tu liderazgo.', delay: 1500 }
      ]
  },
  'post_call_silence': {
      id: 'post_call_silence',
      messages: [
          { id: 'pcs1', role: 'system', sender: 'System', text: 'Llamada finalizada.', delay: 500 },
          { id: 'pcs2', role: 'dev', sender: 'Javi', text: 'Uff... eso sonó mal.', delay: 1500 },
          { id: 'pcs3', role: 'system', sender: 'System', text: '🚫 Te han eliminado del grupo.', delay: 2500 }
      ]
  },
  'quiz_time': {
      id: 'quiz_time',
      messages: [{ id: 'qt1', role: 'hero', sender: 'Tú', text: '¿Teoría X o Y?', delay: 500 }],
      autoNext: 'gaming_proposal'
  },
  'leak_salary': {
      id: 'leak_salary',
      messages: [{ id: 'ls1', role: 'hero', sender: 'Tú', text: 'Miren los sueldos...', delay: 500 }],
      autoNext: 'lose_fired'
  },
  'ask_bonus': {
      id: 'ask_bonus',
      messages: [{ id: 'ab1', role: 'hero', sender: 'Tú', text: 'Merecen un bono.', delay: 500 }],
      autoNext: 'win_legend'
  },
  'fired_ending': {
      id: 'fired_ending',
      messages: [{ id: 'fe1', role: 'system', sender: 'System', text: 'Llamada entrante...', delay: 500 }],
      autoNext: 'lose_fired'
  }
};

interface LeaksProps {
    onBack: () => void;
    unlockBadge: (id: string) => void;
    onTriggerCall: (name: string) => void;
    chatState: { currentNodeId: string; history: Message[]; isTyping: boolean; completedNodes: string[] };
    setChatState: React.Dispatch<React.SetStateAction<{ currentNodeId: string; history: Message[]; isTyping: boolean; completedNodes: string[] }>>;
}

const Leaks: React.FC<LeaksProps> = ({ onBack, unlockBadge, onTriggerCall, chatState, setChatState }) => {
  const { currentNodeId, history, isTyping, completedNodes } = chatState;
  
  const [showOptions, setShowOptions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [reactions, setReactions] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [activeReactionId, setActiveReactionId] = useState<string | null>(null);
  const [typingSender, setTypingSender] = useState('');
  
  // Game State inside Chat
  const [stressLevel, setStressLevel] = useState(20);
  const [groupName, setGroupName] = useState("Dyamanto Devs 💎");

  // Effect to process current node (ONLY if not already completed)
  useEffect(() => {
    const node = STORY_NODES[currentNodeId];
    if (!node) return;

    if (completedNodes.includes(currentNodeId)) {
        // Just show options if available
        if (!node.autoNext) setShowOptions(true);
        return;
    }

    // --- LOGRO & EVENT TRIGGERS ---
    if (currentNodeId === 'gaming_accepted') unlockBadge('GAMER');
    if (currentNodeId === 'leak_salary') unlockBadge('WHISTLEBLOWER');
    if (currentNodeId === 'authoritarian') {
        unlockBadge('IRON_FIST');
        setGroupName("Corporate Slaves ⛓️");
        setStressLevel(90);
    }
    if (currentNodeId === 'redemption') {
        unlockBadge('DIPLOMAT');
        setStressLevel(50);
        setTimeout(() => setGroupName("Dyamanto Devs 💎"), 3000);
    }
    
    // --- PHONE CALL TRIGGER ---
    if (currentNodeId === 'lose_fired') {
        setTimeout(() => {
            onTriggerCall('Davide (CEO)');
        }, 2000);
    }

    let timeouts: ReturnType<typeof setTimeout>[] = [];
    let accumulatedDelay = 0;

    setShowOptions(false);
    setTimeLeft(null);

    node.messages.forEach((msg) => {
      // Skip messages already in history to avoid duplication
      if (history.some(m => m.id === msg.id)) return;

      const msgDelay = msg.delay || 1000;
      const typingStart = accumulatedDelay;
      accumulatedDelay += msgDelay;

      timeouts.push(setTimeout(() => {
        setChatState(prev => ({ ...prev, isTyping: true }));
        setTypingSender(msg.sender);
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, typingStart));

      timeouts.push(setTimeout(() => {
        setChatState(prev => ({ 
            ...prev, 
            isTyping: false,
            history: [...prev.history, msg]
        }));

        if (msg.triggerReaction) {
            setTimeout(() => {
                toggleReaction(msg.triggerReaction!.targetId, msg.triggerReaction!.emoji);
            }, 800);
        }
        
        setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      }, accumulatedDelay));
    });

    timeouts.push(setTimeout(() => {
        setChatState(prev => ({ ...prev, completedNodes: [...prev.completedNodes, currentNodeId] }));
        
        if (node.autoNext) {
            setChatState(prev => ({ ...prev, currentNodeId: node.autoNext! }));
        } else {
            setShowOptions(true);
            if (node.timeout && node.timeoutNextNodeId) {
                setTimeLeft(node.timeout);
            }
            setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        }
    }, accumulatedDelay + 500));

    return () => timeouts.forEach(clearTimeout);
  }, [currentNodeId, completedNodes]); // Removed history dependency to avoid loops

  useEffect(() => {
      // Scroll to bottom on mount
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, []);

  useEffect(() => {
      if (timeLeft === null || timeLeft <= 0) return;
      const timer = setInterval(() => {
          setTimeLeft(prev => {
              if (prev === 1 && STORY_NODES[currentNodeId]?.timeoutNextNodeId) {
                  handleOptionClick(STORY_NODES[currentNodeId]!.timeoutNextNodeId!);
                  return 0;
              }
              return (prev || 0) - 1;
          });
      }, 1000);
      return () => clearInterval(timer);
  }, [timeLeft, currentNodeId]);

  const handleOptionClick = (nextNodeId: string) => {
    setTimeLeft(null);
    setShowOptions(false);
    setChatState(prev => ({ ...prev, currentNodeId: nextNodeId }));
  };

  const toggleReaction = (msgId: string, emoji: string) => {
      setReactions(prev => ({
          ...prev,
          [msgId]: prev[msgId] === emoji ? '' : emoji
      }));
      setActiveReactionId(null);
  };

  const currentNode = STORY_NODES[currentNodeId];
  const isEnd = currentNodeId.startsWith('win') || (currentNodeId.startsWith('lose') && currentNodeId !== 'lose_fired') || currentNodeId === 'post_call_silence';

  return (
    <div className="flex flex-col h-full bg-[#EFE7DE] relative font-sans overflow-hidden">
      
      {/* 1. Header (Sticky & Safe Area) */}
      <ChatHeader 
        title={groupName}
        subtitle={isTyping ? `${typingSender} está escribiendo...` : "Toca para info"}
        avatarUrl="https://ui-avatars.com/api/?name=Dyamanto+Devs&background=25D366&color=fff"
        onBack={onBack}
        onInfo={() => setShowGroupInfo(true)}
      />
      
      {/* Team Stress Meter (Gamification Element) */}
      <div className="absolute top-[calc(env(safe-area-inset-top)+60px)] right-2 z-20 w-32 bg-white/80 backdrop-blur-sm rounded-lg p-1.5 border border-white/50 shadow-sm flex flex-col gap-1">
          <div className="flex justify-between text-[8px] font-black uppercase text-slate-500">
              <span>Team Stress</span>
              <span className={stressLevel > 70 ? 'text-red-500' : 'text-green-500'}>{stressLevel}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${stressLevel > 70 ? 'bg-red-500 animate-pulse' : stressLevel > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${stressLevel}%` }}
              ></div>
          </div>
      </div>

      {/* 2. Group Info Modal (Overlay) */}
      {showGroupInfo && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-fade-in" onClick={() => setShowGroupInfo(false)}>
              <div className="w-full sm:w-4/5 h-full bg-[#F0F2F5] shadow-2xl animate-slide-right flex flex-col pt-safe" onClick={e => e.stopPropagation()}>
                  <div className="bg-white p-6 flex flex-col items-center border-b border-slate-200 mt-8 sm:mt-0">
                      <div className="w-24 h-24 rounded-full bg-green-500 mb-4 flex items-center justify-center text-4xl shadow-lg ring-4 ring-green-100">💎</div>
                      <h2 className="text-xl font-black text-slate-800">{groupName}</h2>
                      <p className="text-slate-500 text-xs mt-1 font-medium">Grupo · 12 participantes</p>
                  </div>
                  <div className="p-4 space-y-4 overflow-y-auto flex-1">
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                          <h3 className="text-xs font-bold text-green-600 uppercase mb-2">Descripción</h3>
                          <p className="text-sm text-slate-700 italic leading-relaxed">"Lo que pasa en el deploy, queda en el deploy. Regla #1: No se habla de RRHH."</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-2xl shadow-sm space-y-4 border border-slate-100">
                          <h3 className="text-xs font-bold text-green-600 uppercase">Miembros Clave</h3>
                          <div className="flex items-center gap-3 border-b border-slate-50 pb-2">
                              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg">🎸</div>
                              <div>
                                  <p className="font-bold text-sm text-slate-800">Javi (Tech Lead)</p>
                                  <p className="text-xs text-slate-500">El rebelde. Odia la burocracia.</p>
                              </div>
                          </div>
                          <div className="flex items-center gap-3 border-b border-slate-50 pb-2">
                               <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-lg">🧠</div>
                               <div>
                                  <p className="font-bold text-sm text-slate-800">Ana (Senior Dev)</p>
                                  <p className="text-xs text-slate-500">La pragmática. Media los conflictos.</p>
                               </div>
                          </div>
                          <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-lg">👔</div>
                               <div>
                                  <p className="font-bold text-sm text-slate-800">Davide (CEO)</p>
                                  <p className="text-xs text-slate-500">Impredecible. Aparece cuando hay caos.</p>
                               </div>
                          </div>
                      </div>
                  </div>
                  <button onClick={() => setShowGroupInfo(false)} className="m-4 mb-safe bg-[#008069] text-white py-3.5 rounded-xl font-bold active:scale-95 transition-transform shadow-md">Cerrar Info</button>
              </div>
          </div>
      )}

      {/* 3. Chat History */}
      <div 
        className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-2 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-fixed relative" 
        onClick={() => setActiveReactionId(null)}
      >
        <div className="flex flex-col justify-end min-h-full pb-2">
             {history.map((msg, index) => (
                 <MessageBubble 
                    key={`${msg.id}-${index}`}
                    msg={msg}
                    isMe={msg.role === 'hero'}
                    isSystem={msg.role === 'system'}
                    isCeo={msg.role === 'ceo'}
                    reaction={reactions[msg.id]}
                    activeReactionId={activeReactionId}
                    onToggleReaction={toggleReaction}
                    onReactionClick={(id) => setActiveReactionId(activeReactionId === id ? null : id)}
                    onCloseReaction={() => setActiveReactionId(null)}
                 />
             ))}

            {isTyping && (
                <div className="flex justify-start animate-fade-in pl-2 mb-2">
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-2 items-center border border-white/50">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{typingSender}</span>
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={scrollRef} className="h-0" />
        </div>
      </div>

      {/* 4. Input Area (Fixed Bottom) */}
      <div className="bg-[#F0F2F5] p-2 sm:p-3 flex flex-col items-center gap-2 shrink-0 z-20 pb-safe sticky bottom-0 border-t border-slate-200">
        
        {timeLeft !== null && (
            <div className="w-full px-4 mb-1">
                <div className="flex justify-between text-[10px] font-bold text-red-500 uppercase mb-1 animate-pulse">
                    <span>⚠️ Decisión Crítica</span>
                    <span>{timeLeft}s</span>
                </div>
                <div className="w-full bg-red-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-red-500 transition-all duration-1000 ease-linear" 
                        style={{ width: `${(timeLeft / 10) * 100}%` }}
                    ></div>
                </div>
            </div>
        )}

        {showOptions && !isEnd && (
             <div className="flex flex-col w-full gap-2 px-1 max-w-lg">
                 {currentNode?.options?.map((opt, idx) => (
                     <button
                        key={idx}
                        onClick={() => handleOptionClick(opt.nextNodeId)}
                        className={`
                            w-full py-3 px-4 rounded-xl font-medium text-sm shadow-[0_2px_0_rgba(0,0,0,0.05)] transition-all active:scale-[0.98]
                            text-left flex items-center group relative overflow-hidden border
                            ${opt.type === 'risky' ? 'bg-red-50 text-red-900 border-red-200 hover:bg-red-100' : 
                              opt.type === 'action' ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100' :
                              'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'}
                        `}
                     >
                         <span className={`
                             w-6 h-6 rounded-lg flex items-center justify-center mr-3 text-[10px] font-bold shrink-0
                             ${opt.type === 'risky' ? 'bg-red-200 text-red-700' : 'bg-slate-100 text-slate-500'}
                         `}>
                            {String.fromCharCode(65 + idx)}
                         </span>
                         <span className="leading-tight">{opt.text}</span>
                     </button>
                 ))}
             </div>
        )}

        {isEnd && (
            <button onClick={onBack} className="w-full mx-4 bg-[#008069] text-white py-3 rounded-xl font-bold shadow-md hover:bg-[#00705a] transition-all active:scale-95 max-w-lg">
                Volver al Home
            </button>
        )}
        
        {!showOptions && !isEnd && !isTyping && (
            <div className="w-full text-center py-2 text-xs text-slate-400 font-medium flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-pulse"></span>
                Esperando respuesta...
            </div>
        )}
      </div>
    </div>
  );
};

export default Leaks;