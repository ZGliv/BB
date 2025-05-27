/*
page.tsx
This page renders the Clerk SignIn component for user authentication. This is a catch-all route as required by Clerk for proper routing with middleware.

Functions:
- SignInPage: Renders the Clerk SignIn UI for users to log in.
*/

import { SignIn } from '@clerk/nextjs';

// SignInPage renders only the Clerk SignIn component using hash routing for consistent Clerk UI, centered on the page
export default function SignInPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <SignIn routing="hash" />
    </div>
  );
} 