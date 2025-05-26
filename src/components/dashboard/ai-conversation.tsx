"use client";

/**
 * ai-conversation.tsx
 * This component manages the AI conversation interface, including voice interactions,
 * transcript updates, and conversation state. It integrates with Vapi.ai for voice
 * conversations and provides fallback mechanisms when needed.
 */

import { useEffect, useRef, useState } from 'react';
import { AIConversationProps, ConversationState, Message, SpeakingStatus } from '@/lib/types';
import { AudioVisualizer } from '@/components/ui/audio-visualizer';
import { initializeVapi, startConversation, stopConversation, cleanupVapi } from '@/lib/vapi/vapi-config';

// Initial state for the conversation
const initialState: ConversationState = {
  messages: [],
  speakingStatus: { isSpeaking: false, speaker: null },
  connectionStatus: { isConnected: false },
  isMuted: false,
  isProcessing: false,
};

// AIConversation component that handles voice interactions and conversation state
export const AIConversation = ({ assistantId, onError, onStatusChange }: AIConversationProps) => {
  const [state, setState] = useState<ConversationState>(initialState);
  const vapiRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Initialize audio context and analyzer
  const initializeAudio = async () => {
    try {
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64;
    } catch (error) {
      console.error('Failed to initialize audio:', error);
      onError?.(error as Error);
    }
  };

  // Initialize Vapi SDK and start conversation
  const initializeConversation = async () => {
    try {
      const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
      if (!publicKey) {
        throw new Error('Vapi public key is not configured');
      }

      vapiRef.current = await initializeVapi({ publicKey, assistantId });
      
      await startConversation(vapiRef.current, assistantId, {
        onTranscript: (text: string) => {
          setState(prev => ({
            ...prev,
            messages: [
              ...prev.messages,
              {
                id: Date.now().toString(),
                content: text,
                role: 'assistant',
                timestamp: new Date(),
              },
            ],
          }));
        },
        onSpeaking: (isSpeaking: boolean) => {
          setState(prev => ({
            ...prev,
            speakingStatus: {
              isSpeaking,
              speaker: isSpeaking ? 'assistant' : null,
            },
          }));
        },
      });

      setState(prev => ({
        ...prev,
        connectionStatus: { isConnected: true },
      }));
      onStatusChange?.({ isConnected: true });
    } catch (error) {
      console.error('Failed to initialize conversation:', error);
      setState(prev => ({
        ...prev,
        connectionStatus: { isConnected: false, error: (error as Error).message },
      }));
      onStatusChange?.({ isConnected: false, error: (error as Error).message });
      onError?.(error as Error);
    }
  };

  // Cleanup function
  const cleanup = async () => {
    if (vapiRef.current) {
      await cleanupVapi(vapiRef.current);
    }
    if (audioContextRef.current) {
      await audioContextRef.current.close();
    }
  };

  // Initialize on mount
  useEffect(() => {
    initializeAudio();
    initializeConversation();

    return () => {
      cleanup();
    };
  }, [assistantId]);

  // Toggle mute state
  const toggleMute = () => {
    setState(prev => ({
      ...prev,
      isMuted: !prev.isMuted,
    }));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Audio visualization */}
      <div className="p-4">
        <AudioVisualizer
          isSpeaking={state.speakingStatus.isSpeaking}
          data={analyserRef.current ? {
            frequencyData: new Uint8Array(analyserRef.current.frequencyBinCount),
            timeDomainData: new Uint8Array(analyserRef.current.frequencyBinCount),
          } : undefined}
        />
      </div>

      {/* Messages display */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {state.messages.map((message: Message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="p-4 border-t">
        <button
          onClick={toggleMute}
          className={`px-4 py-2 rounded-lg ${
            state.isMuted
              ? 'bg-red-500 text-white'
              : 'bg-blue-500 text-white'
          }`}
        >
          {state.isMuted ? 'Unmute' : 'Mute'}
        </button>
      </div>
    </div>
  );
}; 