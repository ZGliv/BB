/*
page.tsx
This page renders the Clerk SignUp component for new user registration. This is a catch-all route as required by Clerk for proper routing with middleware.

Functions:
- SignUpPage: Renders the Clerk SignUp UI for users to create an account.
*/

import { SignUp } from '@clerk/nextjs';

// SignUpPage renders only the Clerk SignUp component using hash routing for consistent Clerk UI
export default function SignUpPage() {
  return <SignUp routing="hash" />;
} 