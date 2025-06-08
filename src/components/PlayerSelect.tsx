import { useSettingsContext } from "../Context/SettingsContext";

const PlayerSelect = () => {
  const { settings, setSettings } = useSettingsContext();

  const increment = () => {
    setSettings(prev => ({
      ...prev,
      numPlayers: Math.min(prev.numPlayers + 1, 4),
    }));
  };

  const decrement = () => {
    setSettings(prev => ({
      ...prev,
      numPlayers: Math.max(prev.numPlayers - 1, 1),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(4, Number(e.target.value)));
    setSettings(prev => ({
      ...prev,
      numPlayers: value,
    }));
  };

  return (
    <div className="flex flex-col items-center space-x-2">
      <h1 className="font-bold text-[2vh]">Number of Players:</h1>
      <div>
      <button
        onClick={decrement}
        className="px-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        -
      </button>
      <input
        type="number"
        value={settings.numPlayers}
        onChange={handleChange}
        className="w-[4vh] h-[3vh] text-center border border-gray-300 rounded"
        min={1}
        max={4}
      />
      <button
        onClick={increment}
        className="px-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        +
      </button>
      </div>
    </div>
  );
};

export default PlayerSelect;
