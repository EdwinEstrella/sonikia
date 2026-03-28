// MusicGPT API Types

export interface MusicAIRequest {
  prompt: string;
  music_style?: string;
  lyrics?: string;
  make_instrumental?: boolean;
  vocal_only?: boolean;
  gender?: string;
  voice_id?: string;
  output_length?: number;
  webhook_url?: string;
}

export interface MusicAIResponse {
  success: boolean;
  message: string;
  task_id: string;
  conversion_id_1: string;
  conversion_id_2: string;
  eta: number;
}

export interface ConversionDetails {
  task_id: string;
  conversion_id: string;
  status: 'processing' | 'complete' | 'failed';
  status_msg: string;
  audio_url?: string;
  conversion_cost: number;
  title: string;
  lyrics: string;
  music_style: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversionByIdResponse {
  success: boolean;
  conversion: ConversionDetails;
}

// Application State Types
export type AppStateStatus = 'idle' | 'generating' | 'complete' | 'error';

export interface AppState {
  status: AppStateStatus;
  prompt: string;
  taskId: string | null;
  audioUrl: string | null;
  error: string | null;
  eta: number | null;
  progress: number;
}
