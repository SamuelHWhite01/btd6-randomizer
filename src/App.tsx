import './App.css'
import MapRandomizer from './components/MapRandomizer'
import MonkeyRandomizer from './components/MonkeyRandomizer'
import { MapProvider } from './Context/MapProvider'
import { SettingsProvider } from './Context/SettingsProvider'
import CollapsibleMenu from './components/CollapsibleMenu'

function App() {
  return (
    <div className="p-4">
      <MapProvider>
        <SettingsProvider>
          <CollapsibleMenu/>
        <div className="flex flex-wrap justify-center gap-8">
          <MapRandomizer />
        </div>
        <div className="mt-8">
          <MonkeyRandomizer />
        </div>
        </SettingsProvider>
      </MapProvider>
    </div>
  );
}

export default App
