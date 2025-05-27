/**
 * page.tsx
 * This is the main dashboard page that displays all available characters.
 * It renders an infinite, center-focused carousel of character cards that users can click to start a chat.
 * The page features a subtitle, a visually engaging title, a glassmorphism card effect, and a footer hint for user guidance.
 */

import { CHARACTERS } from '@/lib/constants';
import InfiniteCharacterCarousel from '@/components/InfiniteCharacterCarousel';
import Image from 'next/image';

export default function Dashboard() {
  return (
    <main className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Image
          src="/images/backgrounds/background.png"
          alt="Main background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay to ensure content is readable */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
        {/* Centered content container with glassmorphism effect */}
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center justify-center flex-1">
          {/* Main title */}
          <h1 className="text-6xl font-extrabold text-white mb-4 text-center tracking-tight drop-shadow-lg" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em' }}>
            Bigot Bot
          </h1>
          {/* Subtitle */}
          <p className="text-xl text-white/90 mb-10 text-center max-w-2xl mx-auto font-medium">
            Pick a character to start a voice-enabled AI chat adventure. Each character has a unique personality!
          </p>
          {/* Glassmorphism card effect for carousel */}
          <div className="w-full rounded-3xl bg-white/60 backdrop-blur-lg shadow-2xl p-8 md:p-12 mb-8 border border-white/40">
            <InfiniteCharacterCarousel characters={CHARACTERS} />
          </div>
        </div>
        {/* Footer hint for user guidance */}
        <footer className="w-full text-center text-white/80 text-sm mt-8 mb-2 select-none">
          <span>Tip: Use the arrows or swipe to browse characters. Click the center character to chat!</span>
        </footer>
      </div>
    </main>
  );
}
