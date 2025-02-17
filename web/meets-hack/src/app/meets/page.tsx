'use client';

import { useRef } from 'react';

export default function MeetMock() {
  const meetContainerRef = useRef<HTMLDivElement>(null);

  const handleOpenPip = async () => {
    if (!('documentPictureInPicture' in window)) {
      alert('Document Picture-in-Picture API に対応していないブラウザです。');
      return;
    }

    if (!meetContainerRef.current) return;

    try {
      // PiP ウィンドウをリクエスト（オプションで初期サイズを指定）
      const pipWindow = await (
        window as any
      ).documentPictureInPicture.requestWindow({
        width: meetContainerRef.current.clientWidth,
        height: meetContainerRef.current.clientHeight,
      });

      // ※スタイルシートのコピー処理（Tailwind の場合は事前にグローバルCSSが読み込まれていれば不要な場合もあります）
      [...document.styleSheets].forEach((styleSheet) => {
        try {
          const cssRules = [...(styleSheet as CSSStyleSheet).cssRules]
            .map((rule) => rule.cssText)
            .join('');
          const style = document.createElement('style');
          style.textContent = cssRules;
          pipWindow.document.head.appendChild(style);
        } catch (e) {
          // 外部CSSの場合は link タグで追加
          if (styleSheet.href) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = styleSheet.href;
            pipWindow.document.head.appendChild(link);
          }
        }
      });

      // PiP ウィンドウにミーティング画面を移動
      pipWindow.document.body.appendChild(meetContainerRef.current);

      // PiP ウィンドウが閉じられた場合、元の画面へ戻す例
      pipWindow.addEventListener('pagehide', () => {
        const root = document.getElementById('root') || document.body;
        root.appendChild(meetContainerRef.current!);
      });
    } catch (err) {
      console.error('PiP ウィンドウのオープンに失敗しました:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* ヘッダー */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Meet Mock</h1>
        <button
          onClick={handleOpenPip}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          PiP ウィンドウを開く
        </button>
      </header>

      {/* メインミーティング画面 */}
      <main className="flex flex-grow p-4">
        <div
          ref={meetContainerRef}
          className="flex flex-col flex-grow bg-white shadow rounded p-4"
        >
          {/* 動画ストリームエリア（モック） */}
          <div className="flex flex-col flex-grow bg-gray-200 rounded mb-4 p-4">
            <div className="bg-black flex-grow flex items-center justify-center rounded">
              <p className="text-white text-lg">ビデオストリーム（モック）</p>
            </div>
          </div>

          {/* ミーティングコントロール */}
          <div className="flex justify-between items-center">
            <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded">
              退出
            </button>
            <div className="flex space-x-2">
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded">
                Mic
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded">
                Cam
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded">
                Share
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-white shadow p-4 text-center text-sm">
        Meets Mock © 2025
      </footer>
    </div>
  );
}
