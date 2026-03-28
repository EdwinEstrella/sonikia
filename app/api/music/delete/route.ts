import { NextRequest, NextResponse } from 'next/server';
import { getBearerTokenFromRequest } from '@/lib/request-bearer';
import { createInsforgeWithAccessToken, getUserFromAccessToken } from '@/lib/insforge-session';

export async function POST(request: NextRequest) {
  try {
    const accessToken = getBearerTokenFromRequest(request);
    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: 'User not authenticated' },
        { status: 401 }
      );
    }

    const user = await getUserFromAccessToken(accessToken);
    if (!user?.id) {
      return NextResponse.json(
        { success: false, error: 'User not authenticated' },
        { status: 401 }
      );
    }

    const insforge = createInsforgeWithAccessToken(accessToken);

    const body = await request.json();
    const { trackId, audioKey1, audioKey2 } = body;

    if (!trackId) {
      return NextResponse.json(
        { success: false, error: 'Track ID is required' },
        { status: 400 }
      );
    }

    try {
      if (audioKey1) {
        await insforge.storage.from('music-tracks').remove(audioKey1);
      }
      if (audioKey2) {
        await insforge.storage.from('music-tracks').remove(audioKey2);
      }
    } catch (storageError) {
      console.error('Error deleting from storage:', storageError);
    }

    const { data: deletedRows, error } = await insforge.database
      .from('music_tracks')
      .delete()
      .eq('id', trackId)
      .select('id');

    if (error) {
      console.error('Error deleting from database:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete music track' },
        { status: 500 }
      );
    }

    if (!deletedRows?.length) {
      return NextResponse.json(
        { success: false, error: 'Track not found or access denied' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/music/delete:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
