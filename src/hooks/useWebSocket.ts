import { useState, useRef, useCallback, useEffect } from 'react';

export type Message = {
  speaker: 'user' | 'ai' | 'system';
  text: string;
};

export type Status = 'idle' | 'listening' | 'thinking' | 'speaking';

const MAX_RETRIES = 5;
const BASE_RETRY_DELAY_MS = 1000;

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [micVolume, setMicVolume] = useState(0);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<AudioWorkletNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const retryCountRef = useRef(0);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReconnectRef = useRef(false);
  // Buffer AI text until the matching user transcription arrives, so messages
  // always appear in the correct order: user → AI.
  const pendingAiTextRef = useRef<string | null>(null);

  const stopCurrentAudio = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.src = '';
      currentAudioRef.current = null;
    }
  }, []);

  const playAudioData = useCallback(
    (data: ArrayBuffer) => {
      stopCurrentAudio();
      const blob = new Blob([data], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      currentAudioRef.current = audio;
      audio.onended = () => {
        URL.revokeObjectURL(url);
        currentAudioRef.current = null;
        setStatus('listening');
      };
      audio.play().catch(console.error);
    },
    [stopCurrentAudio]
  );

  const startMicrophone = useCallback(async (audioContext: AudioContext) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true },
      });

      mediaStreamRef.current = stream;
      const source = audioContext.createMediaStreamSource(stream);

      analyserRef.current = audioContext.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);

      await audioContext.audioWorklet.addModule('/audio-processor.js');
      const workletNode = new AudioWorkletNode(audioContext, 'audio-processor');
      processorRef.current = workletNode;
      source.connect(workletNode);
      workletNode.connect(audioContext.destination);

      workletNode.port.onmessage = (event: MessageEvent<Float32Array>) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const input = event.data;
          const buffer = new ArrayBuffer(input.length * 2);
          const view = new DataView(buffer);
          for (let i = 0; i < input.length; i++) {
            const s = Math.max(-1, Math.min(1, input[i]));
            view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
          }
          wsRef.current.send(buffer);
        }
      };

      const updateVolume = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        setMicVolume(avg / 255);
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();
    } catch (error) {
      console.error('Error starting microphone:', error);
    }
  }, []);

  const stopMicrophone = useCallback(() => {
    processorRef.current?.disconnect();
    processorRef.current = null;
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setMicVolume(0);
  }, []);

  const connectWs = useCallback(async (audioContext: AudioContext) => {
    const url = import.meta.env.VITE_WS_URL;
    if (!url) {
      setConnectionError('VITE_WS_URL is not configured.');
      return;
    }

    const ws = new WebSocket(url);
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      retryCountRef.current = 0;
      setConnectionError(null);
      ws.send(JSON.stringify({ type: 'init', sampleRate: audioContext.sampleRate }));
      setIsConnected(true);
      setStatus('listening');
      startMicrophone(audioContext);
    };

    ws.onmessage = (event) => {
      // Binary = AI audio WAV bytes
      if (event.data instanceof ArrayBuffer) {
        // Flush any buffered AI text that never got a matching User: transcript
        if (pendingAiTextRef.current) {
          const text = pendingAiTextRef.current;
          pendingAiTextRef.current = null;
          setMessages((prev) => [...prev, { speaker: 'ai', text }]);
        }
        setStatus('speaking');
        playAudioData(event.data);
        return;
      }

      if (typeof event.data === 'string') {
        // Plain-text transcripts
        if (event.data.startsWith('User: ')) {
          const userText = event.data.slice(6);
          const bufferedAi = pendingAiTextRef.current;
          pendingAiTextRef.current = null;
          // Always insert user message first, then the buffered AI reply
          setMessages((prev) => {
            const next: Message[] = [...prev, { speaker: 'user', text: userText }];
            if (bufferedAi) next.push({ speaker: 'ai', text: bufferedAi });
            return next;
          });
          setStatus('thinking');
          return;
        }
        if (event.data.startsWith('AI: ')) {
          // Hold the AI text; it will be appended after the user transcript arrives
          pendingAiTextRef.current = event.data.slice(4);
          return;
        }

        // JSON control messages
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'status') {
            setStatus(data.ai_speaking ? 'speaking' : 'listening');
          } else if (data.type === 'interrupted') {
            stopCurrentAudio();
            setMessages((prev) => [...prev, { speaker: 'system', text: 'Interrupted' }]);
            setStatus('listening');
          }
        } catch {
          // ignore unrecognised messages
        }
      }
    };

    ws.onerror = (error) => console.error('WebSocket error:', error);

    ws.onclose = () => {
      setIsConnected(false);
      setStatus('idle');
      stopMicrophone();
      stopCurrentAudio();

      if (shouldReconnectRef.current && retryCountRef.current < MAX_RETRIES) {
        const delay = BASE_RETRY_DELAY_MS * Math.pow(2, retryCountRef.current);
        retryCountRef.current += 1;
        setConnectionError(`Connection lost. Retrying in ${delay / 1000}s… (attempt ${retryCountRef.current}/${MAX_RETRIES})`);
        retryTimeoutRef.current = setTimeout(() => {
          connectWs(audioContext);
        }, delay);
      } else if (shouldReconnectRef.current) {
        setConnectionError('Could not connect to the server. Please try again.');
        shouldReconnectRef.current = false;
      }
    };

    wsRef.current = ws;
  }, [startMicrophone, stopMicrophone, playAudioData, stopCurrentAudio]);

  const connect = useCallback(async () => {
    const audioContext = new AudioContext();
    if (audioContext.state === 'suspended') await audioContext.resume();
    audioContextRef.current = audioContext;

    retryCountRef.current = 0;
    shouldReconnectRef.current = true;
    setConnectionError(null);
    connectWs(audioContext);
  }, [connectWs]);

  const disconnect = useCallback(() => {
    shouldReconnectRef.current = false;
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    wsRef.current?.close();
    wsRef.current = null;
    stopMicrophone();
    stopCurrentAudio();
    setStatus('idle');
    setConnectionError(null);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  }, [stopMicrophone, stopCurrentAudio]);

  const interrupt = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'interrupt' }));
    }
    stopCurrentAudio();
    setStatus('listening');
  }, [stopCurrentAudio]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return { isConnected, status, messages, micVolume, connectionError, connect, disconnect, interrupt };
};
