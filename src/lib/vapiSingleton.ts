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

/**
 * Returns the shared Vapi instance, creating it the first time only.
 */
export function getVapi() {
  if (!vapiInstance) {
    vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '');
  }
  return vapiInstance;
}

/**
 * Stops the current conversation and removes all listeners so the
 * instance can be safely reused. We do NOT destroy the underlying DailyIframe
 * because that would require constructing a brand-new one (which causes the
 * duplicate-iframe error). Instead we keep the singleton alive and idle.
 */
export async function stopVapi(): Promise<void> {
  if (!vapiInstance) return;

  try {
    // stop() returns a promise – await to ensure the callframe fully ends
    await vapiInstance.stop();
  } catch (_) {
    // ignore – stop may throw if already stopped
  }

  try {
    vapiInstance.removeAllListeners();
  } catch (_) {
    // ignore
  }
} 