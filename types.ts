
export interface Message {
  id: string;
  sender: string;
  role: 'dev' | 'manager' | 'system' | 'hero' | 'ceo'; 
  text?: string;
  type?: 'text' | 'image' | 'audio' | 'sticker'; // Added sticker
  contentUrl?: string; // For mock images or audio length
  delay: number;
}

export interface ChatNode {
  id: string;
  messages: Message[];
  options?: {
    text: string;
    nextNodeId: string;
    type: 'risky' | 'safe' | 'neutral' | 'legend' | 'action'; // Added 'action' for special interactions
  }[];
  interactionType?: 'choice' | 'record_audio' | 'reaction'; // New interaction types
  nextDelay?: number;
  autoNext?: string;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  options: {
    text: string;
    stabilityImpact: number;
    moraleImpact: number; // New metric
    feedback: string;
    theory: string;
  }[];
  hint?: string; // Advisor hint
}

export enum GameState {
  INTRO = 'INTRO',
  PLAYING = 'PLAYING',
  EVENT = 'EVENT', // Random event state
  COLLAPSING = 'COLLAPSING', 
  WON = 'WON',
  LOST = 'LOST'
}
