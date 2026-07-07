// AudioWorkletProcessor runs on a dedicated real-time audio thread, separate
// from the main JS thread — mic capture keeps flowing smoothly even under
// main-thread load (React re-renders, animations), unlike the deprecated
// ScriptProcessorNode this replaces (see useWebSocket.ts).
//
// process() is called once per render quantum — a FIXED 128 sample-frames
// per the Web Audio spec — far smaller than the 4096-sample (~85ms @ 48kHz)
// chunks the backend's VAD silence/barge-in timing thresholds assume.
// Buffering render quanta here and only posting once a full 4096-sample
// chunk is assembled keeps the message size and cadence identical to the
// previous ScriptProcessorNode implementation — a drop-in replacement, not a
// protocol change.
const CHUNK_SIZE = 4096;

class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._buffer = new Float32Array(CHUNK_SIZE);
    this._offset = 0;
  }

  process(inputs) {
    const channel = inputs[0]?.[0];
    if (channel) {
      let read = 0;
      while (read < channel.length) {
        const take = Math.min(CHUNK_SIZE - this._offset, channel.length - read);
        this._buffer.set(channel.subarray(read, read + take), this._offset);
        this._offset += take;
        read += take;
        if (this._offset === CHUNK_SIZE) {
          // Copy out — this._buffer is reused for the next chunk immediately.
          this.port.postMessage(this._buffer.slice());
          this._offset = 0;
        }
      }
    }
    return true;
  }
}

registerProcessor('audio-processor', AudioProcessor);
