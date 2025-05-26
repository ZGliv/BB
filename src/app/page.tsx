/**
 * page.tsx
 * This is the main dashboard page that displays all available characters.
 * It renders an infinite, center-focused carousel of character cards that users can click to start a chat.
 */

import { CHARACTERS } from '@/lib/constants';
import InfiniteCharacterCarousel from '@/components/InfiniteCharacterCarousel';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
          Choose Your Character
        </h1>
        <InfiniteCharacterCarousel characters={CHARACTERS} />
      </div>
    </main>
  );
}
