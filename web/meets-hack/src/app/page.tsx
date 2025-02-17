// app/page.tsx
'use client';

import { useCall } from './context/CallContext';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { startCall } = useCall();
  const router = useRouter();

  const handleStartCall = () => {
    startCall();
    // 通話開始時にメインウィンドウで /call に遷移
    router.push('/call');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">メイン画面</h1>
      <button
        onClick={handleStartCall}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        通話開始
      </button>
    </div>
  );
}
