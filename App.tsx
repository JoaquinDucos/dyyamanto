import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Simulator from './components/Simulator';
import Leaks from './components/Leaks';
import Dashboard from './components/Dashboard';
import BootSequence from './components/BootSequence';
import LockScreen from './components/LockScreen';
import { MailApp, BrowserApp, SettingsApp, PhoneApp, CalendarApp, PhotosApp, WeatherApp, MusicApp, ClockApp } from './components/OSApps';

const App: React.FC = () => {
  const [systemState, setSystemState] = useState<'boot' | 'locked' | 'active'>('boot');
  const [currentView, setCurrentView] = useState<string>('landing');
  const [isDesktop, setIsDesktop] = useState(false);
  
  // GLOBAL GAMIFICATION STATE
  const [stability, setStability] = useState(100);
  const [morale, setMorale] = useState(90);

  useEffect(() => {
    const checkRes = () => setIsDesktop(window.innerWidth > 768);
    checkRes();
    window.addEventListener('resize', checkRes);
    return () => window.removeEventListener('resize', checkRes);
  }, []);

  const navigateTo = (view: string) => {
    setCurrentView(view);
  };

  // Helper function to render the current app view (not a component definition)
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
                />
            );
        case 'leaks':
            return <Leaks onBack={() => navigateTo('landing')} />;
        case 'dashboard':
            return <Dashboard onBack={() => navigateTo('landing')} />;
        case 'mail':
            return <MailApp onBack={() => navigateTo('landing')} />;
        case 'browser':
            return <BrowserApp onBack={() => navigateTo('landing')} />;
        case 'settings':
            return <SettingsApp onBack={() => navigateTo('landing')} />;
        case 'phone':
            return <PhoneApp onBack={() => navigateTo('landing')} />;
        case 'calendar':
            return <CalendarApp onBack={() => navigateTo('landing')} />;
        case 'photos':
            return <PhotosApp onBack={() => navigateTo('landing')} />;
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
             <div className="absolute inset-0 z-50">
                <BootSequence onComplete={() => setSystemState('locked')} />
             </div>
         )}

         {/* Curtain */}
         {systemState === 'locked' && <LockScreen onUnlock={() => setSystemState('active')} />}

         {/* Router */}
         <div className={`w-full h-full transition-all duration-500 ease-in-out ${systemState === 'locked' || systemState === 'boot' ? 'scale-95 brightness-50 pointer-events-none' : 'scale-100 brightness-100'}`}>
            {renderCurrentView()}
         </div>
    </div>
  );

  if (isDesktop) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-8 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070')] bg-cover bg-center font-sans">
        <div className="absolute inset-0 backdrop-blur-xl bg-black/60"></div>
        
        <div className="phone-frame relative w-[390px] h-[844px] bg-black shadow-2xl z-10 overflow-hidden ring-4 ring-slate-800">
          {/* Notch Simulation */}
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