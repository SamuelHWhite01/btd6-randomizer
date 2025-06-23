import { useMemo, useState } from "react";
import { useSettingsContext } from "../Context/SettingsContext";

const PlayerSelect = () => {

  const { settings, setSettings } = useSettingsContext();
    const maxTiers = useMemo (() => 15*settings.numMonkeys,[settings.numMonkeys])
    const [tierInput, setTierInput] = useState<number|''>(settings.tierNumber)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === '')
    {
        setTierInput('')
        setSettings(prev => ({
        ...prev,
        tierNumber: 0,
        }));
    }
    else
    {
        const value = Number(Math.max(0, Math.min(maxTiers, Number(e.target.value))));
        setTierInput(value)
        setSettings(prev => ({
        ...prev,
        tierNumber: value,
        }));
    }
  };

  return (
    <div className="flex flex-col items-center space-x-2">
      <div className="font-bold text-[2vh]">Number of Tiers:</div>
      <input
        type="number"
        value={tierInput}
        onChange={handleChange}
        className="w-[8vh] h-[3vh] text-center border border-gray-300 rounded"
      />
    </div>
  );
};

export default PlayerSelect;
