/**
 * layout.tsx
 * This is the root layout component that sets up the basic app structure.
 * It includes metadata, global styles, and the basic HTML structure.
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Initialize the Inter font
const inter = Inter({ subsets: ['latin'] });

// Metadata for the application
export const metadata: Metadata = {
  title: 'Dayron GPT - Voice-Enabled AI Chat',
  description: 'Real-time voice conversations with AI using Vapi.ai',
};

// Root layout component that wraps all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
