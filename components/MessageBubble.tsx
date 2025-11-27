
import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  msg: Message;
  isMe: boolean;
  isSystem: boolean;
  isCeo: boolean;
  reaction?: string;
  activeReactionId: string | null;
  onToggleReaction: (msgId: string, emoji: string) => void;
  onReactionClick: (msgId: string) => void;
  onCloseReaction: () => void;
}

const FALLBACK_IMG_URL = "https://placehold.co/400x300/EEE/31343C?text=Image+Error";

const AudioPlayer: React.FC = () => {
    const [playing, setPlaying] = React.useState(false);
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (playing) {
            interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 100) {
                        setPlaying(false);
                        return 0;
                    }
                    return p + 2;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [playing]);

    return (
        <div className="flex items-center gap-3 min-w-[200px] py-1 select-none">
            <button 
                onClick={(e) => { e.stopPropagation(); setPlaying(!playing); }}
                className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-300 transition-colors shrink-0"
            >
                {playing ? '⏸️' : '▶️'}
            </button>
            <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                <div className="w-full h-1 bg-slate-300/50 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-500 transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 font-mono tracking-tighter">
                    <span>0:{Math.floor(progress * 0.15).toString().padStart(2, '0')}</span>
                    <span>0:15</span>
                </div>
            </div>
            <div className="relative shrink-0">
                 <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-200">
                    <img src="https://ui-avatars.com/api/?name=Sofia+PO&background=random" alt="S" />
                 </div>
                 <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
        </div>
    )
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
    msg, isMe, isSystem, isCeo, reaction, activeReactionId, onToggleReaction, onReactionClick, onCloseReaction 
}) => {
    
    if (isSystem) {
        return (
            <div className="flex justify-center my-3 animate-fade-in px-8">
                <div className="bg-[#E1F2FB] text-slate-600 border border-[#cce4f0] text-[10px] font-bold px-3 py-1.5 rounded-lg text-center shadow-sm uppercase tracking-wide">
                    {msg.text}
                </div>
            </div>
        )
    }

    return (
        <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-slide-up relative group items-end mb-1`}>
            
            {/* Reaction Button Logic */}
            <div className={`
                ${activeReactionId === msg.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} 
                transition-opacity duration-200 absolute top-0 
                ${isMe ? '-left-8' : '-right-8'}
            `}>
                <button 
                    onClick={(e) => { e.stopPropagation(); onReactionClick(msg.id); }}
                    className="text-lg text-slate-400 hover:text-slate-600 p-1"
                >
                    ☺
                </button>
            </div>

            {/* Reaction Picker Popup */}
            {activeReactionId === msg.id && (
                <div 
                    className={`absolute bottom-full mb-1 ${isMe ? 'right-0' : 'left-0'} z-20`}
                    onMouseLeave={onCloseReaction}
                >
                    <div className="bg-white rounded-full shadow-xl p-1.5 flex gap-1.5 animate-pop border border-slate-100 items-center">
                            {['👍', '❤️', '😂', '🔥', '😡'].map(emoji => (
                            <button 
                                key={emoji} 
                                onClick={(e) => { e.stopPropagation(); onToggleReaction(msg.id, emoji); }} 
                                className="hover:scale-125 transition-transform text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50"
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Content Container */}
            {msg.type === 'sticker' ? (
                <div className="max-w-[160px] cursor-pointer relative mx-2" onDoubleClick={() => onToggleReaction(msg.id, '❤️')}>
                    <img src={msg.contentUrl} alt="Sticker" className="w-full h-auto drop-shadow-md rounded-xl hover:scale-[1.02] transition-transform" />
                    {reaction && (
                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md border border-slate-200 z-10 text-xs animate-pop">
                            {reaction}
                        </div>
                    )}
                </div>
            ) : (
                <div className={`
                    max-w-[85%] sm:max-w-[70%] px-3 py-1.5 text-[15px] relative shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] border select-text
                    ${isMe ? 'bg-[#D9FDD3] rounded-2xl rounded-tr-sm border-[#C0EBA6] text-slate-900' : 
                        isCeo ? 'bg-[#111b21] text-[#e9edef] rounded-2xl rounded-tl-sm border-amber-900/50' : 
                        'bg-white rounded-2xl rounded-tl-sm border-white text-slate-900'}
                    mx-2
                `}>
                    {/* Sender Name */}
                    {!isMe && (
                        <div className="flex justify-between items-center mb-0.5">
                            <p className={`text-[12px] font-bold leading-tight ${isCeo ? 'text-amber-400' : msg.role === 'dev' ? 'text-orange-600' : 'text-purple-700'}`}>
                                {msg.sender}
                                {isCeo && ' 👑'}
                            </p>
                        </div>
                    )}
                    
                    {/* Media: Image */}
                    {msg.type === 'image' && (
                        <div className="mb-1 rounded-lg overflow-hidden bg-slate-100 mt-0.5 cursor-pointer max-w-sm">
                            <img src={msg.contentUrl} className="w-full h-auto object-cover hover:opacity-90 transition-opacity" onError={(e) => {e.currentTarget.src = FALLBACK_IMG_URL}}/>
                        </div>
                    )}
                    
                    {/* Media: Audio or Text */}
                    {msg.type === 'audio' ? (
                        <AudioPlayer />
                    ) : (
                        <p className={`leading-snug whitespace-pre-wrap relative z-10 ${msg.type === 'image' ? 'mt-1' : ''}`}>{msg.text}</p>
                    )}
                    
                    {/* Timestamp & Status */}
                    <div className={`flex justify-end items-center gap-1 mt-0.5 opacity-60 select-none text-[10px] ${isCeo ? 'text-slate-400' : 'text-slate-500'}`}>
                        <span>10:42</span>
                        {isMe && <span className="text-[#53bdeb] font-bold text-[11px]">✓✓</span>}
                    </div>

                    {/* Active Reaction Badge */}
                    {reaction && (
                        <div className="absolute -bottom-2 right-0 bg-white rounded-full px-1 py-0.5 shadow-sm border border-slate-100 z-10 text-[10px] animate-pop cursor-pointer hover:scale-110 transition-transform">
                            {reaction}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MessageBubble;
