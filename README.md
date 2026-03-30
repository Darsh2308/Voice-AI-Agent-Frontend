# Voice AI Neural Interface

A real-time voice assistant frontend built with React, Three.js, and WebSockets. Talk to an AI naturally — your voice is captured, processed, and responded to with both speech and text, all visualized through an immersive 3D interface.

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-c4kljdlz)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture & Pipeline](#architecture--pipeline)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [How to Use the Voice Assistant](#how-to-use-the-voice-assistant)
- [WebSocket Protocol](#websocket-protocol)
- [Audio Pipeline Details](#audio-pipeline-details)
- [UI States & Visual Feedback](#ui-states--visual-feedback)
- [Component Reference](#component-reference)
- [Troubleshooting](#troubleshooting)

---

## Overview

This application is a browser-based voice interface for a real-time AI agent. It handles:

- **Microphone capture** via Web Audio API with echo cancellation and noise suppression
- **Audio streaming** over WebSocket as raw Int16 PCM chunks
- **AI audio responses** received as binary WAV data and played back automatically
- **Live transcription** of both user speech and AI responses
- **3D visual feedback** — a dynamic sphere that reacts to conversation state (listening, thinking, speaking, idle)

The backend is a WebSocket server hosted on Railway that handles speech-to-text, AI inference, and text-to-speech.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| 3D Graphics | Three.js + React Three Fiber + Drei |
| Styling | Tailwind CSS 3 + custom CSS animations |
| Icons | Lucide React |
| Audio | Web Audio API + AudioWorklet |
| Transport | WebSocket (binary + text frames) |
| Backend Host | Railway (WebSocket server) |

---

## Architecture & Pipeline

### End-to-End Flow

```
User Speaks
    │
    ▼
[Browser Microphone]
    │  MediaDevices.getUserMedia()
    │  echo cancellation + noise suppression
    ▼
[AudioWorklet: /public/audio-processor.js]
    │  converts Float32 → Int16 PCM chunks
    ▼
[WebSocket Client]  ──────────────────────────────────────────────►  [Railway Backend]
    │  sends raw audio binary frames                                       │
    │                                                                      │  Speech-to-Text
    │                                                                      │  AI Inference
    │                                                                      │  Text-to-Speech
    │                                                                      │
    │◄─────────────────────────────────────────────────────────────────────
    │  receives:
    │    • Text: "User: {transcript}"
    │    • Text: "AI: {response text}"
    │    • Text: JSON status/control messages
    │    • Binary: WAV audio of AI voice
    ▼
[useWebSocket Hook]
    │  decodes messages, buffers audio, manages ordering
    ▼
[React State]
    │  status, messages, micVolume, isConnected
    ▼
[UI Components]
    ├── ChatPanel     — conversation transcript
    ├── Controls      — mic button, interrupt button, status
    └── Sphere        — 3D animated visualization
```

### Message Ordering Logic

Messages are displayed in the order they arrive from the server. The server sends `User:` transcripts before `AI:` responses (STT completes before LLM replies), so no client-side buffering is needed. AI text is rendered immediately on receipt.

### Reconnection Strategy

On connection drop, the client retries automatically with exponential backoff:

| Retry | Delay |
|---|---|
| 1 | 1 second |
| 2 | 2 seconds |
| 3 | 4 seconds |
| 4 | 8 seconds |
| 5 | 16 seconds |

After 5 retries, the client stops and displays a connection error banner.

---

## Project Structure

```
Voice-frontend-main/
├── public/
│   └── audio-processor.js        # AudioWorklet: Float32 → Int16 conversion
├── src/
│   ├── components/
│   │   ├── ChatPanel.tsx          # Scrollable conversation transcript
│   │   ├── Controls.tsx           # Mic button, interrupt, status display
│   │   └── Sphere.tsx             # 3D animated sphere with particles & rings
│   ├── hooks/
│   │   └── useWebSocket.ts        # Core hook: WebSocket + audio pipeline
│   ├── App.tsx                    # Root component, layout, state wiring
│   ├── main.tsx                   # React entry point
│   ├── index.css                  # Tailwind + custom animations/scrollbar
│   └── vite-env.d.ts             # Vite type shims
├── .env                           # VITE_WS_URL (WebSocket endpoint)
├── index.html                     # HTML shell + Google Fonts
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── tsconfig.app.json
```

---

## Setup & Installation

### Prerequisites

- Node.js 18 or higher
- npm 9+
- A modern browser (Chrome or Edge recommended for best AudioWorklet support)

### Steps

```bash
# 1. Clone the repository
git clone <repo-url>
cd Voice-frontend-main

# 2. Install dependencies
npm install

# 3. Configure environment (see below)
# Create .env manually or copy from .env.example

# 4. Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build       # outputs to /dist
npm run preview     # preview the production build locally
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_WS_URL=wss://your-backend-host/ws
```

| Variable | Description |
|---|---|
| `VITE_WS_URL` | WebSocket endpoint of the voice AI backend. Must start with `wss://` for production or `ws://` for local dev. |

> The current default points to a Railway-hosted backend: `wss://voice-ai-agent-production-7cc2.up.railway.app/ws`

---

## How to Use the Voice Assistant

### Before You Start

1. Open the app in **Chrome or Edge** (recommended — best AudioWorklet + WebSocket support)
2. Use a **headset or earphones** if possible to prevent mic feedback
3. Ensure microphone access is allowed in your browser settings
4. A stable internet connection is required

---

### Step-by-Step Guide

#### 1. Start a Session

Click the large **microphone button** in the center-right panel.

- The browser will prompt for microphone permission on first use — click **Allow**
- The button turns orange, the sphere activates, and the status changes to **Listening**
- The navbar shows a **Live Session** indicator (pulsing green dot)

#### 2. Speak to the Assistant

Speak naturally at a normal pace — no push-to-talk needed, the session is always-on.

- The **13 waveform bars** below the sphere react in real-time to your voice — they are flat when silent and grow tall as you speak
- The **mini wave bars** in the navbar show your real-time mic volume
- When you finish speaking, pause briefly so the backend can detect end-of-speech

#### 3. Wait for a Response

After you stop speaking:

- Status changes to **Thinking** — the sphere rotates faster with a wobbling motion
- Your transcript appears in the chat panel on the left
- An **animated typing indicator** (three bouncing dots) appears in the chat panel while the AI is processing

#### 4. Hear and Read the Response

- Status changes to **Speaking** — the sphere enters a rhythmic multi-frequency animation
- The AI's voice plays through your speakers automatically
- The typing indicator disappears and the AI's response text appears in the chat panel

#### 5. Interrupt the AI

To stop the AI mid-response, click the **Zap (⚡) button** next to the mic.

- The AI stops speaking immediately
- The session returns to **Listening**
- A system message "Interrupted" appears in the chat

#### 6. End a Session

Click the microphone button again to disconnect cleanly.

---

### Tips for Best Results

| Tip | Why it Helps |
|---|---|
| Use headphones | Prevents speaker audio feeding back into the mic (echo) |
| Quiet environment | Background noise degrades transcription accuracy |
| Pause after speaking | Lets the backend detect end-of-speech reliably |
| Use Chrome or Edge | Most stable AudioWorklet and WebSocket implementations |
| Watch the sphere state | It tells you exactly what the AI is doing — wait for Listening before speaking |
| Interrupt freely | You don't need to wait for the AI to finish — redirect anytime |
| Wired internet | Streaming audio is sensitive to packet loss |
| Speak at moderate speed | Very fast speech may reduce transcription accuracy |

---

### Understanding the Visual Feedback

The 3D sphere is your real-time status indicator:

| Sphere Glow | Status | What's Happening |
|---|---|---|
| Violet | Idle | Not connected, or session ended |
| Purple | Listening | Mic is active, capturing your voice |
| Yellow | Thinking | Backend processing your request |
| Orange | Speaking | AI is generating and playing its response |

**Navbar indicators:**
- **Live Session** (pulsing green dot) — connected and active
- **Standby** — disconnected
- Mini wave bars — real-time mic volume

---

## WebSocket Protocol

### Client → Server

| Frame Type | Format | Description |
|---|---|---|
| Init | JSON text | `{ "type": "init", "sampleRate": 16000 }` sent on connect |
| Audio | Binary | Raw Int16 PCM audio chunks, mono |
| Interrupt | JSON text | `{ "type": "interrupt" }` to stop AI speech |

### Server → Client

| Frame Type | Format | Description |
|---|---|---|
| User transcript | Text | `"User: {transcript text}"` |
| AI transcript | Text | `"AI: {response text}"` |
| Status update | JSON text | `{ "type": "status", "ai_speaking": true/false }` |
| Interrupted | JSON text | `{ "type": "interrupted" }` |
| AI audio | Binary | ArrayBuffer containing WAV audio data |

---

## Audio Pipeline Details

### Microphone Capture

```
getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true } })
    └── MediaStreamSource
            └── AnalyserNode (FFT for volume visualization)
                    └── AudioWorkletNode (audio-processor.js)
                            └── postMessage(Int16Array) → WebSocket.send(binary)
```

### AI Audio Playback

```
Binary frame from WebSocket
    └── new Blob([ArrayBuffer], { type: 'audio/wav' })
            └── URL.createObjectURL(blob)
                    └── new Audio(objectURL).play()
                            └── URL.revokeObjectURL() on ended  ← memory cleanup
```

### Sample Rate

The client sends the device's native sample rate in the `init` message. The backend handles any resampling.

---

## UI States & Visual Feedback

### Sphere Behavior by State

| State | Scale | Rotation | Distortion | Rings |
|---|---|---|---|---|
| Idle | Gentle breathing | Slow | Low | Slow orbit |
| Listening | Volume-reactive | Fast | High | Fast orbit |
| Thinking | Constant wobble | Very fast | Medium | Pulsing |
| Speaking | Multi-frequency rhythm | Rhythmic | Maximum | Expanding rings |

### Chat Panel Message Types

| Bubble | Alignment | Meaning |
|---|---|---|
| Orange | Right | Your spoken words (user transcript) |
| Purple | Left | AI response text |
| Purple (animated dots) | Left | Typing indicator — AI is processing (shown during `thinking` state) |
| Gray | Center | System events (e.g., "Interrupted") |

---

## Component Reference

### `useWebSocket` hook ([src/hooks/useWebSocket.ts](src/hooks/useWebSocket.ts))

```ts
const {
  isConnected,      // boolean — WebSocket open and ready
  status,           // 'idle' | 'listening' | 'thinking' | 'speaking'
  messages,         // Message[] — full conversation history
  micVolume,        // number 0–1 — real-time mic amplitude
  connectionError,  // string | null — error message to display
  connect,          // () => void — start session
  disconnect,       // () => void — end session
  interrupt,        // () => void — stop AI mid-response
} = useWebSocket(wsUrl);
```

### `ChatPanel` ([src/components/ChatPanel.tsx](src/components/ChatPanel.tsx))

Renders the conversation transcript. Auto-scrolls to the latest message. Accepts a `status` prop — when `status === 'thinking'`, displays an animated three-dot typing indicator in an AI bubble until the response arrives.

### `Controls` ([src/components/Controls.tsx](src/components/Controls.tsx))

Renders the mic button, interrupt button (Zap icon), status label, and a 13-bar waveform visualizer. The bars are purely reactive to `micVolume` — flat (3 px, dimmed) when silent, and grow to full height in a bell-curve shape when you speak. No CSS animation fallback; the waveform only activates during the `listening` state.

### `Sphere` ([src/components/Sphere.tsx](src/components/Sphere.tsx))

Full 3D canvas built with React Three Fiber. Contains:
- `AnimatedSphere` — core distorted mesh with glow
- `OrbitRings` — two rotating torus rings
- `SpeakingRing` — expanding rings during speech state
- `Particles` — 200-particle cloud field
- `DynamicLights` — three point lights with state-dependent colors

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---|---|---|
| Microphone permission denied | Browser blocked access | Browser settings → Site Permissions → allow microphone for this site |
| Connection error banner | Backend unreachable or wrong URL | Check `VITE_WS_URL` in `.env` and verify the backend is running |
| No audio from AI | Browser autoplay policy | Click anywhere on the page before connecting; browsers require a user gesture before audio playback |
| Voice not picked up | Wrong input device selected | Check OS audio settings — set the correct mic as default |
| AudioWorklet failed | `audio-processor.js` missing | Ensure `public/audio-processor.js` exists and the dev server is running |
| Choppy AI audio | Poor network connection | Check internet stability; prefer a wired connection |
| App not working on iOS Safari | Limited AudioWorklet support | Use Chrome on desktop for full functionality |
| Messages appear out of order | Backend sending AI text before User transcript | The frontend renders messages in arrival order; ensure the backend sends `User:` before `AI:` for each turn |
