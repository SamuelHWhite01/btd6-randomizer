import { useState } from 'react';
import { SettingsContext } from './SettingsContext.tsx';

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState({checkPossible:true});

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
