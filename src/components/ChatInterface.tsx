/**
 * ChatInterface.tsx
 * This component handles the chat interface and conversation with the selected character.
 * It manages the chat state, message input, and communication with the VAPI AI assistant.
 */

import { useState, useEffect } from 'react';
import { Character, ChatMessage } from '@/lib/types';

interface ChatInterfaceProps {
  character: Character;
}

export default function ChatInterface({ character }: ChatInterfaceProps) {
  // State for managing chat messages and loading state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Helper to call VAPI AI chat endpoint
  const callVapiAI = async (message: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.vapi.ai/v1/assistants/${character.assistantId}/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || process.env.VAPI_PRIVATE_KEY}`,
          },
          body: JSON.stringify({ message }),
        }
      );
      if (!res.ok) throw new Error('Failed to fetch from VAPI AI');
      const data = await res.json();
      // Assume response is in data.response
      return data.response || data.message || 'No response from assistant.';
    } catch (error) {
      console.error('VAPI AI error:', error);
      return 'Sorry, there was an error talking to the assistant.';
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-trigger assistant's first message on mount
  useEffect(() => {
    if (messages.length === 0) {
      (async () => {
        const greeting = await callVapiAI('');
        setMessages([
          {
            role: 'assistant',
            content: greeting,
            timestamp: new Date(),
          },
        ]);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character.assistantId]);

  // Function to handle sending messages
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Call VAPI AI for assistant response
    const assistantResponse = await callVapiAI(userMessage.content);
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date(),
      },
    ]);
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Chat messages */}
      <div className="h-[500px] overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 rounded-lg p-3">
              {character.name} is typing...
            </div>
          </div>
        )}
      </div>

      {/* Message input form */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Type a message to ${character.name}...`}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
} 