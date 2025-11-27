
import React, { useEffect, useState, useRef } from 'react';
import { ChatNode, Message } from '../types';

// Meme URL (Reddit)
const SAPEEE_IMG_URL = "https://preview.redd.it/z3nj57t6grm61.jpg?auto=webp&s=9eecb9cefdd01cd2be90c4cdc5653e300d27d37f";
const FALLBACK_IMG_URL = "https://placehold.co/400x300/EEE/31343C?text=SAPEEE!+%F0%9F%A4%99";

const STORY_NODES: Record<string, ChatNode> = {
  'start': {
    id: 'start',
    messages: [
      { id: '1', role: 'dev', sender: 'Javi (Tech Lead)', text: 'Che @channel, vieron el mail de RRHH?? 😡', delay: 500 },
      { id: 'img1', role: 'dev', sender: 'Javi (Tech Lead)', type: 'image', contentUrl: SAPEEE_IMG_URL, delay: 1500 },
      { id: '2', role: 'dev', sender: 'Ana (Frontend)', text: 'Sí, cualquiera. Dicen que hay que loguear cada 15 minutos?? "Sapee" mis polainas.', delay: 3000 },
      { id: '3', role: 'dev', sender: 'Javi', text: 'Esto es micromanagement puro. Si no confían en nosotros, avisen y nos vamos.', delay: 5000 },
      { id: '4', role: 'system', sender: 'System', text: '🔔 Sofia (Product Owner) está grabando un audio...', delay: 6000 },
      { id: 'audio1', role: 'manager', sender: 'Sofia', type: 'audio', contentUrl: '15s', delay: 8500 },
      { id: '6', role: 'dev', sender: 'Javi', text: 'Sofi, todo bien, pero el audio no me dice nada nuevo. Esto rompe el contrato moral.', delay: 11000 },
    ],
    options: [
      { text: 'Intervenir con autoridad: "Las normas están para cumplirse."', nextNodeId: 'authoritarian', type: 'risky' },
      { text: 'Empatizar y preguntar: "¿Qué proponen ustedes para medir?"', nextNodeId: 'empathic', type: 'safe' },
      { text: 'Tirar un meme y relajar el ambiente.', nextNodeId: 'cool_manager', type: 'neutral' },
      { text: 'Ignorar y dejar que Sofia maneje.', nextNodeId: 'ignore', type: 'neutral' }
    ]
  },
  'cool_manager': {
      id: 'cool_manager',
      messages: [
          { id: 'cm1', role: 'hero', sender: 'Tú', type: 'image', contentUrl: 'https://media.tenor.com/2nZ20s-jR74AAAAM/drinking-homero.gif', delay: 1000 },
          { id: 'cm2', role: 'hero', sender: 'Tú', text: 'Tranquilos. Nadie va a loguear cada 15 min mientras yo esté acá. Déjenme hablar con RRHH.', delay: 2000 },
          { id: 'cm3', role: 'dev', sender: 'Javi', text: 'Jajaja ese gif. Dale, confiamos en vos. Pero que no se repita.', delay: 4000 },
          { id: 'cm4', role: 'system', sender: 'System', text: 'La tensión bajó, pero ahora RRHH te tiene en la mira.', delay: 5000 }
      ],
      autoNext: 'win_safe'
  },
  'authoritarian': {
    id: 'authoritarian',
    messages: [
      { id: 'a1', role: 'hero', sender: 'Tú (Manager)', text: 'Equipo, son normas de la empresa para escalar. Necesitamos métricas. Por favor, acaten y sigan trabajando.', delay: 1000 },
      { id: 'a2', role: 'dev', sender: 'Javi', text: 'Ah, listo. "Acaten". Pensé que éramos socios, no operarios de fábrica.', delay: 3000 },
      { id: 'a3', role: 'dev', sender: 'Javi', text: 'Andá a c... ', delay: 4500 },
      { id: 'del1', role: 'system', sender: 'System', text: '🚫 Este mensaje fue eliminado', delay: 4600 },
      { id: 'a4', role: 'dev', sender: 'Ana', text: 'Uh, Javi... tranqui. @Tú, creo que no estás entendiendo el punto.', delay: 6000 },
      { id: 'a5', role: 'manager', sender: 'Sofia', text: '@Tú, creo que eso fue muy duro. Javi está furioso.', delay: 7500 }
    ],
    options: [
      { text: 'Llamar a Javi urgente y pedir disculpas.', nextNodeId: 'redemption', type: 'safe' },
      { text: 'Mantener postura: "Nadie es imprescindible en Dyamanto".', nextNodeId: 'fired_ending', type: 'risky' }
    ]
  },
  'fired_ending': {
      id: 'fired_ending',
      messages: [
          { id: 'f1', role: 'hero', sender: 'Tú', text: 'Si no le gusta, que se vaya. Buscamos otro senior mañana.', delay: 1000 },
          { id: 'f2', role: 'system', sender: 'System', text: '🚫 CEO se ha unido al grupo.', delay: 2000 },
          { id: 'f3', role: 'ceo', sender: 'CEO', text: '@Tú Acabo de ver la renuncia de Javi y Ana. El cliente canceló el contrato. Pasá por mi oficina.', delay: 4000 },
          { id: 'f4', role: 'system', sender: 'System', text: '❌ Has sido eliminado del grupo "Dyamanto Devs".', delay: 6000 }
      ],
      autoNext: 'lose_fired'
  },
  'empathic': {
    id: 'empathic',
    messages: [
      { id: 'e1', role: 'hero', sender: 'Tú (Manager)', text: 'Entiendo el enojo. La "Autonomía" es clave acá. ¿Qué es lo que más ruido les hace del mail concretamente?', delay: 1000 },
      { id: 'e2', role: 'dev', sender: 'Javi', text: 'Que nos midan por tiempo y no por objetivos. Yo codeo en 2 horas lo que otros en 8. Es injusto.', delay: 3500 },
      { id: 'e3', role: 'dev', sender: 'Ana', text: 'Exacto. Parece que quieren calentar silla. No somos un call center.', delay: 5000 },
      { id: 'e4', role: 'manager', sender: 'Sofia', text: 'Visto así, tienen razón. ¿Y si proponemos otra forma de medir?', delay: 7000 }
    ],
    options: [
      { text: 'Proponer reunión de co-creación de métricas mañana.', nextNodeId: 'cocreation', type: 'safe' },
      { text: 'Mandar audio explicando la presión de los inversores (Mantener apretado).', nextNodeId: 'record_defense', type: 'action' } 
    ]
  },
  'record_defense': {
      id: 'record_defense',
      messages: [],
      interactionType: 'record_audio',
      options: [
          { text: 'Audio enviado: "Chicos, los inversores presionan..."', nextNodeId: 'cocreation', type: 'safe' }
      ]
  },
  'ignore': {
    id: 'ignore',
    messages: [
      { id: 'i1', role: 'system', sender: 'System', text: 'Has silenciado el chat...', delay: 1000 },
      { id: 'i2', role: 'system', sender: 'System', text: '... 2 horas después ...', delay: 3000 },
      { id: 'i3', role: 'manager', sender: 'Sofia', text: '@Tú URGENTE. Javi pusheó un código roto a producción y apagó el teléfono. El servidor está caído.', delay: 5000 },
      { id: 'i4', role: 'manager', sender: 'Sofia', text: 'Los clientes están llamando. Esto es un desastre. Nadie responde.', delay: 7000 }
    ],
    options: [
      { text: 'Asumir la culpa y tratar de arreglarlo solo.', nextNodeId: 'crisis_management', type: 'neutral' },
      { text: 'Culpar a Javi: "Esto es sabotaje".', nextNodeId: 'blame_game', type: 'risky' }
    ]
  },
  'blame_game': {
      id: 'blame_game',
      messages: [
          { id: 'bg1', role: 'hero', sender: 'Tú', text: 'Esto fue intencional. Javi rompió todo antes de irse.', delay: 1000 },
          { id: 'bg2', role: 'ceo', sender: 'CEO', text: 'No me importan los culpables, me importa la solución. Tu falta de liderazgo permitió esto.', delay: 3000 }
      ],
      autoNext: 'lose_fired'
  },
  'crisis_management': {
      id: 'crisis_management',
      messages: [
          { id: 'cm1', role: 'hero', sender: 'Tú', text: 'Voy para la oficina. Me hago cargo. No toquen nada más.', delay: 1000 },
          { id: 'cm2', role: 'system', sender: 'System', text: 'Lograste levantar el servidor, pero el equipo perdió la confianza en la gestión por tu ausencia previa.', delay: 3000 },
          { id: 'cm3', role: 'dev', sender: 'Javi', text: '(3 horas después) Volví. Perdón por apagar el cel, me quemé. Vi que levantaste el server. Gracias.', delay: 5000 },
      ],
      options: [
        { text: 'Aceptar disculpas y hablar de Burnout.', nextNodeId: 'win_safe', type: 'safe' },
        { text: 'Sancionarlo. Fue inaceptable.', nextNodeId: 'lose_burnout', type: 'risky' }
      ]
  },
  'cocreation': {
    id: 'cocreation',
    messages: [
      { id: 'c1', role: 'hero', sender: 'Tú', text: 'Hagamos esto: ignoren el mail por hoy. Mañana nos juntamos y definimos nosotros cómo medir el avance (Story points, entregables, etc). ¿Trato?', delay: 1000 },
      { id: 'c2', role: 'dev', sender: 'Javi', text: '... Ok. Eso me sirve. Si nosotros definimos el "cómo", me banco el "qué".', delay: 3000 },
      { id: 'c3', role: 'dev', sender: 'Ana', type: 'image', contentUrl: 'https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif', delay: 5000 },
      { id: 'c4', role: 'system', sender: 'System', text: 'CEO se ha unido al grupo.', delay: 6000 },
      { id: 'c5', role: 'ceo', sender: 'CEO', text: 'Leí esto. Muy buen manejo @Tú. Esa es la cultura que quiero: soluciones, no quejas.', delay: 8000 }
    ],
    options: [], 
    autoNext: 'win_legend'
  },
  'redemption': {
      id: 'redemption',
      messages: [
          { id: 'r1', role: 'hero', sender: 'Tú', text: '(Llamada finalizada) Ok, hablé con Javi. Vuelve. Admití que me equivoqué con el tono imperativo.', delay: 1000 },
          { id: 'r2', role: 'dev', sender: 'Javi', text: 'Volví. Todo bien. Pero revisemos esas métricas por favor, no somos robots.', delay: 3000 }
      ],
      autoNext: 'win_safe'
  },
  'win_legend': {
    id: 'win_legend',
    messages: [
       { id: 'w1', role: 'system', sender: 'RESULTADO', text: '🏆 LEYENDA CULTURAL', delay: 500 },
       { id: 'w2', role: 'system', sender: 'Feedback', text: 'Convertiste una crisis en una oportunidad para reforzar la confianza. El CEO te ha ascendido.', delay: 1500 }
    ]
  },
  'win_safe': {
      id: 'win_safe',
      messages: [
          { id: 'ws1', role: 'system', sender: 'RESULTADO', text: '⚖️ SALVADO POR POCO', delay: 500 },
          { id: 'ws2', role: 'system', sender: 'Feedback', text: 'Lograste retener al talento, pero tu autoridad quedó en duda. Hay que trabajar la comunicación asertiva.', delay: 1500 }
      ]
  },
  'lose_fired': {
      id: 'lose_fired',
      messages: [
          { id: 'lf1', role: 'system', sender: 'RESULTADO', text: '☠️ DESPIDO', delay: 500 },
          { id: 'lf2', role: 'system', sender: 'Feedback', text: 'Perdiste al equipo técnico por imponer autoridad sin "Descongelar" primero (Lewin). Dyamanto no funciona así.', delay: 1500 }
      ]
  },
  'lose_burnout': {
      id: 'lose_burnout',
      messages: [
          { id: 'lb1', role: 'system', sender: 'RESULTADO', text: '🔥 BURNOUT Y CAOS', delay: 500 },
          { id: 'lb2', role: 'system', sender: 'Feedback', text: 'Ignorar el conflicto no lo hace desaparecer. La falta de gestión activa provocó una crisis técnica grave.', delay: 1500 }
      ]
  }
};

