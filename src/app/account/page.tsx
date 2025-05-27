/*
page.tsx
This page renders the Clerk UserProfile component for users to manage their account and profile settings.

Functions:
- AccountPage: Renders the Clerk UserProfile UI for account management.
*/

import { UserProfile } from '@clerk/nextjs';

// AccountPage renders the Clerk UserProfile component
export default function AccountPage() {
  return <UserProfile />; // Renders the Clerk UserProfile UI
} 