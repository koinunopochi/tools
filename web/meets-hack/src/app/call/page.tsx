// app/call/page.tsx
'use client';

import { useCall } from '../context/CallContext';
import { useRouter } from 'next/navigation';

export default function CallPage() {
  const { endCall } = useCall();
  const router = useRouter();

  const handleEndCall = () => {
    endCall();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">通話中</h1>
      <p className="mb-4">
        この画面はメイン画面またはポップアップで表示されます。
      </p>
      <button
        onClick={handleEndCall}
        className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
      >
        通話終了
      </button>
    </div>
  );
}
