import { NextRequest, NextResponse } from 'next/server';
import { insforge } from '@/lib/insforge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { trackId, audioKey1, audioKey2 } = body;

    if (!trackId) {
      return NextResponse.json(
        { success: false, error: 'Track ID is required' },
        { status: 400 }
      );
    }

    // Delete from storage
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

    // Delete from database
    const { error } = await insforge.database
      .from('music_tracks')
      .delete()
      .eq('id', trackId);

    if (error) {
      console.error('Error deleting from database:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete music track' },
        { status: 500 }
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
