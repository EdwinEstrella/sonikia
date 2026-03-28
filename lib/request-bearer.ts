export function getBearerTokenFromRequest(request: Request): string | null {
  const h = request.headers.get('authorization') ?? request.headers.get('Authorization');
  if (!h || !h.toLowerCase().startsWith('bearer ')) return null;
  const t = h.slice(7).trim();
  return t || null;
}
