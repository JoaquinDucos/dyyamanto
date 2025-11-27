
import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Simulator from './components/Simulator';
import Leaks from './components/Leaks';

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
    <>
      {currentView === 'landing' && <Landing onNavigate={navigateTo} />}
      {currentView === 'simulator' && <Simulator onBack={() => navigateTo('landing')} />}
      {currentView === 'leaks' && <Leaks onBack={() => navigateTo('landing')} />}
    </>
  );

  if (isDesktop) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 backdrop-blur-md bg-black/40"></div>
        
        {/* Phone Frame */}
        <div className="phone-frame relative w-[375px] h-[812px] bg-white shadow-2xl z-10 overflow-hidden">
          {/* Notch / Status Bar Area */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-black/20 z-50 pointer-events-none flex items-center justify-center px-6">
             <div className="w-16 h-4 bg-black rounded-b-xl"></div>
          </div>
          <Content />
        </div>

        <div className="absolute bottom-8 text-white/50 text-sm font-light">
          Dyamanto Experience • Desktop Mode
        </div>
      </div>
    );
  }

  return (
    <div className="antialiased min-h-screen bg-slate-50 overflow-hidden">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl overflow-hidden relative">
        <Content />
      </div>
    </div>
  );
};

export default App;
