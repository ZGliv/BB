/**
 * VoiceOrb.tsx
 * This component displays a pulsing orb and starts a Vapi AI voice conversation with the selected assistant on mount.
 * The orb animates when the assistant is speaking and shows the character's image.
 *
 * Functions:
 * - VoiceOrb: Renders the orb and manages Vapi AI voice session.
 * - cleanup: Stops the current Vapi instance and removes all listeners.
 */

import { useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';
import { Character } from '@/lib/types';
import Image from 'next/image';

// Static reference to the last Vapi instance
let lastVapiInstance: any = null;

interface VoiceOrbProps {
  character: Character;
  stopVoiceRef?: React.MutableRefObject<() => void>;
}

export default function VoiceOrb({ character, stopVoiceRef }: VoiceOrbProps) {
  // State to track if the assistant is speaking
  const [isSpeaking, setIsSpeaking] = useState(false);
  // Ref to store the current Vapi instance
  const vapiRef = useRef<any>(null);

  // Function to clean up the current Vapi instance
  const cleanup = () => {
    if (vapiRef.current) {
      if (typeof vapiRef.current.destroy === 'function') {
        vapiRef.current.destroy();
      } else {
        vapiRef.current.stop();
        vapiRef.current.removeAllListeners();
      }
      vapiRef.current = null;
    }
    if (lastVapiInstance) {
      if (typeof lastVapiInstance.destroy === 'function') {
        lastVapiInstance.destroy();
      } else {
        lastVapiInstance.stop();
        lastVapiInstance.removeAllListeners();
      }
      lastVapiInstance = null;
    }
    const win = typeof window !== 'undefined' ? (window as any) : undefined;
    if (win && win.DailyIframe && win.DailyIframe.instance) {
      try {
        win.DailyIframe.instance.destroy();
      } catch (e) {
        // Ignore if already destroyed or not available
      }
    }
    setIsSpeaking(false);
  };

  useEffect(() => {
    // Clean up any existing Vapi instance
    cleanup();

    // Create a new Vapi instance for this session
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '');
    vapiRef.current = vapi;
    lastVapiInstance = vapi;

    // Start the conversation with the selected assistant
    vapi.start(character.assistantId);

    // Listen for speaking events
    vapi.on('speech-start', () => setIsSpeaking(true));
    vapi.on('speech-end', () => setIsSpeaking(false));

    // Expose cleanup function to parent via ref
    if (stopVoiceRef) {
      stopVoiceRef.current = cleanup;
    }

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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character.assistantId]);

  return (
    <div className="flex flex-col items-center justify-center h-[400px]">
      {/* Pulsing orb visual with character image */}
      <div
        className={`w-48 h-48 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 overflow-hidden
          ${isSpeaking ? 'bg-blue-400 animate-pulse-orb' : 'bg-blue-200'}`}
      >
        <Image
          src={character.imagePath}
          alt={character.name}
          width={192}
          height={192}
          className="object-cover w-full h-full rounded-full"
          priority
        />
      </div>
      <style jsx global>{`
        @keyframes pulse-orb {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.7); }
          50% { box-shadow: 0 0 40px 20px rgba(59,130,246,0.3); }
        }
        .animate-pulse-orb {
          animation: pulse-orb 1.2s infinite;
        }
      `}</style>
      <div className="mt-8 text-xl text-gray-700 font-semibold text-center">
        {isSpeaking ? `${character.name} is talking...` : `Say something to ${character.name}!`}
      </div>
    </div>
  );
} 