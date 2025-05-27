/**
 * VoiceOrb.tsx
 * This component displays a pulsing orb with the character's image and speaking status.
 * It provides visual feedback when the character is speaking and handles voice interactions.
 *
 * Functions:
 * - cleanup: Cleans up any existing Vapi and DailyIframe instances and logs actions for debugging.
 * - VoiceOrb: Main component for displaying the orb and managing the Vapi session.
 */

import { useEffect, useRef, useState } from 'react';
import { Character } from '@/lib/types';
import Image from 'next/image';
import { MutableRefObject } from 'react';
import { getVapi, stopVapi } from '@/lib/vapiSingleton';

interface VoiceOrbProps {
  character: Character;
  stopVoiceRef: MutableRefObject<() => void>;
}

export default function VoiceOrb({ character, stopVoiceRef }: VoiceOrbProps) {
  // State to track if the assistant is speaking
  const [isSpeaking, setIsSpeaking] = useState(false);
  // Ref to store the current Vapi instance
  const vapiRef = useRef<any>(null);

  // Function to clean up the current Vapi instance
  const cleanup = () => {
    console.log('[VoiceOrb] Cleanup called');
    // Stop and cleanup the shared Vapi instance
    stopVapi();
    vapiRef.current = null;
    const win = typeof window !== 'undefined' ? (window as any) : undefined;
    if (win && win.DailyIframe && win.DailyIframe.instance) {
      try {
        console.log('[VoiceOrb] Destroying window.DailyIframe.instance');
        win.DailyIframe.instance.destroy();
      } catch (e) {
        console.error('[VoiceOrb] Error destroying window.DailyIframe.instance:', e);
      }
    }
    setIsSpeaking(false);
  };

  useEffect(() => {
    let isMounted = true;

    const initConversation = async () => {
      // Fully stop any existing conversation & clear listeners
      await stopVapi();

      if (!isMounted) return;

      const vapi = getVapi();
      vapi.removeAllListeners();

      vapiRef.current = vapi;

      // Listen for speaking events BEFORE starting – avoids missing first event
      vapi.on('speech-start', () => setIsSpeaking(true));
      vapi.on('speech-end', () => setIsSpeaking(false));

      // Start the conversation with the selected assistant
      vapi.start(character.assistantId);

      // Expose cleanup function to parent via ref
      if (stopVoiceRef) {
        stopVoiceRef.current = cleanup;
      }
    };

    initConversation();

    // Stop the call if the user reloads or closes the tab
    const handleBeforeUnload = () => {
      cleanup();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up on unmount
    return () => {
      cleanup();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (stopVoiceRef) stopVoiceRef.current = () => {};
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character.assistantId]);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Pulsing orb visual with character image */}
      <div
        className={`w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 overflow-hidden
          ${isSpeaking ? 'bg-blue-400 animate-pulse-orb' : 'bg-blue-200'}`}
      >
        <Image
          src={character.imagePath}
          alt={character.name}
          width={320}
          height={320}
          className="object-cover w-full h-full rounded-full"
          priority
        />
      </div>
      <div className="mt-4 sm:mt-8 text-lg sm:text-2xl md:text-3xl text-white font-semibold text-center drop-shadow-lg px-2">
        {isSpeaking ? `${character.name} is talking...` : `Say something to ${character.name}!`}
      </div>
      <style jsx global>{`
        @keyframes pulse-orb {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.7); }
          50% { box-shadow: 0 0 60px 30px rgba(59,130,246,0.3); }
        }
        .animate-pulse-orb {
          animation: pulse-orb 1.2s infinite;
        }
      `}</style>
    </div>
  );
} 