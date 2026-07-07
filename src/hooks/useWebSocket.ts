import { useState, useRef, useCallback, useEffect } from 'react';

export type Message = {
  speaker: 'user' | 'ai' | 'system';
  text: string;
};

export type Status = 'idle' | 'listening' | 'thinking' | 'speaking';

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [micVolume, setMicVolume] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const volumeIntervalRef = useRef<number | null>(null);
  // Gapless playback via the Web Audio API. Each incoming WAV chunk is decoded
  // to an AudioBuffer and scheduled on the shared AudioContext timeline right
  // after the previous one, so chunks butt up sample-accurately with no gap or
  // click. (The old approach played one <audio> element per chunk, chained via
  // onended — which left an audible gap at every chunk boundary → "breaking".)
  const audioQueueRef = useRef<ArrayBuffer[]>([]);
  const isPumpingRef = useRef(false); // is the decode/schedule pump running?
  const nextStartTimeRef = useRef(0); // AudioContext time for the next chunk
  const scheduledSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  // Audio gate: after a barge-in/interrupt we flush the queue, but the server
  // may still have in-flight WAV chunks from the CANCELLED turn arriving over
  // the socket a moment later. Without a gate those late chunks get re-enqueued
  // and the old reply "resumes" after the new one. While the gate is closed we
  // DROP incoming audio; it reopens when a genuinely new turn begins (the server
  // sends {"type":"thinking","active":true} at the start of every turn).
  const acceptAudioRef = useRef(true);

  const stopCurrentAudio = useCallback(() => {
    // Flush queued chunks and stop everything already scheduled on the timeline
    // (barge-in / interrupt must cut audio instantly). Clear onended first so
    // teardown doesn't fire a spurious "finished → listening" status change.
    audioQueueRef.current = [];
    for (const src of scheduledSourcesRef.current) {
      try {
        src.onended = null;
        src.stop();
      } catch {
        /* already stopped or ended — ignore */
      }
    }
    scheduledSourcesRef.current = [];
    nextStartTimeRef.current = 0;
    isPumpingRef.current = false;
  }, []);

  // Decode + schedule queued chunks IN ORDER. decodeAudioData is async, so a
  // single serial pump is required — decoding chunks concurrently could resolve
  // out of order and scramble the audio.
  const pumpAudioQueue = useCallback(async () => {
    if (isPumpingRef.current) return;
    const ctx = audioContextRef.current;
    if (!ctx) return;
    isPumpingRef.current = true;
    try {
      while (audioQueueRef.current.length > 0) {
        const data = audioQueueRef.current.shift()!;
        let buffer: AudioBuffer;
        try {
          // decodeAudioData detaches the buffer, so hand it a private copy.
          buffer = await ctx.decodeAudioData(data.slice(0));
        } catch (err) {
          console.error('decodeAudioData failed, skipping chunk:', err);
          continue;
        }
        // A barge-in may have flushed the queue while we awaited the decode.
        if (!acceptAudioRef.current) continue;
        // Schedule right after the previous chunk. If we underran (chunk arrived
        // late), start just ahead of "now" instead of in the past.
        const startAt = Math.max(ctx.currentTime + 0.02, nextStartTimeRef.current);
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        src.connect(ctx.destination);
        src.start(startAt);
        nextStartTimeRef.current = startAt + buffer.duration;
        scheduledSourcesRef.current.push(src);
        setStatus('speaking');
        src.onended = () => {
          scheduledSourcesRef.current = scheduledSourcesRef.current.filter((s) => s !== src);
          // Turn is done playing only when nothing is scheduled AND nothing queued.
          if (scheduledSourcesRef.current.length === 0 && audioQueueRef.current.length === 0) {
            nextStartTimeRef.current = 0;
            setStatus('listening');
          }
        };
      }
    } finally {
      isPumpingRef.current = false;
    }
  }, []);

  const enqueueAudio = useCallback(
    (data: ArrayBuffer) => {
      audioQueueRef.current.push(data);
      void pumpAudioQueue();
    },
    [pumpAudioQueue]
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

      // AudioWorkletNode processes audio on a dedicated real-time thread,
      // separate from the main JS thread — unlike the deprecated
      // ScriptProcessorNode this replaces, mic capture keeps flowing smoothly
      // even under main-thread load (React re-renders, the animated sphere),
      // instead of risking delayed or jittery audio callbacks right when
      // responsiveness matters most. The worklet (public/audio-processor.js)
      // batches to 4096-sample chunks itself, so the WebSocket message size/
      // cadence is unchanged from before — a drop-in replacement.
      await audioContext.audioWorklet.addModule('/audio-processor.js');
      const workletNode = new AudioWorkletNode(audioContext, 'audio-processor');
      workletNodeRef.current = workletNode;
      source.connect(workletNode);
      // Some browsers only pull data through a worklet node whose output is
      // connected somewhere. The processor never writes to its output, so
      // this stays silent — no mic monitoring/echo is introduced.
      workletNode.connect(audioContext.destination);

      workletNode.port.onmessage = (event: MessageEvent<Float32Array>) => {
        if (wsRef.current?.readyState !== WebSocket.OPEN) return;
        const input = event.data;
        const buffer = new ArrayBuffer(input.length * 2);
        const view = new DataView(buffer);
        for (let i = 0; i < input.length; i++) {
          const s = Math.max(-1, Math.min(1, input[i]));
          view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
        }
        wsRef.current.send(buffer);
      };

      // Volume meter for the visual sphere/waveform. Previously this ran on
      // every requestAnimationFrame tick (~60/sec), calling setMicVolume — a
      // React state update — that often purely to drive a slowly-varying
      // visual indicator. That's 60 re-renders/sec competing for the same
      // main thread we just moved audio capture OFF of. 20 Hz is still
      // visually smooth for a volume bar and cuts re-render volume by ~2/3.
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      volumeIntervalRef.current = window.setInterval(() => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        setMicVolume(avg / 255);
      }, 50);
    } catch (error) {
      console.error('Error starting microphone:', error);
    }
  }, []);

  const stopMicrophone = useCallback(() => {
    workletNodeRef.current?.port.close();
    workletNodeRef.current?.disconnect();
    workletNodeRef.current = null;
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;
    if (volumeIntervalRef.current !== null) {
      clearInterval(volumeIntervalRef.current);
      volumeIntervalRef.current = null;
    }
    setMicVolume(0);
  }, []);

  const connect = useCallback(async () => {
    const audioContext = new AudioContext();
    if (audioContext.state === 'suspended') await audioContext.resume();
    audioContextRef.current = audioContext;

    const ws = new WebSocket(import.meta.env.VITE_WS_URL);
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'init', sampleRate: audioContext.sampleRate }));
      setIsConnected(true);
      setStatus('listening');
      startMicrophone(audioContext);
    };

    ws.onmessage = (event) => {
      // Binary = AI audio WAV bytes
      if (event.data instanceof ArrayBuffer) {
        // Drop audio from a turn that was just barged-in/interrupted — its
        // late-arriving chunks must not be queued (they'd resume the old reply).
        if (!acceptAudioRef.current) return;
        setStatus('speaking');
        enqueueAudio(event.data);
        return;
      }

      if (typeof event.data === 'string') {
        // Plain-text transcripts
        if (event.data.startsWith('User: ')) {
          const userText = event.data.slice(6);
          setMessages((prev) => [...prev, { speaker: 'user', text: userText }]);
          setStatus('thinking');
          return;
        }
        if (event.data.startsWith('AI: ')) {
          // Show AI text immediately — audio may arrive before or after the text,
          // so buffering causes it to never display when audio wins the race.
          setMessages((prev) => [...prev, { speaker: 'ai', text: event.data.slice(4) }]);
          return;
        }

        // JSON control messages
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'thinking') {
            setStatus(data.active ? 'thinking' : 'listening');
            // A new turn is starting → reopen the audio gate so its chunks play.
            if (data.active) acceptAudioRef.current = true;
          } else if (data.type === 'status') {
            setStatus(data.ai_speaking ? 'speaking' : 'listening');
          } else if (data.type === 'interrupted' || data.type === 'barge_in') {
            // Both mean "stop talking NOW". `interrupted` = user hit stop;
            // `barge_in` = the server's VAD detected the user speaking over the
            // AI. Flush what's queued AND close the audio gate: the cancelled
            // turn may still have WAV chunks in transit that arrive after this,
            // and without the gate they'd be re-enqueued and resume the old
            // reply. The gate reopens on the next {"type":"thinking",active:true}.
            acceptAudioRef.current = false;
            stopCurrentAudio();
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
    };

    wsRef.current = ws;
  }, [startMicrophone, stopMicrophone, enqueueAudio, stopCurrentAudio]);

  const disconnect = useCallback(() => {
    wsRef.current?.close();
    wsRef.current = null;
    stopMicrophone();
    stopCurrentAudio();
    setStatus('idle');
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

  return { isConnected, status, messages, micVolume, connect, disconnect, interrupt };
};
