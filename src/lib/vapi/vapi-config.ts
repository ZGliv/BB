/**
 * vapi-config.ts
 * This file handles the configuration and initialization of the Vapi SDK.
 * It provides functions for initializing the SDK and handling different SDK format variations.
 */

import { VapiConfig } from '../types';

// Initialize the Vapi SDK with the provided configuration
export const initializeVapi = async (config: VapiConfig) => {
  try {
    // Check if the public key is configured
    if (!config.publicKey) {
      throw new Error('Vapi public key is not configured');
    }

    // Initialize the SDK with the public key
    const vapi = new (await import('@vapi-ai/web')).default(config.publicKey);

    return vapi;
  } catch (error) {
    console.error('Failed to initialize Vapi SDK:', error);
    throw error;
  }
};

// Start a conversation with the specified assistant
export const startConversation = async (
  vapi: any,
  assistantId: string,
  options: { onTranscript?: (text: string) => void; onSpeaking?: (isSpeaking: boolean) => void } = {}
) => {
  try {
    // Handle different SDK format variations
    const startOptions = {
      assistant: assistantId,
      onTranscript: options.onTranscript,
      onSpeaking: options.onSpeaking,
    };

    // Start the conversation
    await vapi.start(startOptions);

    return vapi;
  } catch (error) {
    console.error('Failed to start conversation:', error);
    throw error;
  }
};

// Stop the current conversation
export const stopConversation = async (vapi: any) => {
  try {
    await vapi.stop();
  } catch (error) {
    console.error('Failed to stop conversation:', error);
    throw error;
  }
};

// Clean up the Vapi instance
export const cleanupVapi = async (vapi: any) => {
  try {
    await vapi.destroy();
  } catch (error) {
    console.error('Failed to cleanup Vapi instance:', error);
    throw error;
  }
}; 