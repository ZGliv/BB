"use client";
/**
 * page.tsx
 * This is the chat page component that handles conversations with selected characters.
 * It displays the voice orb and manages the Vapi AI voice session.
 *
 * Functions:
 * - ChatPage: Renders the chat interface and handles navigation.
 * - handleBack: Stops the current conversation and navigates back to the dashboard.
 */

import { CHARACTERS } from '@/lib/constants';
import { notFound, useRouter } from 'next/navigation';
import VoiceOrb from '@/components/VoiceOrb';
import { useRef, useEffect } from 'react';
import Image from 'next/image';

interface ChatPageProps {
  params: {
    id: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  // Find the selected character
  const character = CHARACTERS.find((char) => char.id === params.id);
  const router = useRouter();
  // Ref to hold the stopVoice function
  const stopVoiceRef = useRef<() => void>(() => {});

  // If character not found, show 404 page
  if (!character) {
    notFound();
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopVoiceRef.current();
    };
  }, []);

  // Handler for back button
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    stopVoiceRef.current();
    // Wait a short moment to allow cleanup, then force a full reload
    setTimeout(() => {
      window.location.href = '/'; // This will fully reload the dashboard and kill all lingering resources
    }, 100);
  };

  return (
    <main className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Image
          src={character.backgroundImage}
          alt={`${character.name}'s background`}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay to ensure content is readable */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Back arrow */}
        <div className="mb-8">
          <button 
            onClick={handleBack} 
            className="inline-flex items-center text-white hover:text-blue-200 font-semibold text-lg transition-colors duration-200"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-7 h-7 mr-2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to Characters
          </button>
        </div>

        {/* Character Name */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-8 text-center tracking-tight drop-shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
          Chat with {character.name}
        </h1>

        {/* Voice Orb Container */}
        <div className="mt-12">
          <VoiceOrb character={character} stopVoiceRef={stopVoiceRef} />
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto">
            Click the microphone to start speaking. {character.name} will respond to your voice in real-time.
          </p>
        </div>
      </div>
    </main>
  );
} 