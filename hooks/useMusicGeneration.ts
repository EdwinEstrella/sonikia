import { useState, useCallback, useRef } from 'react';
import type { AppState } from '@/types/musicgpt';
import { getInsforgeAccessToken } from '@/lib/insforge';
import { jsonHeadersWithInsforgeAuth } from '@/lib/insforge-auth-headers';

const POLL_INTERVAL = 5000; // 5 seconds
const MAX_POLLING_TIME = 600000; // 10 minutes

export function useMusicGeneration() {
  const [appState, setAppState] = useState<AppState>({
    status: 'idle',
    prompt: '',
    taskId: null,
    conversionId: null,
    conversionId2: null,
    audioUrl: null,
    audioUrl2: null,
    error: null,
    eta: null,
    progress: 0,
    vocalOnly: false,
    instrumentalOnly: false,
    selectedPreset: '',
    lyrics: '',
    gender: '',
  });

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pollingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startPolling = useCallback(async (conversionId: string, conversionId2: string, taskId: string, eta: number, prompt: string, musicStyle: string, lyrics: string, makeInstrumental: boolean, vocalOnly: boolean, gender: string) => {
    const startTime = Date.now();

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/music/${conversionId}`);
        const data = await response.json();

        if (data.success && data.conversion) {
          const { status, conversion_path_1, conversion_path_2 } = data.conversion;

          if (status === 'COMPLETED' && (conversion_path_1 || conversion_path_2)) {
            setAppState((prev) => ({
              ...prev,
              status: 'complete',
              audioUrl: conversion_path_1,
              audioUrl2: conversion_path_2,
              progress: 100,
            }));

            // Save to InsForge
            try {
              console.log('🎵 Saving music (JWT en Authorization → servidor + RLS)');

              const saveResponse = await fetch('/api/music/save', {
                method: 'POST',
                headers: jsonHeadersWithInsforgeAuth(getInsforgeAccessToken()),
                body: JSON.stringify({
                  // user_id solo en servidor a partir del JWT
                  taskId,
                  conversionId1: conversionId,
                  conversionId2: conversionId2,
                  prompt,
                  musicStyle,
                  lyrics,
                  makeInstrumental,
                  vocalOnly,
                  gender,
                  audioUrl1: conversion_path_1,
                  audioUrl2: conversion_path_2,
                }),
              });

              const saveData = await saveResponse.json();
              console.log('💾 Save response:', saveData);

              if (!saveResponse.ok || !saveData.success) {
                console.error('❌ Failed to save music:', saveData.error);
              }
            } catch (saveError) {
              console.error('❌ Error saving music:', saveError);
            }

            stopPolling();
            return;
          }

          if (status === 'FAILED') {
            setAppState((prev) => ({
              ...prev,
              status: 'error',
              error: data.conversion.status_msg || 'Music generation failed',
            }));
            stopPolling();
            return;
          }

          // Update progress based on ETA
          const elapsed = (Date.now() - startTime) / 1000;
          const newProgress = Math.min((elapsed / eta) * 100, 95);
          setAppState((prev) => ({ ...prev, progress: newProgress }));
        }
      } catch (error) {
        console.error('Error polling status:', error);
      }
    };

    // Initial check
    checkStatus();

    // Set up interval
    pollingIntervalRef.current = setInterval(checkStatus, POLL_INTERVAL);

    // Set up timeout
    pollingTimeoutRef.current = setTimeout(() => {
      stopPolling();
      setAppState((prev) => ({
        ...prev,
        status: 'error',
        error: 'Music generation timed out. Please try again.',
      }));
    }, MAX_POLLING_TIME);
  }, []);

  const stopPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
      pollingTimeoutRef.current = null;
    }
  }, []);

  const generateMusic = useCallback(async (prompt: string) => {
    if (!prompt.trim()) {
      setAppState((prev) => ({
        ...prev,
        error: 'Please enter a prompt',
      }));
      return;
    }

    setAppState((prev) => ({
      ...prev,
      status: 'generating',
      error: null,
      progress: 0,
    }));

    try {
      const requestBody: {
        prompt: string;
        make_instrumental: boolean;
        vocal_only: boolean;
        music_style?: string;
        lyrics?: string;
        gender?: string;
      } = {
        prompt,
        make_instrumental: appState.instrumentalOnly,
        vocal_only: appState.vocalOnly,
      };

      if (appState.lyrics.trim()) {
        requestBody.lyrics = appState.lyrics.trim();
      }

      if (appState.gender) {
        requestBody.gender = appState.gender;
      }

      const response = await fetch('/api/music', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to start music generation');
      }

      setAppState((prev) => ({
        ...prev,
        taskId: data.task_id,
        conversionId: data.conversion_id_1,
        conversionId2: data.conversion_id_2,
        eta: data.eta,
      }));

      await startPolling(
        data.conversion_id_1,
        data.conversion_id_2,
        data.task_id,
        data.eta,
        prompt,
        appState.selectedPreset,
        appState.lyrics,
        appState.instrumentalOnly,
        appState.vocalOnly,
        appState.gender
      );
    } catch (error) {
      setAppState((prev) => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  }, [startPolling, appState.instrumentalOnly, appState.vocalOnly, appState.lyrics, appState.gender]);

  const reset = useCallback(() => {
    stopPolling();
    setAppState({
      status: 'idle',
      prompt: '',
      taskId: null,
      conversionId: null,
      conversionId2: null,
      audioUrl: null,
      audioUrl2: null,
      error: null,
      eta: null,
      progress: 0,
      vocalOnly: false,
      instrumentalOnly: false,
      selectedPreset: '',
      lyrics: '',
      gender: '',
    });
  }, [stopPolling]);

  const setPrompt = useCallback((prompt: string) => {
    setAppState((prev) => ({ ...prev, prompt }));
  }, []);

  const setVocalOnly = useCallback((vocalOnly: boolean) => {
    setAppState((prev) => ({ ...prev, vocalOnly, instrumentalOnly: vocalOnly ? false : prev.instrumentalOnly }));
  }, []);

  const setInstrumentalOnly = useCallback((instrumentalOnly: boolean) => {
    setAppState((prev) => ({ ...prev, instrumentalOnly, vocalOnly: instrumentalOnly ? false : prev.vocalOnly }));
  }, []);

  const setSelectedPreset = useCallback((selectedPreset: string) => {
    setAppState((prev) => ({ ...prev, selectedPreset }));
  }, []);

  const setLyrics = useCallback((lyrics: string) => {
    setAppState((prev) => ({ ...prev, lyrics }));
  }, []);

  const setGender = useCallback((gender: 'male' | 'female' | 'neutral' | '') => {
    setAppState((prev) => ({ ...prev, gender }));
  }, []);

  return {
    appState,
    generateMusic,
    reset,
    setPrompt,
    setVocalOnly,
    setInstrumentalOnly,
    setSelectedPreset,
    setLyrics,
    setGender,
  };
}
