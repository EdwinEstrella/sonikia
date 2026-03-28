'use client';

import { useMusicGeneration } from '@/hooks/useMusicGeneration';
import { MusicHeader } from '@/components/music-header';
import { PromptInput } from '@/components/prompt-input';
import { GeneratingState } from '@/components/generating-state';
import { CompleteState } from '@/components/complete-state';
import { ErrorState } from '@/components/error-state';

function MusicGenerator() {
  const { appState, generateMusic, reset, setPrompt, setVocalOnly, setInstrumentalOnly, setSelectedPreset, setLyrics, setGender } = useMusicGeneration();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateMusic(appState.prompt);
  };

  const handleDownload = () => {
    if (appState.audioUrl) {
      const link = document.createElement('a');
      link.href = appState.audioUrl;
      link.download = `sonikia-music-v1-${Date.now()}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownload2 = () => {
    if (appState.audioUrl2) {
      const link = document.createElement('a');
      link.href = appState.audioUrl2;
      link.download = `sonikia-music-v2-${Date.now()}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl mx-auto px-3 sm:px-4 lg:px-6">
      <MusicHeader />

      {/* Main Content */}
      <div className="relative">
        {/* Glass Card Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl sm:rounded-3xl blur-xl"></div>

        <div className="relative bg-gray-900/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-12 border border-purple-500/20 shadow-2xl">
          {appState.status === 'idle' && (
            <PromptInput
              value={appState.prompt}
              onChange={setPrompt}
              onSubmit={handleSubmit}
              disabled={false}
              vocalOnly={appState.vocalOnly}
              onVocalOnlyChange={setVocalOnly}
              instrumentalOnly={appState.instrumentalOnly}
              onInstrumentalOnlyChange={setInstrumentalOnly}
              selectedPreset={appState.selectedPreset}
              onPresetChange={setSelectedPreset}
              lyrics={appState.lyrics}
              onLyricsChange={setLyrics}
              gender={appState.gender}
              onGenderChange={setGender}
            />
          )}

          {appState.status === 'generating' && (
            <GeneratingState
              progress={appState.progress}
              eta={appState.eta}
              onCancel={reset}
            />
          )}

          {appState.status === 'complete' && appState.audioUrl && (
            <CompleteState
              audioUrl={appState.audioUrl}
              audioUrl2={appState.audioUrl2}
              onDownload={handleDownload}
              onDownload2={handleDownload2}
              onReset={reset}
            />
          )}

          {appState.status === 'error' && (
            <ErrorState
              error={appState.error || 'An error occurred'}
              onRetry={reset}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MusicGenerator;
