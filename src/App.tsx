import { useWebSocket } from './hooks/useWebSocket';
import { Sphere } from './components/Sphere';
import { ChatPanel } from './components/ChatPanel';
import { Controls } from './components/Controls';

function App() {
  const { isConnected, status, messages, micVolume, connect, disconnect, interrupt } =
    useWebSocket();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-tight">Voice AI</h1>
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            } animate-pulse`}
          />
          <span className="text-sm font-medium">
            {isConnected ? 'Live' : 'DisisConnected'}
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl h-[400px] mb-12">
          <Sphere status={status} micVolume={micVolume} />
        </div>

        <div className="w-full max-w-3xl space-y-6">
          <Controls
            isConnected={isConnected}
            onConnect={connect}
            onDisconnect={disconnect}
            onInterrupt={interrupt}
          />

          <ChatPanel messages={messages} />
        </div>
      </main>
    </div>
  );
}

export default App;
