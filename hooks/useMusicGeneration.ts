import { useState, useCallback, useRef } from 'react';
import type { AppState } from '@/types/musicgpt';

const POLL_INTERVAL = 5000; // 5 seconds
const MAX_POLLING_TIME = 600000; // 10 minutes

export function useMusicGeneration() {
  const [appState, setAppState] = useState<AppState>({
    status: 'idle',
    prompt: '',
    taskId: null,
    audioUrl: null,
    error: null,
    eta: null,
    progress: 0,
  });

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pollingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startPolling = useCallback((taskId: string, eta: number) => {
    const startTime = Date.now();

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/music/${taskId}`);
        const data = await response.json();

        if (data.success && data.conversion) {
          const { status, audio_url } = data.conversion;

          if (status === 'complete' && audio_url) {
            setAppState((prev) => ({
              ...prev,
              status: 'complete',
              audioUrl: audio_url,
              progress: 100,
            }));
            stopPolling();
            return;
          }

          if (status === 'failed') {
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
      const response = await fetch('/api/music', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to start music generation');
      }

      setAppState((prev) => ({
        ...prev,
        taskId: data.task_id,
        eta: data.eta,
      }));

      startPolling(data.task_id, data.eta);
    } catch (error) {
      setAppState((prev) => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  }, [startPolling]);

  const reset = useCallback(() => {
    stopPolling();
    setAppState({
      status: 'idle',
      prompt: '',
      taskId: null,
      audioUrl: null,
      error: null,
      eta: null,
      progress: 0,
    });
  }, [stopPolling]);

  const setPrompt = useCallback((prompt: string) => {
    setAppState((prev) => ({ ...prev, prompt }));
  }, []);

  return {
    appState,
    generateMusic,
    reset,
    setPrompt,
  };
}
