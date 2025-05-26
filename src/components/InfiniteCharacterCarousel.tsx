"use client";
/**
 * InfiniteCharacterCarousel.tsx
 * This component displays an infinite, center-focused carousel of characters.
 * The center character is large and in focus, while the side characters are smaller and blurred.
 * Navigation is smooth and seamless, with infinite looping.
 *
 * Functions:
 * - InfiniteCharacterCarousel: Renders the infinite carousel and handles navigation.
 */

import { Character } from '@/lib/types';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface InfiniteCharacterCarouselProps {
  characters: Character[];
}

export default function InfiniteCharacterCarousel({ characters }: InfiniteCharacterCarouselProps) {
  // State for the center character index
  const [centerIdx, setCenterIdx] = useState(0);
  const total = characters.length;
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  // Helper to get the correct index with wrap-around
  const getIdx = (offset: number) => (centerIdx + offset + total) % total;

  // Move carousel left (previous character becomes center)
  const moveLeft = () => {
    setDirection('left');
    setTimeout(() => {
      setCenterIdx((prev) => (prev - 1 + total) % total);
      setDirection(null);
    }, 300);
  };
  // Move carousel right (next character becomes center)
  const moveRight = () => {
    setDirection('right');
    setTimeout(() => {
      setCenterIdx((prev) => (prev + 1) % total);
      setDirection(null);
    }, 300);
  };

  // Render the three visible cards: left, center, right
  const leftIdx = getIdx(-1);
  const rightIdx = getIdx(1);

  // Animation classes
  const transitionClass =
    direction === 'left'
      ? 'animate-slide-left'
      : direction === 'right'
      ? 'animate-slide-right'
      : '';

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Carousel container */}
      <div
        className={`flex items-center justify-center w-full gap-0 md:gap-8 lg:gap-16 relative overflow-visible ${transitionClass}`}
        style={{ minHeight: 340, transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)' }}
      >
        {/* Left arrow */}
        <button
          aria-label="Scroll left"
          onClick={moveLeft}
          className="z-10 bg-white shadow-lg rounded-full p-3 m-2 hover:bg-gray-200 transition absolute left-0 top-1/2 -translate-y-1/2"
        >
          <span className="text-4xl font-bold">&#8592;</span>
        </button>

        {/* Left (blurred, small) */}
        <div className="hidden md:block relative flex-shrink-0" style={{ width: 160, height: 160 }}>
          <div className="relative w-full h-full opacity-60 blur-sm scale-90 transition-all duration-300">
            <Image
              src={characters[leftIdx].imagePath}
              alt={characters[leftIdx].name}
              fill
              sizes="160px"
              className="rounded-full object-cover border-4 border-gray-200 shadow-md"
              style={{ zIndex: 1 }}
            />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center">
            <span className="text-lg font-semibold text-gray-400 drop-shadow">{characters[leftIdx].name}</span>
          </div>
        </div>

        {/* Center (focused, large) */}
        <Link href={`/chat/${characters[centerIdx].id}`} className="relative flex-shrink-0 group" style={{ width: 240, height: 240 }}>
          <div className="relative w-full h-full scale-110 shadow-2xl transition-all duration-300 group-hover:scale-125">
            <Image
              src={characters[centerIdx].imagePath}
              alt={characters[centerIdx].name}
              fill
              sizes="240px"
              className="rounded-full object-cover border-8 border-blue-500 shadow-xl"
              priority
              style={{ zIndex: 2 }}
            />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center">
            <span className="text-3xl font-extrabold text-blue-700 drop-shadow-lg tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{characters[centerIdx].name}</span>
          </div>
        </Link>

        {/* Right (blurred, small) */}
        <div className="hidden md:block relative flex-shrink-0" style={{ width: 160, height: 160 }}>
          <div className="relative w-full h-full opacity-60 blur-sm scale-90 transition-all duration-300">
            <Image
              src={characters[rightIdx].imagePath}
              alt={characters[rightIdx].name}
              fill
              sizes="160px"
              className="rounded-full object-cover border-4 border-gray-200 shadow-md"
              style={{ zIndex: 1 }}
            />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center">
            <span className="text-lg font-semibold text-gray-400 drop-shadow">{characters[rightIdx].name}</span>
          </div>
        </div>

        {/* Right arrow */}
        <button
          aria-label="Scroll right"
          onClick={moveRight}
          className="z-10 bg-white shadow-lg rounded-full p-3 m-2 hover:bg-gray-200 transition absolute right-0 top-1/2 -translate-y-1/2"
        >
          <span className="text-4xl font-bold">&#8594;</span>
        </button>
      </div>
      {/* Animation keyframes for sliding */}
      <style jsx global>{`
        @keyframes slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(33%); }
        }
        @keyframes slide-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33%); }
        }
        .animate-slide-left {
          animation: slide-left 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .animate-slide-right {
          animation: slide-right 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
} 