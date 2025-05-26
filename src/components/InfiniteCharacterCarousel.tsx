"use client";
/**
 * InfiniteCharacterCarousel.tsx
 * This component displays an infinite, center-focused carousel of characters as floating circles with a premium, arc-based transition animation.
 * The center character scales down and fades as it moves to the side, while the new center scales up and comes forward.
 * Characters move in a smooth arc with a slight bounce at the end for a delightful, tactile feel.
 * Each character has a soft, blurred radial shadow for context and depth.
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

  // Animation classes for premium arc-based transition
  const transitionClass =
    direction === 'left'
      ? 'animate-arc-left'
      : direction === 'right'
      ? 'animate-arc-right'
      : '';

  return (
    // Carousel outer container with glassmorphism and padding
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Fixed-position left arrow with enhanced style */}
      <button
        aria-label="Scroll left"
        onClick={moveLeft}
        className="z-30 bg-white/80 shadow-2xl border border-blue-200 rounded-full p-4 m-2 hover:bg-blue-100 hover:scale-110 active:scale-95 transition-all duration-200 fixed left-1/2 -translate-x-[420px] top-1/2 -translate-y-1/2 backdrop-blur-lg"
        style={{ pointerEvents: 'auto' }}
      >
        <span className="text-4xl font-bold text-blue-700 drop-shadow">&#8592;</span>
      </button>

      {/* Fixed-position right arrow with enhanced style */}
      <button
        aria-label="Scroll right"
        onClick={moveRight}
        className="z-30 bg-white/80 shadow-2xl border border-blue-200 rounded-full p-4 m-2 hover:bg-blue-100 hover:scale-110 active:scale-95 transition-all duration-200 fixed right-1/2 translate-x-[420px] top-1/2 -translate-y-1/2 backdrop-blur-lg"
        style={{ pointerEvents: 'auto' }}
      >
        <span className="text-4xl font-bold text-blue-700 drop-shadow">&#8594;</span>
      </button>

      {/* Carousel container with premium arc animation and spacing */}
      <div
        className={`flex items-center justify-center w-full gap-0 md:gap-8 lg:gap-16 relative overflow-visible ${transitionClass}`}
        style={{ minHeight: 340, perspective: 1200, transition: 'none' }}
      >
        {/* Left (blurred, faded, small, floating circle, with context shadow) */}
        <div className="hidden md:flex flex-col items-center flex-shrink-0 arc-left">
          <div className="relative flex items-center justify-center">
            {/* Radial shadow for context */}
            <div className="absolute w-[160px] h-[160px] rounded-full bg-gradient-to-br from-blue-200/30 via-white/0 to-purple-200/20 blur-2xl z-0" style={{ left: '-10px', top: '-10px' }} />
            <Image
              src={characters[leftIdx].imagePath}
              alt={characters[leftIdx].name}
              width={140}
              height={140}
              className="rounded-full object-cover border-4 border-gray-200 shadow-md opacity-60 blur-md grayscale transition-all duration-300 z-10"
              style={{ zIndex: 1 }}
            />
          </div>
          <span className="mt-2 text-lg font-semibold text-gray-400 drop-shadow text-center w-full">{characters[leftIdx].name}</span>
        </div>

        {/* Center (focused, large, glowing, floating circle, with context shadow) */}
        <Link href={`/chat/${characters[centerIdx].id}`} className="relative flex flex-col items-center flex-shrink-0 arc-center group">
          <div className="relative flex items-center justify-center">
            {/* Radial shadow for context */}
            <div className="absolute w-[260px] h-[260px] rounded-full bg-gradient-to-br from-blue-300/40 via-white/0 to-purple-300/30 blur-2xl z-0" style={{ left: '-20px', top: '-20px' }} />
            <Image
              src={characters[centerIdx].imagePath}
              alt={characters[centerIdx].name}
              width={220}
              height={220}
              className="rounded-full object-cover border-8 border-blue-500 shadow-xl animate-glow animate-float group-hover:scale-110 transition-transform duration-300 z-10"
              priority
              style={{ zIndex: 2 }}
            />
          </div>
          <span className="mt-4 text-3xl font-extrabold text-blue-700 drop-shadow-lg tracking-tight text-center w-full" style={{ fontFamily: 'Inter, sans-serif' }}>{characters[centerIdx].name}</span>
        </Link>

        {/* Right (blurred, faded, small, floating circle, with context shadow) */}
        <div className="hidden md:flex flex-col items-center flex-shrink-0 arc-right">
          <div className="relative flex items-center justify-center">
            {/* Radial shadow for context */}
            <div className="absolute w-[160px] h-[160px] rounded-full bg-gradient-to-bl from-purple-200/30 via-white/0 to-blue-200/20 blur-2xl z-0" style={{ left: '-10px', top: '-10px' }} />
            <Image
              src={characters[rightIdx].imagePath}
              alt={characters[rightIdx].name}
              width={140}
              height={140}
              className="rounded-full object-cover border-4 border-gray-200 shadow-md opacity-60 blur-md grayscale transition-all duration-300 z-10"
              style={{ zIndex: 1 }}
            />
          </div>
          <span className="mt-2 text-lg font-semibold text-gray-400 drop-shadow text-center w-full">{characters[rightIdx].name}</span>
        </div>
      </div>
      {/* Animation keyframes for premium arc transition, glow, and floating */}
      <style jsx global>{`
        @keyframes arc-left {
          0% { transform: scale(0.9) translateX(-40px) translateY(0) opacity(0.6); }
          40% { transform: scale(0.8) translateX(-120px) translateY(-30px) opacity(0.3); }
          70% { transform: scale(1.05) translateX(0px) translateY(-10px) opacity(1); }
          90% { transform: scale(1.1) translateX(0px) translateY(0px) opacity(1); }
          100% { transform: scale(1.1) translateX(0px) translateY(0px) opacity(1); }
        }
        @keyframes arc-center {
          0% { transform: scale(1.1) translateX(0px) translateY(0px) opacity(1); }
          40% { transform: scale(1.05) translateX(0px) translateY(-10px) opacity(1); }
          70% { transform: scale(0.8) translateX(120px) translateY(-30px) opacity(0.3); }
          100% { transform: scale(0.9) translateX(40px) translateY(0) opacity(0.6); }
        }
        @keyframes arc-right {
          0% { transform: scale(0.9) translateX(40px) translateY(0) opacity(0.6); }
          40% { transform: scale(0.8) translateX(120px) translateY(-30px) opacity(0.3); }
          70% { transform: scale(1.05) translateX(0px) translateY(-10px) opacity(1); }
          90% { transform: scale(1.1) translateX(0px) translateY(0px) opacity(1); }
          100% { transform: scale(1.1) translateX(0px) translateY(0px) opacity(1); }
        }
        .animate-arc-left .arc-left {
          animation: arc-left 1.1s cubic-bezier(0.77,0,0.175,1) both;
        }
        .animate-arc-left .arc-center {
          animation: arc-center 1.1s cubic-bezier(0.77,0,0.175,1) both;
        }
        .animate-arc-left .arc-right {
          animation: arc-right 1.1s cubic-bezier(0.77,0,0.175,1) both;
        }
        .animate-arc-right .arc-right {
          animation: arc-left 1.1s cubic-bezier(0.77,0,0.175,1) both reverse;
        }
        .animate-arc-right .arc-center {
          animation: arc-center 1.1s cubic-bezier(0.77,0,0.175,1) both reverse;
        }
        .animate-arc-right .arc-left {
          animation: arc-right 1.1s cubic-bezier(0.77,0,0.175,1) both reverse;
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 32px 8px rgba(59,130,246,0.25), 0 0 0 0 rgba(59,130,246,0.10); }
          50% { box-shadow: 0 0 64px 24px rgba(59,130,246,0.40), 0 0 0 0 rgba(59,130,246,0.10); }
        }
        .animate-glow {
          animation: glow 2s infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
} 