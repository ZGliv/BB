# Bigot Bot - Voice-Enabled AI Chat Application

A Next.js application that integrates with Vapi.ai for real-time voice conversations with AI.

## Features

- Real-time voice conversations with AI using Vapi.ai
- Audio visualization for speaking status
- Microphone controls with mute/unmute functionality
- Real-time transcript updates
- Fallback to simulated conversations when API keys aren't configured
- Modern UI with Tailwind CSS and shadcn/ui components

## Prerequisites

- Node.js 18+ and npm
- Vapi.ai account and API keys

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bigot-bot.git
cd bigot-bot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_public_key_here
VAPI_PRIVATE_KEY=your_private_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
bigot-bot/
├── src/
│   ├── app/
│   │   ├── (protected)/
│   │   │   └── chat/
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── dashboard/
│   │   │   └── ai-conversation.tsx
│   │   └── ui/
│   │       └── audio-visualizer.tsx
│   ├── lib/
│   │   ├── vapi/
│   │   │   └── vapi-config.ts
│   │   └── types.ts
│   └── styles/
│       └── globals.css
├── public/
├── .env.local
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## Environment Variables

- `NEXT_PUBLIC_VAPI_PUBLIC_KEY`: Your Vapi.ai public API key
- `VAPI_PRIVATE_KEY`: Your Vapi.ai private API key

## Development

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
