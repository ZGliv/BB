"use client";
/**
 * InfiniteCharacterCarousel.tsx
 * This component displays an infinite, swipe-only, 3D carousel of characters using Framer Motion for smooth, spring-based animation.
 * - Drag or swipe left/right to scroll through characters.
 * - Center character is large and forward; side characters are smaller and recede for a 3D effect.
 * - Infinite looping: you can swipe endlessly in either direction.
 * - Fully responsive and mobile-friendly.
 * - Includes arrow buttons for navigation on the edges of the carousel.
 *
 * Functions:
 * - InfiniteCharacterCarousel: Renders the carousel and handles drag/swipe navigation.
 * - handleArrowClick: Handles navigation when arrow buttons are clicked.
 */

import { Character } from '@/lib/types';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useAnimation } from 'framer-motion';

interface InfiniteCharacterCarouselProps {
  characters: Character[];
}

export default function InfiniteCharacterCarousel({ characters }: InfiniteCharacterCarouselProps) {
  // State for the center character index
  const [centerIdx, setCenterIdx] = useState(0);
  const total = characters.length;
  // Framer Motion value for x position
  const x = useMotionValue(0);
  // Animation controls
  const controls = useAnimation();
  // Ref to track drag direction
  const dragDirection = useRef<'left' | 'right' | null>(null);

  // Helper to get the correct index with wrap-around
  const getIdx = (offset: number) => (centerIdx + offset + total) % total;

  // Handle drag end: determine direction and update centerIdx
  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    const threshold = 50; // Reduced threshold for mobile
    if (info.offset.x < -threshold) {
      // Swiped left, go to next character
      dragDirection.current = 'right';
      setCenterIdx((prev) => (prev + 1) % total);
    } else if (info.offset.x > threshold) {
      // Swiped right, go to previous character
      dragDirection.current = 'left';
      setCenterIdx((prev) => (prev - 1 + total) % total);
    }
    // Animate back to center
    controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } });
  };

  // Handle arrow button clicks
  const handleArrowClick = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      dragDirection.current = 'left';
      setCenterIdx((prev) => (prev - 1 + total) % total);
    } else {
      dragDirection.current = 'right';
      setCenterIdx((prev) => (prev + 1) % total);
    }
    controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } });
  };

  // Animate carousel on index change for smooth 3D effect
  // (No need for useEffect here because Framer Motion handles the snap-back)

  // Render the three visible cards: left, center, right
  const leftIdx = getIdx(-1);
  const rightIdx = getIdx(1);

  return (
    // Carousel outer container
    <div
      className="w-full max-w-[95vw] flex flex-col items-center select-none min-h-0 h-auto overflow-x-hidden"
      style={{ minHeight: 220 }}
    >
      <div className="flex w-full items-center justify-between px-2 sm:px-4" style={{ minHeight: 180 }}>
        {/* Left arrow button - flex centered for mobile */}
        <button
          onClick={() => handleArrowClick('left')}
          className="z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110 flex items-center justify-center min-w-[40px] min-h-[40px]"
          aria-label="Previous character"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Carousel container with Framer Motion drag and spring animation */}
        <motion.div
          className="flex items-center justify-center w-full gap-1 sm:gap-2 md:gap-8 lg:gap-16 relative overflow-visible touch-pan-x"
          style={{ x, maxWidth: '100%' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={controls}
          whileTap={{ cursor: 'grabbing' }}
        >
          <div
            className="flex flex-col items-center flex-shrink-0 arc-left"
            style={{
              transform: 'scale(0.7) translateY(18px)',
              opacity: 0.5,
              filter: 'blur(1.2px) grayscale(80%)',
              zIndex: 1,
              minWidth: 60,
              maxWidth: 80,
            }}
          >
            <div className="relative flex items-center justify-center">
              {/* Radial shadow for context */}
              <div className="absolute w-[60px] h-[60px] sm:w-[90px] sm:h-[90px] md:w-[140px] md:h-[140px] rounded-full bg-gradient-to-br from-blue-200/30 via-white/0 to-purple-200/20 blur-2xl z-0" style={{ left: '-8px', top: '-8px' }} />
              <Image
                src={characters[leftIdx].imagePath}
                alt={characters[leftIdx].name}
                width={80}
                height={80}
                className="rounded-full object-cover border-2 border-gray-200 shadow-md transition-all duration-300 z-10 w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[120px] md:h-[120px]"
                style={{ zIndex: 1 }}
              />
            </div>
            <span className="mt-1 text-xs sm:text-sm md:text-lg font-semibold text-gray-400 drop-shadow text-center w-full truncate max-w-[60px]">{characters[leftIdx].name}</span>
          </div>
          <Link
            href={`/chat/${characters[centerIdx].id}`}
            className="relative flex flex-col items-center flex-shrink-0 arc-center group"
            style={{
              transform: 'scale(1) translateY(0px)',
              opacity: 1,
              zIndex: 2,
              minWidth: 100,
              maxWidth: 140,
            }}
          >
            <div className="relative flex items-center justify-center">
              {/* Radial shadow for context */}
              <div className="absolute w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[200px] md:h-[200px] rounded-full bg-gradient-to-br from-blue-300/40 via-white/0 to-purple-300/30 blur-2xl z-0" style={{ left: '-12px', top: '-12px' }} />
              <Image
                src={characters[centerIdx].imagePath}
                alt={characters[centerIdx].name}
                width={120}
                height={120}
                className="rounded-full object-cover border-4 border-blue-500 shadow-xl animate-glow animate-float group-hover:scale-105 transition-transform duration-300 z-10 w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[180px] md:h-[180px]"
                priority
                style={{ zIndex: 2 }}
              />
            </div>
            <span className="mt-2 text-sm sm:text-base md:text-2xl font-extrabold text-blue-700 drop-shadow-lg tracking-tight text-center w-full truncate max-w-[120px]" style={{ fontFamily: 'Inter, sans-serif' }}>{characters[centerIdx].name}</span>
          </Link>
          <div
            className="flex flex-col items-center flex-shrink-0 arc-right"
            style={{
              transform: 'scale(0.7) translateY(18px)',
              opacity: 0.5,
              filter: 'blur(1.2px) grayscale(80%)',
              zIndex: 1,
              minWidth: 60,
              maxWidth: 80,
            }}
          >
            <div className="relative flex items-center justify-center">
              {/* Radial shadow for context */}
              <div className="absolute w-[60px] h-[60px] sm:w-[90px] sm:h-[90px] md:w-[140px] md:h-[140px] rounded-full bg-gradient-to-bl from-purple-200/30 via-white/0 to-blue-200/20 blur-2xl z-0" style={{ left: '-8px', top: '-8px' }} />
              <Image
                src={characters[rightIdx].imagePath}
                alt={characters[rightIdx].name}
                width={80}
                height={80}
                className="rounded-full object-cover border-2 border-gray-200 shadow-md transition-all duration-300 z-10 w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[120px] md:h-[120px]"
                style={{ zIndex: 1 }}
              />
            </div>
            <span className="mt-1 text-xs sm:text-sm md:text-lg font-semibold text-gray-400 drop-shadow text-center w-full truncate max-w-[60px]">{characters[rightIdx].name}</span>
          </div>
        </motion.div>
        {/* Right arrow button - flex centered for mobile */}
        <button
          onClick={() => handleArrowClick('right')}
          className="z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110 flex items-center justify-center min-w-[40px] min-h-[40px]"
          aria-label="Next character"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Animation keyframes for premium arc transition, glow, and floating */}
      <style jsx global>{`
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