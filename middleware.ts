/*
middleware.ts
This middleware uses Clerk to protect all routes under /app/(protected) and redirects unauthenticated users to /sign-in.

Functions:
- clerkMiddleware: Enforces authentication for protected routes.
*/

import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect all routes under /app/(protected)
    '/(protected)/(.*)',
  ],
}; 