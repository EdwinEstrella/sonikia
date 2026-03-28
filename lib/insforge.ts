import { createClient } from '@insforge/sdk';

export const insforge = createClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://base.sonikia.lat',
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || '',
});

export function getInsforgeAccessToken(): string | null {
  const tm = (insforge as unknown as { tokenManager: { getAccessToken: () => string | null } }).tokenManager;
  return tm.getAccessToken();
}
