// app/context/CallContext.tsx
'use client';
import React, { createContext, useContext, useState } from 'react';

interface CallContextValue {
  activeCall: boolean;
  startCall: () => void;
  endCall: () => void;
}

const CallContext = createContext<CallContextValue | undefined>(undefined);

export const CallProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeCall, setActiveCall] = useState(false);

  const startCall = () => setActiveCall(true);
  const endCall = () => setActiveCall(false);

  return (
    <CallContext.Provider value={{ activeCall, startCall, endCall }}>
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
};
