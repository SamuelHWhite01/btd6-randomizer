import { createContext, useContext } from 'react';
import MapType from '../types/MapType';

export const MapContext = createContext<
  | {
      map: MapType;
      setMap: React.Dispatch<React.SetStateAction<MapType>>;
    }
  | undefined
>(undefined);

export function useMapContext() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
}
