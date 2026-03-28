import { NextRequest, NextResponse } from 'next/server';
import { getBearerTokenFromRequest } from '@/lib/request-bearer';
import { createInsforgeWithAccessToken } from '@/lib/insforge-session';

export async function GET(request: NextRequest) {
  try {
    const accessToken = getBearerTokenFromRequest(request);
    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: 'User not authenticated' },
        { status: 401 }
      );
    }

    const insforge = createInsforgeWithAccessToken(accessToken);

    // No filtrar por user.id aquí: RLS (auth.uid() = user_id) ya devuelve solo filas del JWT.
    // Un .eq('user_id', id de /sessions/current) puede vaciar resultados si difiere del uid del token.
    const { data, error } = await insforge.database
      .from('music_tracks')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('🔍 History API - RLS-scoped query', { count: data?.length, error });

    if (error) {
      console.error('❌ Error fetching music tracks:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch music history' },
        { status: 500 }
      );
    }

    console.log('✅ History API - Found', data?.length || 0, 'tracks (RLS)');
    return NextResponse.json({ success: true, data: data || [] });
  } catch (error) {
    console.error('❌ Error in GET /api/music/history:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
