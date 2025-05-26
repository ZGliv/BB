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

## Implementation Roadmap

### Phase 1: Project Setup and Basic Structure
- [x] Initialize Next.js project with TypeScript and Tailwind CSS
- [x] Install required dependencies
- [ ] Set up project structure
- [ ] Configure environment variables
- [ ] Set up Firebase authentication

### Phase 2: Core Components Development
- [ ] Create AIConversation component
  - [ ] Implement Vapi SDK initialization
  - [ ] Add microphone controls
  - [ ] Set up event listeners
  - [ ] Implement error handling
- [ ] Create AudioVisualizer component
  - [ ] Implement audio visualization
  - [ ] Add speaking status indicators
- [ ] Create Transcript display
  - [ ] Implement message bubbles
  - [ ] Add auto-scrolling
  - [ ] Style user/AI messages

### Phase 3: Voice Integration
- [ ] Implement Vapi SDK integration
  - [ ] Handle multiple SDK format variations
  - [ ] Set up event listeners
  - [ ] Implement cleanup
- [ ] Add fallback simulation
  - [ ] Create warning system
  - [ ] Implement text-based simulation
  - [ ] Add sample responses

### Phase 4: Error Handling and Polish
- [ ] Implement comprehensive error handling
  - [ ] Handle microphone permissions
  - [ ] Handle SDK initialization
  - [ ] Add user-friendly error messages
- [ ] Add loading states
- [ ] Implement responsive design
- [ ] Add animations and transitions

## Project Structure
```
dayron-gpt/
├── src/
│   ├── app/
│   │   ├── (protected)/
│   │   │   └── chat/
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   │   └── ai-conversation.tsx
│   │   └── ui/
│   │       └── audio-visualizer.tsx
│   │
│   ├── lib/
│   │   ├── vapi/
│   │   │   └── vapi-config.ts
│   │   └── types.ts
│   │
│   └── styles/
│       └── globals.css
│
├── public/
├── .env.local
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## Environment Variables
```
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_public_key
VAPI_PRIVATE_KEY=your_private_key
```

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development server: `npm run dev`

## Dependencies
- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui
- @vapi-ai/web
- Firebase
- Various UI utilities (class-variance-authority, clsx, etc.) 