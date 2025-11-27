
import React from 'react';

interface ChatHeaderProps {
  title: string;
  subtitle: string;
  avatarUrl: string;
  onBack: () => void;
  onInfo: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title, subtitle, avatarUrl, onBack, onInfo }) => {
  return (
    <div 
        className="bg-[#008069] px-3 pb-3 pt-safe text-white flex items-center shadow-md z-30 shrink-0 sticky top-0 w-full backdrop-blur-md bg-opacity-95"
        onClick={onInfo}
      >
        <button 
            onClick={(e) => { e.stopPropagation(); onBack(); }} 
            className="p-1 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors active:scale-95 w-10 h-10 -ml-1"
            aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        </button>
        
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center ml-1 mr-3 overflow-hidden border border-white/10 shrink-0">
            <img src={avatarUrl} alt="Group" className="w-full h-full object-cover"/>
        </div>
        
        <div className="flex-1 min-w-0 flex flex-col justify-center cursor-pointer">
          <h2 className="font-bold text-[16px] leading-tight flex items-center gap-2 truncate">
              {title}
          </h2>
          <p className="text-[12px] text-green-100 truncate opacity-90 font-medium">
             {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-1">
             <button className="p-2 hover:bg-white/10 rounded-full transition-colors w-10 h-10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15.6 11.6L22 7v10l-6.4-4.5v-1z"/><rect x="2" y="5" width="14" height="14" rx="2" ry="2"/></svg>
             </button>
             <button className="p-2 hover:bg-white/10 rounded-full transition-colors w-10 h-10 flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
             </button>
             <button className="p-2 hover:bg-white/10 rounded-full transition-colors w-10 h-10 flex items-center justify-center">
                 <span className="text-xl leading-none font-bold pb-2">⋮</span>
            </button>
        </div>
      </div>
  );
};

export default ChatHeader;
