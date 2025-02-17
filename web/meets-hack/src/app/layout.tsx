// app/layout.tsx
import './globals.css';
import { CallProvider } from './context/CallContext';
import CallManager from './components/CallManager';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <CallProvider>
          {children}
          <CallManager />
        </CallProvider>
      </body>
    </html>
  );
}
