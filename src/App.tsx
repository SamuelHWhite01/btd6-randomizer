import './App.css'
import HeroRandomizer from './components/HeroRandomizer'
import MapRandomizer from './components/MapRandomizer'
import MonkeyRandomizer from './components/MonkeyRandomizer'
import { MapProvider } from './Context/MapProvider'

function App() {
  return (
    <div className="p-4">
      <MapProvider>
        <div className="flex flex-wrap justify-center gap-8">
          <MapRandomizer />
          <HeroRandomizer />
        </div>
        <div className="mt-8">
          <MonkeyRandomizer />
        </div>
      </MapProvider>
    </div>
  );
}

export default App
