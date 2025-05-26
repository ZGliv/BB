/**
 * CharacterCard.tsx
 * This component renders a card for each character in the dashboard.
 * It displays the character's name and circular image, and handles navigation to the chat page.
 */

import { Character } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/chat/${character.id}`}>
      <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-200 cursor-pointer flex flex-col items-center min-w-[260px] max-w-[260px]">
        <div className="relative w-40 h-40 mb-6">
          <Image
            src={character.imagePath}
            alt={character.name}
            fill
            className="rounded-full object-cover border-4 border-gray-200 shadow-md"
            priority
          />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 text-center tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{character.name}</h2>
      </div>
    </Link>
  );
} 