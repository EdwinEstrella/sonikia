import { getInsforgeAccessToken } from '@/lib/insforge';

/** Extra headers (e.g. Content-Type) plus InsForge JWT when the user is logged in. */
export function insforgeAuthHeaders(
  base: Record<string, string> = {},
  accessTokenOverride?: string | null
): Record<string, string> {
  const token = accessTokenOverride ?? getInsforgeAccessToken();
  return {
    ...base,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function jsonHeadersWithInsforgeAuth(accessTokenOverride?: string | null): Record<string, string> {
  return insforgeAuthHeaders({ 'Content-Type': 'application/json' }, accessTokenOverride);
}
