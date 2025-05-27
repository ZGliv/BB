/*
page.tsx
This is a protected chat page that only authenticated users can access. It uses Clerk's SignedIn, SignedOut, and RedirectToSignIn components to enforce authentication.

Functions:
- ChatPage: Renders chat content for signed-in users, redirects others to sign-in.
*/

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
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import VoiceOrb from '@/components/VoiceOrb';
import { useRef, useEffect } from 'react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

interface ChatPageProps {
  params: {
    id: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  // Find the selected character
  const character = CHARACTERS.find((c) => c.id === params.id);
  const router = useRouter();
  const stopVoiceRef = useRef<() => void>(() => {});

  // Ensure cleanup runs on unmount or when character changes
  useEffect(() => {
    return () => {
      if (stopVoiceRef.current) {
        stopVoiceRef.current();
      }
    };
  }, [params.id]);

  // Handle back button click
  const handleBack = () => {
    // Call the cleanup function to stop the voice session
    if (stopVoiceRef.current) {
      stopVoiceRef.current();
    }
    router.push('/');
  };

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <>
      <SignedIn>
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
          <div className="relative z-10 max-w-6xl mx-auto py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
            {/* Back arrow */}
            <div className="mb-4 sm:mb-8">
              <button 
                onClick={handleBack} 
                className="inline-flex items-center text-white hover:text-blue-200 font-semibold text-base sm:text-lg transition-colors duration-200"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2.5} 
                  stroke="currentColor" 
                  className="w-6 h-6 sm:w-7 sm:h-7 mr-2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Back to Characters
              </button>
            </div>

            {/* Character Name */}
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 sm:mb-8 text-center tracking-tight drop-shadow-lg" 
              style={{ 
                fontFamily: 'Inter, sans-serif',
                textShadow: `
                  -1px -1px 0 #3b82f6,
                  1px -1px 0 #3b82f6,
                  -1px 1px 0 #3b82f6,
                  1px 1px 0 #3b82f6,
                  0 0 8px rgba(59, 130, 246, 0.5)
                `
              }}
            >
              Chat with {character.name}
            </h1>

            {/* Voice Orb Container */}
            <div className="mt-8 sm:mt-12">
              <VoiceOrb character={character} stopVoiceRef={stopVoiceRef} />
            </div>
          </div>
        </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
} 