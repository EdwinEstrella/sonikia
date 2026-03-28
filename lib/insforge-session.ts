import { createClient } from '@insforge/sdk';

const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://base.sonikia.lat';
const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || '';

export type InsforgeSessionUser = { id: string; email?: string };

export function createInsforgeWithAccessToken(accessToken: string) {
  return createClient({
    baseUrl,
    anonKey,
    edgeFunctionToken: accessToken,
  });
}

export async function getUserFromAccessToken(accessToken: string): Promise<InsforgeSessionUser | null> {
  const client = createInsforgeWithAccessToken(accessToken);
  try {
    const res = await client.getHttpClient().get<{ user: InsforgeSessionUser | null }>(
      '/api/auth/sessions/current'
    );
    return res?.user ?? null;
  } catch {
    return null;
  }
}
