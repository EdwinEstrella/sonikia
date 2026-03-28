'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { MusicNote, Add, Delete, Download } from '@mui/icons-material';
import { getInsforgeAccessToken } from '@/lib/insforge';
import { insforgeAuthHeaders, jsonHeadersWithInsforgeAuth } from '@/lib/insforge-auth-headers';

interface MusicTrack {
  id: string;
  prompt: string;
  music_style: string;
  lyrics: string;
  audio_url_1: string;
  audio_url_2: string;
  audio_key_1: string;
  audio_key_2: string;
  created_at: string;
}

export default function HistoryPage() {
  const { user, accessToken, loading: authLoading } = useAuth();
  const router = useRouter();
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth');
      return;
    }

    if (user) {
      fetchHistory();
    }
  }, [user, authLoading, router]);

  const fetchHistory = async () => {
    const token = accessToken ?? getInsforgeAccessToken();
    if (!token) {
      setError('No hay token de sesión. Cierra sesión y vuelve a entrar.');
      setLoading(false);
      return;
    }
    try {
      console.log('🔍 Frontend - Fetching history for user:', user?.id);
      const response = await fetch('/api/music/history', {
        headers: insforgeAuthHeaders({}, token),
      });
      const data = await response.json();

      console.log('🔍 Frontend - History response:', data);

      if (data.success) {
        setTracks(data.data || []);
      } else {
        setError(data.error || 'Failed to fetch history');
      }
    } catch (err) {
      console.error('❌ Frontend - Error fetching history:', err);
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (trackId: string, audioKey1: string | null, audioKey2: string | null) => {
    if (!confirm('¿Estás seguro de eliminar esta música?')) return;

    try {
      const response = await fetch('/api/music/delete', {
        method: 'POST',
        headers: jsonHeadersWithInsforgeAuth(accessToken ?? getInsforgeAccessToken()),
        body: JSON.stringify({ trackId, audioKey1, audioKey2 }),
      });

      const data = await response.json();

      if (data.success) {
        setTracks(tracks.filter((track) => track.id !== trackId));
      } else {
        alert(data.error || 'Failed to delete track');
      }
    } catch (err) {
      alert('Error deleting track');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
          <div className="mb-12 min-h-[120px]">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Historial de Músicas
              </span>
            </h1>
          </div>
          <div className="flex flex-col items-center gap-4 py-20">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400">Cargando historial...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="mb-12 min-h-[120px]">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Historial de Músicas
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            {tracks.length === 0
              ? 'Aún no has creado ninguna música. ¡Comienza ahora!'
              : `Tienes ${tracks.length} ${tracks.length === 1 ? 'canción creada' : 'canciones creadas'}`}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-red-400 text-center">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {tracks.length === 0 && !loading && !error && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center">
              <MusicNote className="w-12 h-12 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Sin músicas aún</h3>
            <p className="text-gray-400 mb-6">Crea tu primera música con IA</p>
            <a
              href="/app"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/30"
            >
              <Add fontSize="small" />
              Crear Música
            </a>
          </div>
        )}

        {/* Music List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-1">
                    {new Date(track.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <h3 className="text-white font-semibold line-clamp-2">
                    {track.prompt}
                  </h3>
                </div>
                <button
                  onClick={() => handleDelete(track.id, track.audio_key_1 || null, track.audio_key_2 || null)}
                  className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                  title="Eliminar"
                >
                  <Delete fontSize="small" />
                </button>
              </div>

              {/* Audio Players */}
              <div className="space-y-3">
                {track.audio_url_1 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Versión 1</p>
                    <audio
                      src={track.audio_url_1}
                      controls
                      className="w-full h-10"
                    >
                      Tu navegador no soporta audio
                    </audio>
                    <a
                      href={track.audio_url_1}
                      download
                      className="inline-flex items-center gap-1 mt-2 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <Download fontSize="inherit" />
                      Descargar
                    </a>
                  </div>
                )}

                {track.audio_url_2 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Versión 2</p>
                    <audio
                      src={track.audio_url_2}
                      controls
                      className="w-full h-10"
                    >
                      Tu navegador no soporta audio
                    </audio>
                    <a
                      href={track.audio_url_2}
                      download
                      className="inline-flex items-center gap-1 mt-2 text-xs text-pink-400 hover:text-pink-300 transition-colors"
                    >
                      <Download fontSize="inherit" />
                      Descargar
                    </a>
                  </div>
                )}
              </div>

              {/* Tags */}
              {track.music_style && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full">
                    {track.music_style}
                  </span>
                  {track.lyrics && (
                    <span className="px-3 py-1 bg-pink-500/10 text-pink-400 text-xs rounded-full">
                      Con letra
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
