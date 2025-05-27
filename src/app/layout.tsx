/**
 * layout.tsx
 * This is the root layout component that sets up the basic app structure and wraps the app content with ClerkProvider for authentication.
 *
 * Functions:
 * - RootLayout: The main layout component that applies global styles, metadata, and provides Clerk authentication context to all pages.
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/Header';
import './globals.css';

// Initialize the Inter font
const inter = Inter({ subsets: ['latin'] });

// Metadata for the application
export const metadata: Metadata = {
  title: 'Dayron GPT - Voice-Enabled AI Chat',
  description: 'Real-time voice conversations with AI using Vapi.ai',
};

// Root layout component for the app
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        {/* ClerkProvider wraps only the app content, not <html> */}
        <ClerkProvider>
          <Header />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
