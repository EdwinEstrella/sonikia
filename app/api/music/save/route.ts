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

    const {
      taskId,
      conversionId1,
      conversionId2,
      prompt,
      musicStyle,
      lyrics,
      makeInstrumental,
      vocalOnly,
      gender,
      audioUrl1,
      audioUrl2,
    } = body;

    const userId = user.id;

    console.log('💾 Save API - Authenticated user:', {
      userId,
      email: user.email,
      taskId,
      hasAudioUrl1: !!audioUrl1,
      hasAudioUrl2: !!audioUrl2,
    });

    // Download audio files and upload to InsForge Storage
    const audioKey1 = `${userId}/${taskId}_v1.mp3`;
    const audioKey2 = `${userId}/${taskId}_v2.mp3`;

    let finalAudioUrl1 = audioUrl1;
    let finalAudioUrl2 = audioUrl2;
    let finalAudioKey1: string | null = null;
    let finalAudioKey2: string | null = null;

    try {
      // Upload V1 to InsForge Storage
      if (audioUrl1) {
        console.log('📤 Uploading V1 to storage:', audioKey1);
        const response1 = await fetch(audioUrl1);
        const blob1 = await response1.blob();
        const file1 = new File([blob1], audioKey1, { type: 'audio/mpeg' });

        const upload1 = await insforge.storage
          .from('music-tracks')
          .upload(audioKey1, file1);

        if (upload1.data) {
          finalAudioUrl1 = upload1.data.url;
          finalAudioKey1 = upload1.data.key;
          console.log('✅ V1 uploaded successfully:', finalAudioKey1);
        }
      }

      // Upload V2 to InsForge Storage
      if (audioUrl2) {
        console.log('📤 Uploading V2 to storage:', audioKey2);
        const response2 = await fetch(audioUrl2);
        const blob2 = await response2.blob();
        const file2 = new File([blob2], audioKey2, { type: 'audio/mpeg' });

        const upload2 = await insforge.storage
          .from('music-tracks')
          .upload(audioKey2, file2);

        if (upload2.data) {
          finalAudioUrl2 = upload2.data.url;
          finalAudioKey2 = upload2.data.key;
          console.log('✅ V2 uploaded successfully:', finalAudioKey2);
        }
      }
    } catch (uploadError) {
      console.error('❌ Error uploading to storage:', uploadError);
      // Continue with original URLs if upload fails
    }

    // Save metadata to database
    console.log('💾 Saving to database with user_id from auth.uid():', userId);

    const { data, error } = await insforge.database
      .from('music_tracks')
      .insert([
        {
          user_id: userId, // ✅ Usamos auth.uid() del servidor
          task_id: taskId,
          conversion_id_1: conversionId1,
          conversion_id_2: conversionId2,
          prompt,
          music_style: musicStyle,
          lyrics,
          make_instrumental: makeInstrumental,
          vocal_only: vocalOnly,
          gender,
          audio_url_1: finalAudioUrl1,
          audio_url_2: finalAudioUrl2,
          audio_key_1: finalAudioKey1,
          audio_key_2: finalAudioKey2,
          status: 'completed',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('❌ Error saving to database:', error);
      return NextResponse.json(
        { success: false, error: error.message || 'Failed to save music metadata' },
        { status: 500 }
      );
    }

    console.log('✅ Save API - Successfully saved track:', data.id);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('❌ Error in POST /api/music/save:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
