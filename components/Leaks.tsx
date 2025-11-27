
import React, { useEffect, useState, useRef } from 'react';
import { ChatNode, Message } from '../types';

// Images
const SAPEEE_IMG_URL = "https://preview.redd.it/z3nj57t6grm61.jpg?auto=webp&s=9eecb9cefdd01cd2be90c4cdc5653e300d27d37f";
const FALLBACK_IMG_URL = "https://placehold.co/400x300/EEE/31343C?text=SAPEEE!+%F0%9F%A4%99";
// Updated reliable Homer Gif
const HOMER_GIF_URL = "https://media.giphy.com/media/COYGe9rZvfiaQ/giphy.gif"; 
// Epic Handshake / Predator Handshake - THE CORRECT ONE
const FIST_BUMP_URL = "https://media.giphy.com/media/pHb82iyFTEUS4/giphy.gif";
const VALORANT_GIF = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZ4eGp2c3B4Z3B4Z3B4Z3B4Z3B4Z3B4Z3B4Z3B4Z3B4/3o7527pa7qs9kCG78A/giphy.gif";

const STORY_NODES: Record<string, ChatNode> = {
  'start': {
    id: 'start',
    messages: [
      { id: '1', role: 'dev', sender: 'Javi (Tech Lead)', text: 'Che @channel, vieron el mail de RRHH?? 😡', delay: 200 },
      { id: 'img1', role: 'dev', sender: 'Javi (Tech Lead)', type: 'image', contentUrl: SAPEEE_IMG_URL, delay: 600 },
      { id: '2', role: 'dev', sender: 'Ana (Frontend)', text: 'Sí, cualquiera. Dicen que hay que loguear cada 15 minutos?? "Sapee" mis polainas.', delay: 1200 },
      { id: '3', role: 'dev', sender: 'Javi', text: 'Esto es micromanagement puro. Si no confían en nosotros, avisen y nos vamos.', delay: 2000 },
      { id: '4', role: 'system', sender: 'System', text: '🔔 Sofia (Product Owner) está grabando un audio...', delay: 2500 },
      { id: 'audio1', role: 'manager', sender: 'Sofia', type: 'audio', contentUrl: '15s', delay: 3500 },
      { id: '6', role: 'dev', sender: 'Javi', text: 'Sofi, todo bien, pero el audio no me dice nada nuevo. Esto rompe el contrato moral.', delay: 4500 },
    ],
    options: [
      { text: 'Intervenir con autoridad: "Las normas están para cumplirse."', nextNodeId: 'authoritarian', type: 'risky' },
      { text: 'Empatizar y preguntar: "¿Qué proponen ustedes para medir?"', nextNodeId: 'empathic', type: 'safe' },
      { text: 'Mandar un Sticker/Meme para relajar.', nextNodeId: 'cool_manager', type: 'neutral' },
      { text: 'Ignorar y dejar que Sofia maneje.', nextNodeId: 'ignore', type: 'neutral' }
    ]
  },
  'cool_manager': {
      id: 'cool_manager',
      messages: [
          { id: 'cm1', role: 'hero', sender: 'Tú', type: 'image', contentUrl: HOMER_GIF_URL, delay: 500 },
          { id: 'cm2', role: 'hero', sender: 'Tú', text: 'Tranquilos. Nadie va a loguear cada 15 min mientras yo esté acá. Déjenme hablar con RRHH.', delay: 1500 },
          { id: 'cm3', role: 'dev', sender: 'Javi', text: 'Jajaja ok. Te tomamos la palabra. Pero ojo.', delay: 2500 },
      ],
      options: [
        { text: 'Enviar "Epic Handshake" (Compromiso Absoluto)', nextNodeId: 'sticker_commit', type: 'safe' },
        { text: 'Cambiar de tema: Trivia Cultural.', nextNodeId: 'quiz_time', type: 'neutral' }
      ]
  },
  'sticker_commit': {
      id: 'sticker_commit',
      messages: [
          { id: 'sc1', role: 'hero', sender: 'Tú', type: 'sticker', contentUrl: FIST_BUMP_URL, delay: 500 }, 
          { id: 'sc2', role: 'dev', sender: 'Ana', text: 'Dillon! You son of a b****! 🦾', delay: 1500 },
          { id: 'sc3', role: 'system', sender: 'System', text: 'Has desbloqueado el respeto del equipo.', delay: 2500 },
          { id: 'sc4', role: 'dev', sender: 'Javi', text: 'Bueno, ya que estamos de buenas...', delay: 3500 }
      ],
      autoNext: 'gaming_proposal'
  },
  'quiz_time': {
      id: 'quiz_time',
      messages: [
          { id: 'qt1', role: 'hero', sender: 'Tú', text: 'Para bajar la espuma... Pregunta rápida: ¿Según qué teoría el micromanagement desmotiva a perfiles creativos?', delay: 1000 },
          { id: 'qt2', role: 'dev', sender: 'Javi', text: 'Uff, ¿examen sorpresa? Mmm...', delay: 2000 }
      ],
      options: [
          { text: 'Teoría X e Y (McGregor)', nextNodeId: 'quiz_correct', type: 'safe' },
          { text: 'Condicionamiento Operante (Skinner)', nextNodeId: 'quiz_wrong', type: 'risky' }
      ]
  },
  'quiz_correct': {
      id: 'quiz_correct',
      messages: [
          { id: 'qc1', role: 'hero', sender: 'Tú', text: 'Exacto, Teoría Y. Ustedes se automotivan, no necesitan un capataz.', delay: 500 },
          { id: 'qc2', role: 'dev', sender: 'Ana', text: '👏 Al fin alguien que leyó el manual. Bien ahí.', delay: 1500 },
          { id: 'qc3', role: 'system', sender: 'System', text: 'La tensión bajó considerablemente.', delay: 2500 }
      ],
      autoNext: 'gaming_proposal'
  },
  'quiz_wrong': {
      id: 'quiz_wrong',
      messages: [
          { id: 'qw1', role: 'hero', sender: 'Tú', text: 'Es Skinner, necesitan premios y castigos.', delay: 500 },
          { id: 'qw2', role: 'dev', sender: 'Javi', text: '¿Nos estás tratando de ratas de laboratorio? 🐀', delay: 1500 },
          { id: 'qw3', role: 'system', sender: 'System', text: 'Perdiste el respeto intelectual del equipo.', delay: 2500 }
      ],
      autoNext: 'lose_fired'
  },
  
  // --- ROUND 2: THE GAMING DILEMMA (New Content) ---
  'gaming_proposal': {
      id: 'gaming_proposal',
      messages: [
          { id: 'gp0', role: 'system', sender: 'System', text: '--- 2 Horas Después ---', delay: 500 },
          { id: 'gp1', role: 'dev', sender: 'Javi', text: 'Che, @Tú, ya que salvamos el día y estamos productivos...', delay: 1500 },
          { id: 'gp2', role: 'dev', sender: 'Javi', text: '¿Sale un Valorant rapidito? Es "Team Building" 😉', delay: 2500 },
          { id: 'gp3', role: 'dev', sender: 'Ana', text: 'Javi, son las 3 de la tarde. Sofi nos mata.', delay: 3500 }
      ],
      options: [
          { text: 'Sumarse: "¡Dalen! Soy main Jett. Pero solo una."', nextNodeId: 'gaming_accepted', type: 'risky' },
          { text: 'Rechazar: "No abusen. A trabajar, hay deadline."', nextNodeId: 'gaming_rejected', type: 'safe' },
          { text: 'Ignorar: (Hacerse el tonto)', nextNodeId: 'gaming_rejected', type: 'neutral' }
      ]
  },
  'gaming_accepted': {
      id: 'gaming_accepted',
      messages: [
          { id: 'ga1', role: 'hero', sender: 'Tú', text: 'Sale. Pasen link de Discord. Pero si perdemos, codear el doble.', delay: 500 },
          { id: 'ga2', role: 'dev', sender: 'Javi', type: 'sticker', contentUrl: VALORANT_GIF, delay: 1500 },
          { id: 'ga3', role: 'system', sender: 'System', text: '🎮 Has entrado a la partida. La moral del equipo está por las nubes (+50 Moral).', delay: 3000 },
          { id: 'ga4', role: 'system', sender: 'System', text: '⏳ 45 minutos después...', delay: 5000 }
      ],
      autoNext: 'ceo_surprise_gaming'
  },
  'gaming_rejected': {
      id: 'gaming_rejected',
      messages: [
          { id: 'gr1', role: 'hero', sender: 'Tú', text: 'Chicos, no tiren de la cuerda. Aprecio la onda, pero tenemos que entregar.', delay: 500 },
          { id: 'gr2', role: 'dev', sender: 'Javi', text: 'Bueno, bueno. Era para descontracturar. 😒', delay: 1500 },
          { id: 'gr3', role: 'dev', sender: 'Ana', text: 'Tienen razón. Sigamos con la API.', delay: 2500 },
          { id: 'gr4', role: 'system', sender: 'System', text: '⏳ 1 hora después...', delay: 3500 }
      ],
      autoNext: 'ceo_surprise_working'
  },

  // --- ROUND 3: THE CEO ENTERS (Climax) ---
  'ceo_surprise_gaming': {
      id: 'ceo_surprise_gaming',
      messages: [
          { id: 'csg1', role: 'system', sender: 'System', text: '⚠️ DAVIDE (CEO) se ha unido al grupo.', delay: 500 },
          { id: 'csg2', role: 'ceo', sender: 'Davide (CEO)', text: 'Buenas. Estuve viendo el dashboard de JIRA...', delay: 1500 },
          { id: 'csg3', role: 'ceo', sender: 'Davide (CEO)', text: '¿Por qué no hay commits en la última hora? Y escucho gritos en el Discord general.', delay: 3000 },
          { id: 'csg4', role: 'dev', sender: 'Javi', text: '😳', delay: 4000 }
      ],
      options: [
          { text: 'Defender al equipo: "Es una actividad de integración planificada."', nextNodeId: 'defense_shield', type: 'action' },
          { text: 'Venderlos: "Javi insistió. Yo les dije que trabajen."', nextNodeId: 'defense_betrayal', type: 'risky' }
      ]
  },
  'ceo_surprise_working': {
      id: 'ceo_surprise_working',
      messages: [
          { id: 'csw1', role: 'system', sender: 'System', text: '⚠️ DAVIDE (CEO) se ha unido al grupo.', delay: 500 },
          { id: 'csw2', role: 'ceo', sender: 'Davide (CEO)', text: 'Buenas gente. Vengo monitoreando el repo.', delay: 1500 },
          { id: 'csw3', role: 'dev', sender: 'Ana', text: 'Hola Davide. Sí, estamos cerrando el módulo de pagos.', delay: 2500 },
          { id: 'csw4', role: 'ceo', sender: 'Davide (CEO)', text: 'Veo buen ritmo. Pero noto el clima un poco tenso en Slack.', delay: 4000 }
      ],
      options: [
          { text: 'Pedir bono: "Trabajan duro, merecen un premio."', nextNodeId: 'ask_bonus', type: 'safe' },
          { text: 'Profesional: "Estamos enfocados en el objetivo."', nextNodeId: 'win_legend', type: 'neutral' }
      ]
  },

  // --- RESOLUTIONS ---
  'defense_shield': {
      id: 'defense_shield',
      messages: [
          { id: 'ds1', role: 'hero', sender: 'Tú', text: 'Davide, asumo la responsabilidad. Estábamos drenando el estrés post-conflicto de RRHH para evitar burnout.', delay: 500 },
          { id: 'ds2', role: 'ceo', sender: 'Davide (CEO)', text: '...', delay: 2000 },
          { id: 'ds3', role: 'ceo', sender: 'Davide (CEO)', text: 'Ok. Es arriesgado, pero si el equipo está unido y entregan mañana, lo acepto. Pero que no se repita.', delay: 3500 },
          { id: 'ds4', role: 'dev', sender: 'Javi', text: 'Gracias @Tú. Sos un crack. Mañana entregamos o morimos en el intento.', delay: 5000 }
      ],
      autoNext: 'win_legend'
  },
  'defense_betrayal': {
      id: 'defense_betrayal',
      messages: [
          { id: 'db1', role: 'hero', sender: 'Tú', text: 'Fue idea de Javi. Yo les dije que no, pero no me hicieron caso.', delay: 500 },
          { id: 'db2', role: 'dev', sender: 'Javi', text: '¿Perdón? Vos estabas jugando de Jett y trolleaste la ulti.', delay: 2000 },
          { id: 'db3', role: 'ceo', sender: 'Davide (CEO)', text: 'Suficiente. Falta de liderazgo y mentiras. Pasá por RRHH.', delay: 3500 }
      ],
      autoNext: 'lose_fired'
  },
  'ask_bonus': {
      id: 'ask_bonus',
      messages: [
          { id: 'ab1', role: 'hero', sender: 'Tú', text: 'El equipo está dejando todo. Si cerramos el sprint, creo que merecen el viernes libre.', delay: 500 },
          { id: 'ab2', role: 'ceo', sender: 'Davide (CEO)', text: 'Justo. Si entregan calidad, tienen mi OK.', delay: 2000 },
          { id: 'ab3', role: 'dev', sender: 'Ana', text: '🙌 ¡Esaaa!', delay: 3000 }
      ],
      autoNext: 'win_safe'
  },

  // --- OLD BRANCHES (Connected to new logic where applicable) ---
  'authoritarian': {
    id: 'authoritarian',
    messages: [
      { id: 'a1', role: 'hero', sender: 'Tú (Manager)', text: 'Equipo, son normas de la empresa para escalar. Necesitamos métricas. Por favor, acaten y sigan trabajando.', delay: 500 },
      { id: 'a2', role: 'dev', sender: 'Javi', text: 'Ah, listo. "Acaten". Pensé que éramos socios, no operarios de fábrica.', delay: 1500 },
      { id: 'a3', role: 'dev', sender: 'Javi', text: 'Andá a c... ', delay: 2000 },
      { id: 'del1', role: 'system', sender: 'System', text: '🚫 Este mensaje fue eliminado', delay: 2200 },
      { id: 'a4', role: 'dev', sender: 'Ana', text: 'Uh, Javi... tranqui. @Tú, creo que no estás entendiendo el punto.', delay: 3000 },
      { id: 'a5', role: 'manager', sender: 'Sofia', text: '@Tú, creo que eso fue muy duro. Javi está furioso.', delay: 4000 }
    ],
    options: [
      { text: 'Llamar a Javi urgente y pedir disculpas.', nextNodeId: 'redemption', type: 'safe' },
      { text: 'Mantener postura: "Nadie es imprescindible en Dyamanto".', nextNodeId: 'fired_ending', type: 'risky' }
    ]
  },
  'fired_ending': {
      id: 'fired_ending',
      messages: [
          { id: 'f1', role: 'hero', sender: 'Tú', text: 'Si no le gusta, que se vaya. Buscamos otro senior mañana.', delay: 500 },
          { id: 'f2', role: 'system', sender: 'System', text: '🚫 DAVIDE (CEO) se ha unido al grupo.', delay: 1500 },
          { id: 'f3', role: 'ceo', sender: 'Davide (CEO)', text: '@Tú Acabo de ver la renuncia de Javi y Ana. El cliente canceló el contrato. Pasá por mi oficina.', delay: 3000 },
          { id: 'f4', role: 'system', sender: 'System', text: '❌ Has sido eliminado del grupo "Dyamanto Devs".', delay: 4000 }
      ],
      autoNext: 'lose_fired'
  },
  'empathic': {
    id: 'empathic',
    messages: [
      { id: 'e1', role: 'hero', sender: 'Tú (Manager)', text: 'Entiendo el enojo. La "Autonomía" es clave acá. ¿Qué es lo que más ruido les hace del mail concretamente?', delay: 500 },
      { id: 'e2', role: 'dev', sender: 'Javi', text: 'Que nos midan por tiempo y no por objetivos. Yo codeo en 2 horas lo que otros en 8. Es injusto.', delay: 2000 },
      { id: 'e3', role: 'dev', sender: 'Ana', text: 'Exacto. Parece que quieren calentar silla. No somos un call center.', delay: 3000 },
      { id: 'e4', role: 'manager', sender: 'Sofia', text: 'Visto así, tienen razón. ¿Y si proponemos otra forma de medir?', delay: 4000 }
    ],
    options: [
      { text: 'Proponer reunión de co-creación de métricas mañana.', nextNodeId: 'cocreation', type: 'safe' },
      { text: 'Mandar audio explicando la presión de los inversores (Mantener apretado).', nextNodeId: 'record_defense', type: 'action' },
      { text: 'Filtrar el documento de salarios para desviar la atención.', nextNodeId: 'leak_salary', type: 'risky' }
    ]
  },
  'leak_salary': {
      id: 'leak_salary',
      messages: [
          { id: 'ls1', role: 'hero', sender: 'Tú', type: 'text', text: 'Miren esto antes de enojarse por las métricas...', delay: 500 },
          { id: 'ls2', role: 'hero', sender: 'Tú', text: '📄 Archivo adjunto: sueldos_2025.pdf', delay: 1000 },
          { id: 'ls3', role: 'dev', sender: 'Javi', text: '... 😳 ¿Qué es esto? ¿Por qué el nuevo gana más que yo?', delay: 2500 },
          { id: 'ls4', role: 'system', sender: 'System', text: 'Se desató el caos. La discusión de métricas pasó a segundo plano, pero la confianza se rompió.', delay: 4000 }
      ],
      autoNext: 'lose_burnout'
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
      { id: 'i1', role: 'system', sender: 'System', text: 'Has silenciado el chat...', delay: 500 },
      { id: 'i2', role: 'system', sender: 'System', text: '... 2 horas después ...', delay: 1500 },
      { id: 'i3', role: 'manager', sender: 'Sofia', text: '@Tú URGENTE. Javi pusheó un código roto a producción y apagó el teléfono. El servidor está caído.', delay: 3000 },
      { id: 'i4', role: 'manager', sender: 'Sofia', text: 'Los clientes están llamando. Esto es un desastre. Nadie responde.', delay: 4000 }
    ],
    options: [
      { text: 'Asumir la culpa y tratar de arreglarlo solo.', nextNodeId: 'crisis_management', type: 'neutral' },
      { text: 'Culpar a Javi: "Esto es sabotaje".', nextNodeId: 'blame_game', type: 'risky' }
    ]
  },
  'blame_game': {
      id: 'blame_game',
      messages: [
          { id: 'bg1', role: 'hero', sender: 'Tú', text: 'Esto fue intencional. Javi rompió todo antes de irse.', delay: 500 },
          { id: 'bg2', role: 'ceo', sender: 'Davide (CEO)', text: 'No me importan los culpables, me importa la solución. Tu falta de liderazgo permitió esto.', delay: 2000 }
      ],
      autoNext: 'lose_fired'
  },
  'crisis_management': {
      id: 'crisis_management',
      messages: [
          { id: 'cm1', role: 'hero', sender: 'Tú', text: 'Voy para la oficina. Me hago cargo. No toquen nada más.', delay: 500 },
          { id: 'cm2', role: 'system', sender: 'System', text: 'Lograste levantar el servidor, pero el equipo perdió la confianza en la gestión por tu ausencia previa.', delay: 2000 },
          { id: 'cm3', role: 'dev', sender: 'Javi', text: '(3 horas después) Volví. Perdón por apagar el cel, me quemé. Vi que levantaste el server. Gracias.', delay: 4000 },
      ],
      options: [
        { text: 'Aceptar disculpas y hablar de Burnout.', nextNodeId: 'gaming_rejected', type: 'safe' },
        { text: 'Sancionarlo. Fue inaceptable.', nextNodeId: 'lose_burnout', type: 'risky' }
      ]
  },
  'cocreation': {
    id: 'cocreation',
    messages: [
      { id: 'c1', role: 'hero', sender: 'Tú', text: 'Hagamos esto: ignoren el mail por hoy. Mañana nos juntamos y definimos nosotros cómo medir el avance (Story points, entregables, etc). ¿Trato?', delay: 500 },
      { id: 'c2', role: 'dev', sender: 'Javi', text: '... Ok. Eso me sirve. Si nosotros definimos el "cómo", me banco el "qué".', delay: 2000 },
      { id: 'c3', role: 'dev', sender: 'Ana', type: 'image', contentUrl: 'https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif', delay: 3000 },
    ],
    options: [], 
    autoNext: 'gaming_proposal'
  },
  'redemption': {
      id: 'redemption',
      messages: [
          { id: 'r1', role: 'hero', sender: 'Tú', text: '(Llamada finalizada) Ok, hablé con Javi. Vuelve. Admití que me equivoqué con el tono imperativo.', delay: 500 },
          { id: 'r2', role: 'dev', sender: 'Javi', text: 'Volví. Todo bien. Pero revisemos esas métricas por favor, no somos robots.', delay: 1500 }
      ],
      autoNext: 'gaming_proposal'
  },
  'win_legend': {
    id: 'win_legend',
    messages: [
       { id: 'w1', role: 'system', sender: 'RESULTADO', text: '🏆 LEYENDA CULTURAL', delay: 500 },
       { id: 'w2', role: 'system', sender: 'Feedback', text: 'Convertiste una crisis en una oportunidad para reforzar la cohesión (incluso jugando) sin descuidar el objetivo.', delay: 1500 }
    ]
  },
  'win_safe': {
      id: 'win_safe',
      messages: [
          { id: 'ws1', role: 'system', sender: 'RESULTADO', text: '⚖️ GESTIÓN SÓLIDA', delay: 500 },
          { id: 'ws2', role: 'system', sender: 'Feedback', text: 'Lograste retener al talento y mantener la productividad. Buen equilibrio.', delay: 1500 }
      ]
  },
  'lose_fired': {
      id: 'lose_fired',
      messages: [
          { id: 'lf1', role: 'system', sender: 'RESULTADO', text: '☠️ DESPIDO', delay: 500 },
          { id: 'lf2', role: 'system', sender: 'Feedback', text: 'Perdiste al equipo técnico por imponer autoridad o falta de lealtad. Dyamanto no perdona la traición.', delay: 1500 }
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
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingSender, setTypingSender] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isFastForward, setIsFastForward] = useState(false);
  
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
      // Speed up if Fast Forward
      const msgDelay = isFastForward ? 50 : (msg.delay || 1000);
      const typingStart = accumulatedDelay;
      accumulatedDelay += msgDelay;

      // Start typing indicator
      timeouts.push(setTimeout(() => {
        setIsTyping(true);
        setTypingSender(msg.sender);
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, typingStart));

      // Show message (append to history) with Deduplication
      timeouts.push(setTimeout(() => {
        setIsTyping(false);
        setChatHistory(prev => {
            // DEDUPLICATION FIX: Don't add if message ID already exists
            if (prev.some(m => m.id === msg.id)) return prev;
            return [...prev, msg];
        });
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
        setIsFastForward(false); // Reset fast forward for next choice block
    }, accumulatedDelay + (isFastForward ? 50 : 500)));

    return () => timeouts.forEach(clearTimeout);
  }, [currentNodeId, isFastForward]);

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
                  if (recordingInterval.current) clearInterval(recordingInterval.current);
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
    <div className="flex flex-col h-full bg-[#EFE7DE] relative font-sans">
      {/* WhatsApp Header - Modern & Clean */}
      <div className="bg-[#008069] p-3 text-white flex items-center shadow-none z-20 shrink-0 sticky top-0">
        <button 
          onClick={onBack} 
          className="mr-2 p-2 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors flex items-center justify-center"
          aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        </button>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 overflow-hidden border border-white/10">
            <img src="https://ui-avatars.com/api/?name=Dyamanto+Devs&background=25D366&color=fff" alt="Group" className="w-full h-full object-cover"/>
        </div>
        <div className="flex-1 cursor-default">
          <h2 className="font-bold text-base leading-tight">Dyamanto Devs 💎</h2>
          <p className="text-xs text-green-100 truncate opacity-90">
             {isTyping ? `${typingSender} está escribiendo...` : 'Javi, Ana, Davide, Tú...'}
          </p>
        </div>
        <div className="text-xl space-x-3 opacity-80">
            <span>📹</span>
            <span>📞</span>
            <span>⋮</span>
        </div>
      </div>

      {/* Chat Area - Flat Design - No Shadows */}
      <div 
        onClick={() => !showOptions && !isEnd && setIsFastForward(true)}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-fixed cursor-pointer"
      >
        
        {chatHistory.map((msg, index) => {
           const isMe = msg.role === 'hero';
           const isSystem = msg.role === 'system' || msg.role === 'ceo';
           
           if (isSystem) {
               return (
                   <div key={`${msg.id}-${index}`} className="flex justify-center my-4 animate-fade-in">
                       <div className={`${msg.role === 'ceo' ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-[#E1F2FB] text-slate-700 border border-[#cce4f0]'} text-[11px] font-medium px-4 py-1.5 rounded-lg text-center max-w-[85%] shadow-none`}>
                           {msg.text}
                       </div>
                   </div>
               )
           }

           return (
            <div key={`${msg.id}-${index}`} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-slide-up group relative`}>
                {msg.type === 'sticker' ? (
                     <div className="max-w-[160px] transition-transform hover:scale-105 active:scale-95">
                        <img src={msg.contentUrl} alt="Sticker" className="w-full h-auto drop-shadow-sm rounded-lg" />
                     </div>
                ) : (
                    <div className={`
                        max-w-[85%] px-3 py-2 text-sm relative shadow-none border
                        ${isMe ? 'bg-[#D9FDD3] rounded-2xl rounded-tr-sm border-[#C0EBA6] text-slate-800' : 'bg-white rounded-2xl rounded-tl-sm border-slate-100 text-slate-800'}
                    `}>
                        {!isMe && <p className={`text-xs font-bold mb-0.5 ${msg.role === 'dev' ? 'text-orange-600' : 'text-purple-700'}`}>{msg.sender}</p>}
                        
                        {msg.type === 'image' && (
                            <div className="mb-2 rounded-lg overflow-hidden border border-black/5 min-h-[150px] bg-slate-100 mt-1">
                                <img 
                                    src={msg.contentUrl} 
                                    alt="Media" 
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
                            <div className="flex items-center gap-3 min-w-[200px] py-2">
                                <div className="text-2xl text-slate-500 cursor-pointer hover:text-slate-700 transition-colors">▶️</div>
                                <div className="flex-1 h-1 bg-slate-300 rounded-full overflow-hidden">
                                    <div className="h-full w-1/3 bg-slate-500"></div>
                                </div>
                                <span className="text-[10px] text-slate-500 font-medium">0:15</span>
                            </div>
                        )}

                        {/* Text Message Content */}
                        {msg.text && (
                            <p className="leading-snug whitespace-pre-wrap font-normal">
                                {msg.text}
                            </p>
                        )}
                        
                        <div className="flex justify-end items-center gap-1 mt-1 select-none opacity-60">
                            <span className="text-[10px]">10:42 AM</span>
                            {isMe && <span className="text-blue-500 text-[10px] font-bold">✓✓</span>}
                        </div>

                        {/* Reactions Display */}
                        {reactions[msg.id] && (
                            <div className="absolute -bottom-2 right-4 bg-white rounded-full px-1.5 py-0.5 shadow-sm border border-slate-200 z-10 text-[10px]">
                                {reactions[msg.id]}
                            </div>
                        )}

                        {/* Reaction Picker (Hover) */}
                        <div className="absolute -top-10 left-0 hidden group-hover:flex bg-white rounded-full shadow-md p-1.5 gap-2 z-20 animate-pop border border-slate-100">
                            {['👍', '❤️', '😂', '🔥', '😡'].map(emoji => (
                                <button key={emoji} onClick={(e) => { e.stopPropagation(); toggleReaction(msg.id, emoji); }} className="hover:scale-125 transition-transform text-lg leading-none">
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          );
        })}
        
        {isTyping && (
             <div className="flex justify-start animate-pulse">
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-none border border-slate-100 flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                </div>
            </div>
        )}

        <div ref={scrollRef} className="h-6" />
      </div>

      {/* Input Area / Options - Cleaner Look */}
      <div className="bg-[#F0F2F5] p-3 flex flex-col items-center gap-2 shadow-none border-t border-slate-200 shrink-0 z-20 min-h-[80px] pb-safe">
        {showOptions && !isEnd && currentNode?.interactionType !== 'record_audio' && (
             <div className="flex flex-col w-full gap-2 pb-1">
                 {currentNode?.options?.map((opt, idx) => (
                     <button
                        key={idx}
                        onClick={() => handleOptionClick(opt.nextNodeId)}
                        className={`
                            w-full py-3.5 px-5 rounded-full font-medium text-sm shadow-sm transition-all active:scale-95
                            bg-white text-slate-800 border border-slate-200 hover:bg-slate-50
                            text-left flex items-center group
                        `}
                     >
                         <span className="w-6 h-6 rounded-full bg-slate-100 text-indigo-600 flex items-center justify-center mr-3 text-xs font-bold shrink-0 group-hover:bg-indigo-100 transition-colors">
                            {idx + 1}
                         </span>
                         {opt.text}
                     </button>
                 ))}
             </div>
        )}

        {/* Record Audio Interaction */}
        {showOptions && currentNode?.interactionType === 'record_audio' && (
            <div className="w-full flex flex-col items-center justify-center py-2 gap-4">
                 <p className="text-sm font-bold text-slate-600 animate-pulse">
                     {recordingProgress < 100 ? "Mantén presionado para grabar..." : "¡Audio listo!"}
                 </p>
                 
                 <div className="w-full max-w-[200px] h-1.5 bg-slate-300 rounded-full overflow-hidden">
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
                        w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all
                        ${isRecording ? 'scale-110 bg-red-600 ring-4 ring-red-200' : 'bg-[#00a884] hover:brightness-110 active:scale-95'}
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
                className="w-full bg-[#008069] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-md active:scale-95"
            >
                Volver al Hub
            </button>
        )}

        {!showOptions && !isEnd && (
            <div className="w-full text-center text-slate-400 text-[10px] uppercase tracking-widest opacity-60 mt-1">
                Toca para adelantar
            </div>
        )}
      </div>
    </div>
  );
};

export default Leaks;
