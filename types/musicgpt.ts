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

/** Respuesta de GET /v1/byId (MusicGPT) — nombres reales del API. */
export interface ConversionDetails {
  task_id?: string;
  conversion_id?: string;
  status: string;
  status_msg?: string;
  message?: string;
  conversion_path_1?: string;
  conversion_path_2?: string;
  /** A veces vacío; la letra generada suele ir en lyrics_1 / lyrics_2 */
  lyrics?: string;
  lyrics_1?: string;
  lyrics_2?: string;
  lyrics_timestamped_1?: string;
  lyrics_timestamped_2?: string;
  title?: string;
  title_1?: string;
  title_2?: string;
  music_style?: string;
  description_prompt?: string;
  instrumental?: boolean;
  vocal_only?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/** Une letra y título tal como los devuelve byId. */
export function pickConversionLyrics(c: ConversionDetails): {
  lyrics1: string;
  lyrics2: string;
  title: string;
} {
  const lyrics1 = (c.lyrics_1 ?? c.lyrics ?? '').trim();
  const lyrics2 = (c.lyrics_2 ?? '').trim();
  const title = (c.title_1 ?? c.title_2 ?? c.title ?? '').trim();
  return { lyrics1, lyrics2, title };
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
  conversionId: string | null;
  conversionId2: string | null;
  audioUrl: string | null;
  audioUrl2: string | null;
  error: string | null;
  eta: number | null;
  progress: number;
  vocalOnly: boolean;
  instrumentalOnly: boolean;
  selectedPreset: string;
  /** Letra escrita por el usuario antes de generar */
  lyrics: string;
  gender: 'male' | 'female' | 'neutral' | '';
  /** Letra devuelta por MusicGPT (lyrics_1 / lyrics_2) */
  generatedLyrics: string | null;
  generatedLyrics2: string | null;
  generatedTitle: string | null;
}

// Music Presets
export interface MusicPreset {
  id: string;
  name: string;
  emoji: string;
  prompt: string;
  category: 'genre' | 'mood' | 'instrumental';
}

export const MUSIC_PRESETS: MusicPreset[] = [
  // Genre Presets
  { id: 'lofi', name: 'Lo-Fi Hip Hop', emoji: '🎧', prompt: 'Lo-fi hip hop chill beats with vinyl crackle, soft piano melodies, and relaxed vibes', category: 'genre' },
  { id: 'trap', name: 'Trap', emoji: '🔥', prompt: 'Modern trap with heavy 808 bass, rapid hi-hats, and dark atmospheric pads', category: 'genre' },
  { id: 'reggaeton', name: 'Reggaeton', emoji: '🔥', prompt: 'Reggaeton with dembow rhythm, plucky synth melodies, and danceable energy', category: 'genre' },
  { id: 'rock', name: 'Rock', emoji: '🎸', prompt: 'Rock with electric guitars, powerful drums, and driving energy', category: 'genre' },
  { id: 'pop', name: 'Pop', emoji: '⭐', prompt: 'Modern pop with catchy melodies, bright production, and radio-friendly sound', category: 'genre' },
  { id: 'jazz', name: 'Jazz', emoji: '🎷', prompt: 'Smooth jazz with saxophone, piano chords, and relaxed sophisticated atmosphere', category: 'genre' },
  { id: 'edm', name: 'EDM', emoji: '🎹', prompt: 'Electronic dance music with pumping kick, synths, and high energy drops', category: 'genre' },
  { id: 'classical', name: 'Classical', emoji: '🎻', prompt: 'Classical orchestra with strings, brass, and elegant composition', category: 'genre' },

  // Mood Presets
  { id: 'chill', name: 'Chill', emoji: '😌', prompt: 'Chill relaxed vibes with soft pads, gentle melodies, and peaceful atmosphere', category: 'mood' },
  { id: 'energetic', name: 'Energetic', emoji: '⚡', prompt: 'High energy with fast tempo, driving rhythm, and intense excitement', category: 'mood' },
  { id: 'sad', name: 'Melancholic', emoji: '😢', prompt: 'Sad emotional ballad with minor keys, slow tempo, and heartfelt feeling', category: 'mood' },
  { id: 'epic', name: 'Epic', emoji: '🏰', prompt: 'Epic cinematic with orchestra, powerful brass, and dramatic intensity', category: 'mood' },
  { id: 'romantic', name: 'Romantic', emoji: '💕', prompt: 'Romantic with soft piano, strings, and loving warm atmosphere', category: 'mood' },
  { id: 'dark', name: 'Dark', emoji: '🌑', prompt: 'Dark moody atmosphere with deep bass, minor chords, and mysterious tension', category: 'mood' },

  // Instrumental Presets
  { id: 'piano', name: 'Piano Solo', emoji: '🎹', prompt: 'Beautiful piano solo with expressive melodies and harmonies', category: 'instrumental' },
  { id: 'guitar', name: 'Guitar', emoji: '🎸', prompt: 'Acoustic guitar with fingerpicking patterns and warm tone', category: 'instrumental' },
  { id: 'beats', name: 'Beats', emoji: '🥁', prompt: 'Instrumental beats with drums, bass, and rhythmic patterns', category: 'instrumental' },
  { id: 'ambient', name: 'Ambient', emoji: '🌊', prompt: 'Ambient soundscape with pads, textures, and atmospheric sound design', category: 'instrumental' },
];