const Leaks: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [chatHistory, setChatHistory] = useState<Message[]>([]); // New persistent history
  const [isTyping, setIsTyping] = useState(false);
  const [typingSender, setTypingSender] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Audio Recording State
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const recordingInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reaction State
  const [reactions, setReactions] = useState<Record<string, string>>({});

  useEffect(() => {
    const node = STORY_NODES[currentNodeId];
    if (!node) return;

    if (node.interactionType === 'record_audio') {
        setShowOptions(true);
        setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        return;
    }

    let timeouts: ReturnType<typeof setTimeout>[] = [];
    let accumulatedDelay = 0;

    node.messages.forEach((msg, index) => {
      const typingStart = accumulatedDelay;
      const msgDelay = msg.delay || 1000;
      accumulatedDelay += msgDelay;

      // Start typing indicator
      timeouts.push(setTimeout(() => {
        setIsTyping(true);
        setTypingSender(msg.sender);
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, typingStart));

      // Show message (append to history)
      timeouts.push(setTimeout(() => {
        setIsTyping(false);
        setChatHistory(prev => [...prev, msg]);
        setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      }, accumulatedDelay));
    });

    // Show options after all messages
    timeouts.push(setTimeout(() => {
        if (node.autoNext) {
            setCurrentNodeId(node.autoNext);
        } else {
            setShowOptions(true);
            setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        }
    }, accumulatedDelay + 500));

    return () => timeouts.forEach(clearTimeout);
  }, [currentNodeId]);

  const handleOptionClick = (nextNodeId: string) => {
    setShowOptions(false);
    setCurrentNodeId(nextNodeId);
  };

  const startRecording = () => {
      setIsRecording(true);
      setRecordingProgress(0);
      recordingInterval.current = setInterval(() => {
          setRecordingProgress(prev => {
              if (prev >= 100) {
                  clearInterval(recordingInterval.current!);
                  return 100;
              }
              return prev + 2; 
          });
      }, 30);
  };

  const stopRecording = (nextNodeId: string) => {
      setIsRecording(false);
      if (recordingInterval.current) clearInterval(recordingInterval.current);
      
      if (recordingProgress >= 100) {
          handleOptionClick(nextNodeId);
      } else {
          setRecordingProgress(0); 
      }
  };

  const toggleReaction = (msgId: string, emoji: string) => {
      setReactions(prev => ({
          ...prev,
          [msgId]: prev[msgId] === emoji ? '' : emoji
      }));
  };

  const currentNode = STORY_NODES[currentNodeId];
  const isEnd = currentNodeId.startsWith('win') || currentNodeId.startsWith('lose');

  return (
    <div className="flex flex-col h-full bg-[#ECE5DD] relative font-sans">
      {/* WhatsApp Header */}
      <div className="bg-[#075E54] p-3 text-white flex items-center shadow-md z-10 shrink-0">
        <button onClick={onBack} className="mr-3 text-2xl active:opacity-50">←</button>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 overflow-hidden">
            <img src="https://ui-avatars.com/api/?name=Dyamanto+Devs&background=25D366&color=fff" alt="Group" />
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-base leading-tight">Dyamanto Devs 💎</h2>
          <p className="text-xs text-green-100 truncate">
             {isTyping ? `${typingSender} está escribiendo...` : 'Javi, Ana, Sofia, Tú...'}
          </p>
        </div>
        <div className="text-xl space-x-4">
            <span>📹</span>
            <span>📞</span>
            <span>⋮</span>
        </div>
      </div>

      {/* Chat Area - Scrollbar Hidden but functional */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat scrollbar-hide">
        
        {chatHistory.map((msg, index) => {
           const isMe = msg.role === 'hero';
           const isSystem = msg.role === 'system' || msg.role === 'ceo';
           
           if (isSystem) {
               return (
                   <div key={`${msg.id}-${index}`} className="flex justify-center my-4 animate-fade-in">
                       <div className={`${msg.role === 'ceo' ? 'bg-amber-100 border-amber-300' : 'bg-[#E1F2FB] border-blue-100'} text-slate-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm border text-center max-w-[85%]`}>
                           {msg.text}
                       </div>
                   </div>
               )
           }

           return (
            <div key={`${msg.id}-${index}`} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-slide-up group relative`}>
                <div className={`
                  max-w-[85%] rounded-lg p-2 shadow-sm relative text-sm
                  ${isMe ? 'bg-[#DCF8C6] rounded-tr-none' : 'bg-white rounded-tl-none'}
                `}>
                    {!isMe && <p className={`text-xs font-bold mb-1 ${msg.role === 'dev' ? 'text-orange-600' : 'text-purple-700'}`}>{msg.sender}</p>}
                    
                    {msg.type === 'image' && (
                        <div className="mb-2 rounded-lg overflow-hidden border border-black/10 min-h-[150px] bg-slate-200">
                            <img 
                                src={msg.contentUrl} 
                                alt="Meme" 
                                className="w-full h-auto object-cover block" 
                                style={{ minHeight: '150px' }}
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    e.currentTarget.src = FALLBACK_IMG_URL;
                                }}
                            />
                        </div>
                    )}
                    
                    {msg.type === 'audio' && (
                        <div className="flex items-center gap-2 min-w-[180px] py-1">
                            <div className="text-2xl text-slate-600">▶️</div>
                            <div className="flex-1 h-1 bg-slate-300 rounded-full overflow-hidden">
                                <div className="h-full w-1/3 bg-slate-500"></div>
                            </div>
                            <span className="text-xs text-slate-500">0:15</span>
                        </div>
                    )}

                    {/* Text Message Content */}
                    {msg.text && (
                        <p className="leading-relaxed whitespace-pre-wrap text-black font-normal">
                            {msg.text}
                        </p>
                    )}
                    
                    <div className="flex justify-end items-center gap-1 mt-1 select-none">
                        <span className="text-[10px] text-gray-500">10:42 AM</span>
                        {isMe && <span className="text-blue-500 text-[10px]">✓✓</span>}
                    </div>

                    {/* Reactions Display */}
                    {reactions[msg.id] && (
                        <div className="absolute -bottom-3 right-2 bg-white rounded-full px-1 shadow-md text-xs border border-slate-200 z-10 scale-90">
                            {reactions[msg.id]}
                        </div>
                    )}

                    {/* Reaction Picker (Hover) */}
                    <div className="absolute -top-8 left-0 hidden group-hover:flex bg-white rounded-full shadow-lg p-1 gap-1 z-20 animate-pop">
                        {['👍', '❤️', '😂', '🔥', '😡'].map(emoji => (
                            <button key={emoji} onClick={() => toggleReaction(msg.id, emoji)} className="hover:scale-125 transition-transform text-lg">
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
          );
        })}
        
        {isTyping && (
             <div className="flex justify-start animate-pulse">
                <div className="bg-white rounded-lg p-3 rounded-tl-none shadow-sm flex gap-1 items-center">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                </div>
            </div>
        )}

        {/* Dummy div to scroll to */}
        <div ref={scrollRef} className="h-4" />
      </div>

      {/* Input Area / Options */}
      <div className="bg-[#F0F0F0] p-2 flex items-center gap-2 shadow-inner shrink-0 z-20 min-h-[60px] pb-safe">
        {showOptions && !isEnd && currentNode?.interactionType !== 'record_audio' && (
             <div className="flex flex-col w-full gap-2 pb-2 px-2">
                 <p className="text-xs text-center text-slate-500 uppercase font-bold tracking-widest mb-1">Tu decisión</p>
                 {currentNode?.options?.map((opt, idx) => (
                     <button
                        key={idx}
                        onClick={() => handleOptionClick(opt.nextNodeId)}
                        className={`
                            w-full py-3 px-4 rounded-xl font-medium text-sm shadow-sm transition-all active:scale-95
                            bg-white text-black border border-slate-200 hover:bg-slate-50
                            text-left flex items-center
                        `}
                     >
                         <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mr-3 text-xs font-bold shrink-0">
                            {idx + 1}
                         </span>
                         {opt.text}
                     </button>
                 ))}
             </div>
        )}

        {/* Record Audio Interaction */}
        {showOptions && currentNode?.interactionType === 'record_audio' && (
            <div className="w-full flex flex-col items-center justify-center py-4 gap-4">
                 <p className="text-sm font-bold text-slate-600">
                     {recordingProgress < 100 ? "Mantén presionado para grabar tu defensa..." : "¡Audio grabado!"}
                 </p>
                 
                 {/* Progress Bar */}
                 <div className="w-64 h-2 bg-slate-300 rounded-full overflow-hidden">
                     <div 
                        className={`h-full ${recordingProgress >= 100 ? 'bg-green-500' : 'bg-red-500'}`} 
                        style={{ width: `${recordingProgress}%` }}
                     ></div>
                 </div>

                 <button
                    onMouseDown={startRecording}
                    onMouseUp={() => stopRecording(currentNode.options![0].nextNodeId)}
                    onTouchStart={startRecording}
                    onTouchEnd={() => stopRecording(currentNode.options![0].nextNodeId)}
                    className={`
                        w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-xl transition-all
                        ${isRecording ? 'scale-110 bg-red-600 ring-4 ring-red-300' : 'bg-[#00a884] hover:brightness-110'}
                        ${recordingProgress >= 100 ? 'bg-blue-500 scale-100' : 'text-white'}
                    `}
                 >
                     {recordingProgress >= 100 ? '✈️' : '🎙️'}
                 </button>
            </div>
        )}

        {isEnd && (
            <button 
                onClick={onBack}
                className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors shadow-lg"
            >
                Volver al Hub
            </button>
        )}

        {!showOptions && !isEnd && (
            <div className="w-full text-center text-slate-400 text-xs italic">
                Esperando mensajes...
            </div>
        )}
      </div>
    </div>
  );
};

export default Leaks;
