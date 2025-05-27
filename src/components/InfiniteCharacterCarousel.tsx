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
    const threshold = 80; // Minimum px to trigger a change
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
      className="relative w-full flex flex-col items-center select-none"
      style={{ minHeight: 340 }}
    >
      {/* Left arrow button - positioned exactly on the left edge */}
      <button
        onClick={() => handleArrowClick('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 hover:scale-110"
        style={{ transform: 'translate(-50%, -50%)' }}
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
        className="flex items-center justify-center w-full gap-2 md:gap-8 lg:gap-16 relative overflow-visible touch-pan-x"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileTap={{ cursor: 'grabbing' }}
      >
        {/* Left (blurred, faded, large, floating circle, with context shadow, 3D effect) */}
        <div
          className="flex flex-col items-center flex-shrink-0 arc-left"
          style={{
            transform: 'scale(0.8) translateY(30px)',
            opacity: 0.5,
            filter: 'blur(1.5px) grayscale(80%)',
            zIndex: 1,
          }}
        >
          <div className="relative flex items-center justify-center">
            {/* Radial shadow for context */}
            <div className="absolute w-[120px] h-[120px] md:w-[200px] md:h-[200px] rounded-full bg-gradient-to-br from-blue-200/30 via-white/0 to-purple-200/20 blur-2xl z-0" style={{ left: '-10px', top: '-10px' }} />
            <Image
              src={characters[leftIdx].imagePath}
              alt={characters[leftIdx].name}
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-gray-200 shadow-md transition-all duration-300 z-10 w-[100px] h-[100px] md:w-[180px] md:h-[180px]"
              style={{ zIndex: 1 }}
            />
          </div>
          <span className="mt-1 text-sm md:text-lg font-semibold text-gray-400 drop-shadow text-center w-full">{characters[leftIdx].name}</span>
        </div>
        {/* Center (focused, largest, glowing, floating circle, with context shadow, 3D effect) */}
        <Link
          href={`/chat/${characters[centerIdx].id}`}
          className="relative flex flex-col items-center flex-shrink-0 arc-center group"
          style={{
            transform: 'scale(1.1) translateY(0px)',
            opacity: 1,
            zIndex: 2,
          }}
        >
          <div className="relative flex items-center justify-center">
            {/* Radial shadow for context */}
            <div className="absolute w-[200px] h-[200px] md:w-[320px] md:h-[320px] rounded-full bg-gradient-to-br from-blue-300/40 via-white/0 to-purple-300/30 blur-2xl z-0" style={{ left: '-20px', top: '-20px' }} />
            <Image
              src={characters[centerIdx].imagePath}
              alt={characters[centerIdx].name}
              width={180}
              height={180}
              className="rounded-full object-cover border-8 border-blue-500 shadow-xl animate-glow animate-float group-hover:scale-110 transition-transform duration-300 z-10 w-[150px] h-[150px] md:w-[260px] md:h-[260px]"
              priority
              style={{ zIndex: 2 }}
            />
          </div>
          <span className="mt-2 text-lg md:text-3xl font-extrabold text-blue-700 drop-shadow-lg tracking-tight text-center w-full" style={{ fontFamily: 'Inter, sans-serif' }}>{characters[centerIdx].name}</span>
        </Link>
        {/* Right (blurred, faded, large, floating circle, with context shadow, 3D effect) */}
        <div
          className="flex flex-col items-center flex-shrink-0 arc-right"
          style={{
            transform: 'scale(0.8) translateY(30px)',
            opacity: 0.5,
            filter: 'blur(1.5px) grayscale(80%)',
            zIndex: 1,
          }}
        >
          <div className="relative flex items-center justify-center">
            {/* Radial shadow for context */}
            <div className="absolute w-[120px] h-[120px] md:w-[200px] md:h-[200px] rounded-full bg-gradient-to-bl from-purple-200/30 via-white/0 to-blue-200/20 blur-2xl z-0" style={{ left: '-10px', top: '-10px' }} />
            <Image
              src={characters[rightIdx].imagePath}
              alt={characters[rightIdx].name}
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-gray-200 shadow-md transition-all duration-300 z-10 w-[100px] h-[100px] md:w-[180px] md:h-[180px]"
              style={{ zIndex: 1 }}
            />
          </div>
          <span className="mt-1 text-sm md:text-lg font-semibold text-gray-400 drop-shadow text-center w-full">{characters[rightIdx].name}</span>
        </div>
      </motion.div>

      {/* Right arrow button - positioned exactly on the right edge */}
      <button
        onClick={() => handleArrowClick('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 hover:scale-110"
        style={{ transform: 'translate(50%, -50%)' }}
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