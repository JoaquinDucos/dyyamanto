import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Simulator from './components/Simulator';
import Leaks from './components/Leaks';
import Dashboard from './components/Dashboard';
import BootSequence from './components/BootSequence';
import LockScreen from './components/LockScreen';
import { MailApp, BrowserApp, SettingsApp, PhoneApp, CalendarApp, AwardsApp, WeatherApp, MusicApp, ClockApp, BADGES } from './components/OSApps';
import { Message } from './types';

const App: React.FC = () => {
  const [systemState, setSystemState] = useState<'boot' | 'locked' | 'active'>('boot');
  const [currentView, setCurrentView] = useState<string>('landing');
  const [isDesktop, setIsDesktop] = useState(false);
  
  // GLOBAL GAMIFICATION STATE
  const [stability, setStability] = useState(100);
  const [morale, setMorale] = useState(90);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  
  // --- PERSISTENT APP STATES (RAM) ---
  
  // 1. CHAT STATE (Whatsapp)
  const [chatState, setChatState] = useState<{
      currentNodeId: string;
      history: Message[];
      isTyping: boolean;
      completedNodes: string[];
  }>({
      currentNodeId: 'start',
      history: [],
      isTyping: false,
      completedNodes: []
  });

  // 2. SIMULATOR STATE
  const [simState, setSimState] = useState<{
      isActive: boolean;
      levelIndex: number;
      streak: number;
      waitingForMail: boolean; // Cross-app trigger
      mailEventCompleted: boolean; // Fix for loop
  }>({
      isActive: false,
      levelIndex: 0,
      streak: 0,
      waitingForMail: false,
      mailEventCompleted: false
  });

  // INTER-APP STATE
  const [incomingCall, setIncomingCall] = useState<string | null>(null);
  const [mailInbox, setMailInbox] = useState<any[]>([
      { 
        id: 1, 
        sender: 'RRHH Global', 
        subject: 'Nueva Política: Registro Horario', 
        time: 'Yesterday', 
        read: true,
        body: `Hola equipo,\n\nA partir del próximo lunes, implementaremos un nuevo sistema de tracking. Es obligatorio registrar la actividad cada 15 minutos para asegurar la facturación correcta a los clientes.\n\nSabemos que puede ser tedioso, pero es una directiva de arriba.\n\nSaludos,\nRRHH.`
      },
      { 
        id: 2, 
        sender: 'Davide (CEO)', 
        subject: 'Q3 Goals - Vamos bien', 
        time: '2 days ago', 
        read: true,
        body: `Gente,\n\nEstuve viendo los números y venimos sólidos. Solo les pido que mantengamos el foco en el producto "Apex". Es nuestro unicornio.\n\nCualquier bloqueo me avisan directo.\n\nDavide.` 
      },
      {
        id: 3,
        sender: 'Javi',
        subject: 'Re: Pull Request #402',
        time: '3 days ago',
        read: true,
        body: `Mira, no voy a aprobar ese PR si no refactorizas el módulo de autenticación. Es un espagueti. \n\nMedia pila.\n\nJavi.`
      }
  ]);
  
  // NOTIFICATION STATE
  const [notification, setNotification] = useState<{title: string, icon: string, color: string} | null>(null);

  useEffect(() => {
    const checkRes = () => setIsDesktop(window.innerWidth > 768);
    checkRes();
    window.addEventListener('resize', checkRes);
    return () => window.removeEventListener('resize', checkRes);
  }, []);

  const navigateTo = (view: string) => {
    setCurrentView(view);
    if (view !== 'phone') setIncomingCall(null); 
  };

  const unlockBadge = (id: string) => {
      if (!unlockedBadges.includes(id)) {
          const badge = BADGES[id as keyof typeof BADGES];
          if (badge) {
            setUnlockedBadges(prev => [...prev, id]);
            // Trigger Dynamic Island Notification
            setNotification({
                title: badge.title,
                icon: badge.icon,
                color: badge.rarity === 'Legendario' ? 'text-purple-400' : 'text-yellow-400'
            });
            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
            setTimeout(() => setNotification(null), 4000);
          }
      }
  };

  // --- CROSS APP LOGIC ---

  // 1. Chat triggers Phone Call
  const triggerIncomingCall = (callerName: string) => {
      setIncomingCall(callerName);
      setTimeout(() => {
          setCurrentView('phone');
      }, 1500);
  };

  // 2. Phone Call Ends -> Return to Chat (Logic handled in PhoneApp render prop)
  const handleCallEnded = () => {
      if (currentView === 'phone' && chatState.currentNodeId === 'lose_fired') {
          // If we were fired in chat, update chat to show post-call silence
          setChatState(prev => ({ ...prev, currentNodeId: 'post_call_silence' }));
          setTimeout(() => setCurrentView('leaks'), 500);
      } else {
          navigateTo('landing');
      }
  };

  // 3. Simulator triggers Mail (Investor Audit)
  const triggerInvestorMail = () => {
      // Add urgent mail
      setMailInbox(prev => [
          { 
              id: 99, 
              sender: 'Board of Directors', 
              subject: 'URGENT: Budget Review', 
              time: 'Now', 
              read: false,
              isInteractive: true // Special flag
          },
          ...prev
      ]);
      setSimState(prev => ({ ...prev, waitingForMail: true }));
      // Notification
      setNotification({ title: 'New Mail', icon: '✉️', color: 'text-blue-500' });
      // Clear notification after 4 seconds
      setTimeout(() => setNotification(null), 4000);
  };

  const handleMailDecision = (choice: 'cut' | 'invest') => {
      // Logic for responding to investor mail
      if (choice === 'cut') {
          setStability(s => Math.min(100, s + 15));
          setMorale(m => Math.max(0, m - 10));
          unlockBadge('CFO_MINDSET');
      } else {
          setStability(s => Math.max(0, s - 10));
          setMorale(m => Math.min(100, m + 15));
      }
      // Remove interactive flag or mark done
      setSimState(prev => ({ ...prev, waitingForMail: false, mailEventCompleted: true }));
      setMailInbox(prev => prev.map(m => m.id === 99 ? { ...m, read: true, subject: 'Re: Budget Review (Sent)' } : m));
      
      // Notify user to return
      setNotification({ title: 'Simulation Resumed', icon: '▶️', color: 'text-green-500' });
      setTimeout(() => setNotification(null), 4000);
      
      // Auto-navigate back to simulator for seamless flow
      setTimeout(() => navigateTo('simulator'), 1000);
  };


  // Helper function to render the current app view
  const renderCurrentView = () => {
    switch (currentView) {
        case 'landing':
            return <Landing onNavigate={navigateTo} stability={stability} morale={morale} />;
        case 'simulator':
            return (
                <Simulator 
                    onBack={() => navigateTo('landing')} 
                    globalStability={stability}
                    globalMorale={morale}
                    setGlobalStability={setStability}
                    setGlobalMorale={setMorale}
                    unlockBadge={unlockBadge}
                    // Persistence & Cross App
                    simState={simState}
                    setSimState={setSimState}
                    onTriggerMail={triggerInvestorMail}
                    onNavigateToMail={() => navigateTo('mail')}
                />
            );
        case 'leaks': // Now internally "Whatsapp"
            return (
                <Leaks 
                    onBack={() => navigateTo('landing')} 
                    unlockBadge={unlockBadge}
                    onTriggerCall={triggerIncomingCall}
                    // Persistence props
                    chatState={chatState}
                    setChatState={setChatState}
                />
            );
        case 'dashboard':
            return <Dashboard onBack={() => navigateTo('landing')} />;
        case 'mail':
            return (
                <MailApp 
                    onBack={() => navigateTo('landing')} 
                    inbox={mailInbox}
                    onReply={handleMailDecision}
                />
            );
        case 'browser':
            return <BrowserApp onBack={() => navigateTo('landing')} />;
        case 'settings':
            return <SettingsApp onBack={() => navigateTo('landing')} />;
        case 'phone':
            return (
                <PhoneApp 
                    onBack={() => navigateTo('landing')} 
                    initialIncomingCall={incomingCall} 
                    onCallEnded={handleCallEnded}
                />
            );
        case 'calendar':
            return <CalendarApp onBack={() => navigateTo('landing')} />;
        case 'awards':
            return <AwardsApp onBack={() => navigateTo('landing')} unlockedBadges={unlockedBadges} />;
        case 'weather':
            return <WeatherApp onBack={() => navigateTo('landing')} />;
        case 'music':
            return <MusicApp onBack={() => navigateTo('landing')} />;
        case 'clock':
            return <ClockApp onBack={() => navigateTo('landing')} />;
        default:
            return <Landing onNavigate={navigateTo} stability={stability} morale={morale} />;
    }
  };

  const ScreenContent = (
    <div className="w-full h-full relative overflow-hidden bg-black font-sans text-slate-900">
         {/* Boot Sequence Overlay */}
         {systemState === 'boot' && (
             <div className="absolute inset-0 z-[60] bg-black">
                <BootSequence onComplete={() => setSystemState('locked')} />
             </div>
         )}

         {/* Dynamic Island Notification */}
         <div className={`absolute top-0 left-0 right-0 z-[70] flex justify-center pointer-events-none transition-all duration-500 ${notification ? 'translate-y-2' : '-translate-y-24'}`}>
            <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-full py-3 px-6 shadow-2xl flex items-center gap-4 min-w-[200px] animate-bounce">
                {notification && (
                    <>
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-2xl animate-pulse">
                            {notification.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Dyamanto OS</span>
                            <span className={`text-sm font-bold ${notification.color}`}>{notification.title}</span>
                        </div>
                    </>
                )}
            </div>
         </div>

         {/* Lock Screen */}
         <div className={`absolute inset-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${systemState === 'active' ? '-translate-y-full pointer-events-none' : 'translate-y-0'}`}>
            <LockScreen onUnlock={() => setSystemState('active')} />
         </div>

         {/* Main App Router */}
         <div 
            className={`
                w-full h-full transition-all duration-500 ease-in-out bg-black
                ${systemState === 'boot' ? 'opacity-0 invisible' : 'opacity-100 visible'}
                ${systemState === 'locked' ? 'scale-95 brightness-50' : 'scale-100 brightness-100'}
            `}
         >
            {renderCurrentView()}
         </div>
    </div>
  );

  if (isDesktop) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-8 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070')] bg-cover bg-center font-sans">
        <div className="absolute inset-0 backdrop-blur-xl bg-black/60"></div>
        <div className="phone-frame relative w-[390px] h-[844px] bg-black shadow-2xl z-10 overflow-hidden ring-4 ring-slate-800">
          <div className="absolute top-0 left-0 right-0 h-[34px] z-50 pointer-events-none flex justify-center pt-2">
             <div className="w-32 h-7 bg-black rounded-full flex items-center justify-center gap-2 px-3">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                 <div className="w-1 h-1 bg-white/20 rounded-full"></div>
             </div>
          </div>
          {ScreenContent}
           <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50 pointer-events-none backdrop-invert mix-blend-difference"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden font-sans">
      {ScreenContent}
    </div>
  );
};

export default App;