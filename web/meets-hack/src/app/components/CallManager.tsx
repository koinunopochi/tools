// app/components/CallManager.tsx
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useCall } from '../context/CallContext';

export default function CallManager() {
  const { activeCall } = useCall();
  const pathname = usePathname();
  const popupRef = useRef<Window | null>(null);

  useEffect(() => {
    const updatePopup = () => {
      // ルーター遷移直後などのタイミングを考慮して、window.location.pathname を利用
      const currentPath = window.location.pathname;
      const mainWindowFocused = document.hasFocus();

      // 条件：
      // ・通話中（activeCall === true）
      // かつ (メインウィンドウがフォーカスされていない OR メイン画面で /call を表示していない)
      if (activeCall && (!mainWindowFocused || currentPath !== '/call')) {
        if (!popupRef.current || popupRef.current.closed) {
          popupRef.current = window.open(
            '/call',
            'CallPopup',
            'width=400,height=600,top=100,left=100'
          );
        } else {
          popupRef.current.focus();
        }
      } else {
        if (popupRef.current && !popupRef.current.closed) {
          popupRef.current.close();
          popupRef.current = null;
        }
      }
    };

    // 初回実行時、router の遷移完了まで少し待つ
    const timeoutId = setTimeout(updatePopup, 200);

    // フォーカス/ブラー、またはタブの可視状態の変化時に更新
    window.addEventListener('focus', updatePopup);
    window.addEventListener('blur', updatePopup);
    document.addEventListener('visibilitychange', updatePopup);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('focus', updatePopup);
      window.removeEventListener('blur', updatePopup);
      document.removeEventListener('visibilitychange', updatePopup);
    };
  }, [activeCall, pathname]);

  return null;
}
