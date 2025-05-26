/**
 * page.tsx
 * This is the main dashboard page that displays all available characters.
 * It renders an infinite, center-focused carousel of character cards that users can click to start a chat.
 * The page now features a subtitle, a visually engaging title, a glassmorphism card effect, and a footer hint for user guidance.
 */

import { CHARACTERS } from '@/lib/constants';
import InfiniteCharacterCarousel from '@/components/InfiniteCharacterCarousel';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      {/* Centered content container with glassmorphism effect */}
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center justify-center flex-1">
        {/* Main title */}
        <h1 className="text-6xl font-extrabold text-blue-900 mb-4 text-center tracking-tight drop-shadow-lg" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em' }}>
          Bigot Bot
        </h1>
        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-10 text-center max-w-2xl mx-auto font-medium">
          Pick a character to start a voice-enabled AI chat adventure. Each character has a unique personality!
        </p>
        {/* Glassmorphism card effect for carousel */}
        <div className="w-full rounded-3xl bg-white/60 backdrop-blur-lg shadow-2xl p-8 md:p-12 mb-8 border border-white/40">
          <InfiniteCharacterCarousel characters={CHARACTERS} />
        </div>
      </div>
      {/* Footer hint for user guidance */}
      <footer className="w-full text-center text-gray-400 text-sm mt-8 mb-2 select-none">
        <span>Tip: Use the arrows or swipe to browse characters. Click the center character to chat!</span>
      </footer>
    </main>
  );
}
