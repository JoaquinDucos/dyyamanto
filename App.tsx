
import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Simulator from './components/Simulator';
import Leaks from './components/Leaks';
import Dashboard from './components/Dashboard';
import { MailApp, BrowserApp, SettingsApp, PhoneApp } from './components/OSApps';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkRes = () => setIsDesktop(window.innerWidth > 768);
    checkRes();
    window.addEventListener('resize', checkRes);
    return () => window.removeEventListener('resize', checkRes);
  }, []);

  const navigateTo = (view: string) => {
    setCurrentView(view);
  };

  const Content = () => (
    <div className="w-full h-full relative overflow-hidden bg-slate-900">
      {/* View Router */}
      {currentView === 'landing' && <Landing onNavigate={navigateTo} />}
      {currentView === 'simulator' && <Simulator onBack={() => navigateTo('landing')} />}
      {currentView === 'leaks' && <Leaks onBack={() => navigateTo('landing')} />}
      {currentView === 'dashboard' && <Dashboard onBack={() => navigateTo('landing')} />}
      
      {/* New OS Apps */}
      {currentView === 'mail' && <MailApp onBack={() => navigateTo('landing')} />}
      {currentView === 'browser' && <BrowserApp onBack={() => navigateTo('landing')} />}
      {currentView === 'settings' && <SettingsApp onBack={() => navigateTo('landing')} />}
      {currentView === 'phone' && <PhoneApp onBack={() => navigateTo('landing')} />}
    </div>
  );

  if (isDesktop) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop')] bg-cover bg-center font-sans">
        <div className="absolute inset-0 backdrop-blur-md bg-black/40"></div>
        
        {/* Phone Frame */}
        <div className="phone-frame relative w-[375px] h-[812px] bg-black shadow-2xl z-10 overflow-hidden ring-8 ring-slate-800">
          {/* Dynamic Island / Notch */}
          <div className="absolute top-0 left-0 right-0 h-7 z-50 pointer-events-none flex justify-center">
             <div className="w-24 h-6 bg-black rounded-b-2xl"></div>
          </div>
          <Content />
           {/* Home Indicator */}
           <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50 pointer-events-none"></div>
        </div>

        <div className="absolute bottom-8 text-white/50 text-sm font-light tracking-widest uppercase">
          Dyamanto Experience • Desktop Simulator
        </div>
      </div>
    );
  }

  // Mobile View - Full Viewport
  return (
    <div className="fixed inset-0 bg-black overflow-hidden font-sans">
      <Content />
    </div>
  );
};

export default App;
