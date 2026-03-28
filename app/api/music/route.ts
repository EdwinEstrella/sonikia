import { NextRequest, NextResponse } from 'next/server';
import type { MusicAIRequest, MusicAIResponse } from '@/types/musicgpt';

export async function POST(request: NextRequest) {
  try {
    const body: MusicAIRequest = await request.json();

    // Validate required fields
    if (!body.prompt || body.prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Get environment variables
    const apiKey = process.env.MUSICGPT_API_KEY;
    const baseUrl = process.env.MUSICGPT_BASE_URL || 'https://api.musicgpt.com/api/public';

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'MusicGPT API key is not configured' },
        { status: 500 }
      );
    }

    // Call MusicGPT API
    const response = await fetch(`${baseUrl}/v1/MusicAI`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: body.prompt,
        music_style: body.music_style,
        lyrics: body.lyrics,
        make_instrumental: body.make_instrumental,
        vocal_only: body.vocal_only,
        gender: body.gender,
        voice_id: body.voice_id,
        output_length: body.output_length,
        webhook_url: body.webhook_url,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      return NextResponse.json(
        { success: false, error: errorData.message || 'Failed to generate music' },
        { status: response.status }
      );
    }

    const data: MusicAIResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/music:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
