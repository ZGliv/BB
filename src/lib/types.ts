/**
 * types.ts
 * This file contains all the TypeScript type definitions used throughout the application.
 * It includes types for transcripts, messages, and Vapi SDK configurations.
 */

// Represents a single message in the conversation
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

// Represents the current speaking status
export interface SpeakingStatus {
  isSpeaking: boolean;
  speaker: 'user' | 'assistant' | null;
}

// Represents the current connection status
export interface ConnectionStatus {
  isConnected: boolean;
  error?: string;
}

// Represents the configuration for Vapi SDK
export interface VapiConfig {
  publicKey: string;
  assistantId: string;
}

// Represents the audio visualization data
export interface AudioVisualizerData {
  frequencyData: Uint8Array;
  timeDomainData: Uint8Array;
}

// Represents the state of the conversation
export interface ConversationState {
  messages: Message[];
  speakingStatus: SpeakingStatus;
  connectionStatus: ConnectionStatus;
  isMuted: boolean;
  isProcessing: boolean;
}

// Represents the props for the AIConversation component
export interface AIConversationProps {
  assistantId: string;
  onError?: (error: Error) => void;
  onStatusChange?: (status: ConnectionStatus) => void;
}

// Represents the props for the AudioVisualizer component
export interface AudioVisualizerProps {
  isSpeaking: boolean;
  data?: AudioVisualizerData;
  className?: string;
}

/**
 * types.ts
 * This file contains TypeScript interfaces and types used throughout the application.
 * It defines the structure for characters and their associated data.
 */

// Interface for character data
export interface Character {
  id: string;
  name: string;
  assistantId: string;
  imagePath: string;
  backgroundImage: string;
}

// Interface for chat message
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Interface for chat state
export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
} 