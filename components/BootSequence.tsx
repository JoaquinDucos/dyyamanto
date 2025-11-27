
import React, { useEffect, useState } from 'react';

const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'logo' | 'loading' | 'done'>('logo');

  useEffect(() => {
    // Stage 1: Logo Pulse
    setTimeout(() => setStage('loading'), 1500);

    // Stage 2: Loading Bar
    const timer = setInterval(() => {
      setProgress(old => {
        if (old >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setStage('done');
            setTimeout(onComplete, 500);
          }, 200);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(old + diff, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 bg-black z-50 flex flex-col items-center justify-center transition-opacity duration-1000 ${stage === 'done' ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Dyamanto Logo */}
      <div className="relative w-24 h-24 mb-12">
        <div className="absolute inset-0 bg-indigo-500 dyamanto-logo animate-pulse-slow blur-xl opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-500 dyamanto-logo shadow-2xl flex items-center justify-center">
             <div className="w-12 h-12 bg-black/20 dyamanto-logo backdrop-blur-sm"></div>
        </div>
      </div>

      <h1 className="text-2xl font-black tracking-[0.2em] text-white mb-2 animate-fade-in">DYAMANTO</h1>
      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-12">Operating System v2.1</p>

      {/* Loading Bar */}
      <div className={`w-48 h-1 bg-slate-800 rounded-full overflow-hidden transition-opacity duration-500 ${stage === 'loading' ? 'opacity-100' : 'opacity-0'}`}>
        <div 
          className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BootSequence;
