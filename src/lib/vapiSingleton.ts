/**
 * vapiSingleton.ts
 * Singleton manager for the Vapi AI Web SDK instance.
 * Ensures only one instance is ever active and provides stop/cleanup.
 *
 * Functions:
 * - getVapi: Returns the singleton Vapi instance.
 * - stopVapi: Stops and cleans up the singleton Vapi instance.
 */

import Vapi from '@vapi-ai/web';

let vapiInstance: any = null;

export function getVapi() {
  if (!vapiInstance) {
    vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '');
  }
  return vapiInstance;
}

export function stopVapi() {
  if (vapiInstance) {
    vapiInstance.stop();
    vapiInstance.removeAllListeners();
  }
} 