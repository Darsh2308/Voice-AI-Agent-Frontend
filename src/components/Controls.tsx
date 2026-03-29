import { Mic, MicOff, Zap } from 'lucide-react';

type ControlsProps = {
  connected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onInterrupt: () => void;
};

export function Controls({
  connected,
  onConnect,
  onDisconnect,
  onInterrupt,
}: ControlsProps) {
  return (
    <div className="flex items-center justify-center gap-6 mb-6">
      <button
        onClick={connected ? onDisconnect : onConnect}
        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all transform hover:scale-110 ${
          connected
            ? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/50'
            : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/50'
        }`}
      >
        {connected ? (
          <MicOff className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
      </button>

      {connected && (
        <button
          onClick={onInterrupt}
          className="px-6 py-3 rounded-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-yellow-600/50"
        >
          <Zap className="w-5 h-5" />
          Interrupt
        </button>
      )}
    </div>
  );
}
