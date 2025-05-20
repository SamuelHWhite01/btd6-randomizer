import { useState } from 'react';
import { MapContext } from './MapContext.tsx';

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [map, setMap] = useState({name:"undefined", hasWater:false});

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  );
}
