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
├── src/                                    # Source code directory
│   ├── app/                                  # Next.js app directory
│   │   ├── (protected)/                        # Protected routes
│   │   ├── page.tsx                            # Main landing page
│   │   ├── layout.tsx                          # Root layout component
│   │   └── globals.css                         # Global styles
│   ├── components/                           # React components
│   │   ├── VoiceOrb.tsx                        # Voice visualization component
│   │   ├── InfiniteCharacterCarousel.tsx       # Character carousel component
│   │   ├── ChatInterface.tsx                   # Chat interface component
│   │   ├── CharacterCard.tsx                   # Character card component
│   │   ├── dashboard/                          # Dashboard-specific components
│   │   └── ui/                                 # Reusable UI components
│   └── lib/                                  # Utility functions and configurations
│       ├── vapi/                               # Voice API related utilities
│       ├── vapiSingleton.ts                    # Voice API singleton instance
│       ├── constants.ts                        # Application constants
│       ├── types.ts                            # TypeScript type definitions
│       └── firebase.ts                         # Firebase configuration
│
├── public/                                 # Static assets
├── docs/                                   # Documentation files
├── .next/                                  # Next.js build output
├── node_modules/                           # Dependencies
│
├── .env.local                              # Environment variables and secrets
├──.gitignore                              # Git ignore rules
├── package.json                            # Project configuration and dependencies
├── package-lock.json                       # Dependency lock file
├── tsconfig.json                           # TypeScript configuration
├── next.config.js                          # Next.js configuration
├── tailwind.config.js                      # Tailwind CSS configuration
├── postcss.config.mjs                      # PostCSS configuration
└── eslint.config.mjs                       # ESLint configuration
```