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
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Back arrow */}
        <div className="mb-4">
          <button onClick={handleBack} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Chat with {character.name}
        </h1>
        <VoiceOrb character={character} stopVoiceRef={stopVoiceRef} />
      </div>
    </main>
  );
} 