"use client";
/**
 * CharacterCarousel.tsx
 * This component displays the characters in a horizontally scrollable carousel with navigation arrows.
 * It features modern font styling, larger images, and click-to-select functionality.
 *
 * Functions:
 * - CharacterCarousel: Renders the carousel and handles scrolling left/right.
 */

import { Character } from '@/lib/types';
import CharacterCard from './CharacterCard';
import { useRef } from 'react';

interface CharacterCarouselProps {
  characters: Character[];
}

export default function CharacterCarousel({ characters }: CharacterCarouselProps) {
  // Ref for the scrollable container
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll left by a fixed amount
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  // Scroll right by a fixed amount
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full flex items-center">
      {/* Left arrow */}
      <button
        aria-label="Scroll left"
        onClick={scrollLeft}
        className="absolute left-0 z-10 bg-white shadow-lg rounded-full p-2 m-2 hover:bg-gray-200 transition disabled:opacity-30"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        <span className="text-3xl font-bold">&#8592;</span>
      </button>

      {/* Scrollable character cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 py-8 px-16 w-full scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {characters.map((character) => (
          <div key={character.id} style={{ scrollSnapAlign: 'center' }}>
            <CharacterCard character={character} />
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        aria-label="Scroll right"
        onClick={scrollRight}
        className="absolute right-0 z-10 bg-white shadow-lg rounded-full p-2 m-2 hover:bg-gray-200 transition disabled:opacity-30"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        <span className="text-3xl font-bold">&#8594;</span>
      </button>
    </div>
  );
} 