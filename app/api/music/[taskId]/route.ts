import { NextRequest, NextResponse } from 'next/server';
import type { ConversionByIdResponse } from '@/types/musicgpt';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params;

    if (!taskId) {
      return NextResponse.json(
        { success: false, error: 'Task ID is required' },
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
    const response = await fetch(
      `${baseUrl}/v1/byId?conversionType=MUSIC_AI&task_id=${taskId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      return NextResponse.json(
        { success: false, error: errorData.message || 'Failed to get conversion status' },
        { status: response.status }
      );
    }

    const data: ConversionByIdResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/music/[taskId]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
