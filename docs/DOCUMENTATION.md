# BigotBot - Voice-Enabled AI Chat Application

## Project Overview
BigotBot is a Next.js application that integrates with Vapi.ai to provide real-time voice conversations with AI. The application features a modern, responsive interface with real-time audio visualization, transcript display, and robust error handling.

### Key Features
- Real-time voice conversations with AI using Vapi.ai
- Audio visualization for speaking status
- Microphone controls with mute/unmute functionality
- Real-time transcript updates
- Fallback to simulated conversations when API keys aren't configured
- Firebase authentication
- Modern UI with Tailwind CSS and shadcn/ui components


## File Structure

```
bigot-bot/
├── src/
│   ├── app/
│   │   ├── (protected)/
│   │   │   └── chat/
│   │   │       └── [id]/
│   │   │           └── page.tsx                # Chat page for a specific conversation
│   │   ├── account/
│   │   │   └── page.tsx                        # Account management page
│   │   ├── billing/
│   │   │   └── page.tsx                        # Billing information page
│   │   ├── pricing/
│   │   │   └── page.tsx                        # Pricing information page
│   │   ├── sign-in/
│   │   │   └── [[...rest]]/
│   │   │       └── page.tsx                    # Sign-in page (catch-all route)
│   │   ├── sign-up/
│   │   │   └── [[...rest]]/
│   │   │       └── page.tsx                    # Sign-up page (catch-all route)
│   │   ├── favicon.ico                         # Favicon for the app
│   │   ├── globals.css                         # Global styles
│   │   ├── layout.tsx                          # Root layout component
│   │   └── page.tsx                            # Main landing page
│   │
│   ├── components/
│   │   ├── dashboard/                          # Dashboard-specific components
│   │   ├── ui/                                 # Reusable UI components
│   │   ├── CharacterCard.tsx                   # Character card component
│   │   ├── ChatInterface.tsx                   # Chat interface component
│   │   ├── Header.tsx                          # Header/navigation bar component
│   │   ├── InfiniteCharacterCarousel.tsx       # Character carousel component
│   │   └── VoiceOrb.tsx                        # Voice visualization component
│   │
│   └── lib/
│       ├── vapi/
│       │   └── vapi-config.ts                  # Voice API configuration
│       ├── constants.ts                        # Application constants
│       ├── firebase.ts                         # Firebase configuration
│       ├── types.ts                            # TypeScript type definitions
│       └── vapiSingleton.ts                    # Voice API singleton instance
│
├── public/                                     # Static assets
├── docs/                                       # Documentation files
├── .next/                                      # Next.js build output
├── node_modules/                               # Dependencies
├── .clerk/                                     # Clerk authentication configuration
├── middleware.ts                               # Next.js middleware for route protection
├── .env.local                                  # Environment variables and secrets
├── .gitignore                                  # Git ignore rules
├── package.json                                # Project configuration and dependencies
├── package-lock.json                           # Dependency lock file
├── next.config.js                              # Next.js configuration
├── next-env.d.ts                               # Next.js TypeScript declarations
├── tsconfig.json                               # TypeScript configuration
├── tailwind.config.js                          # Tailwind CSS configuration
├── postcss.config.mjs                          # PostCSS configuration
└── eslint.config.mjs                           # ESLint configuration
```