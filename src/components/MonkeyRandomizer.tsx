import monkeyData from '../LookupLists/BDT6CamoLeadLookup.json';
import { useMapContext } from '../Context/MapContext';
import MonkeyType from '../types/MonkeyType';
import { useEffect, useMemo, useState } from 'react';
import { useSettingsContext } from '../Context/SettingsContext';

const MonkeyRandomizer: React.FC = () => {
    const {settings} = useSettingsContext()
    const globalLeadLookup = ["Alchemist"]
    const globalCamoLookup = ["Wizard", "Mortar", "Ninja", "Sub", "Village", "Engineer", "Ice", "Mermonkey"]
    const {map} = useMapContext();
    const [selectedMonkeys, setSelectedMonkeys] = useState<MonkeyType[][]>([])
    const [numRandomPlayer, setNumRandomPlayer] = useState(3);
    const numRandom = useMemo(() => numRandomPlayer * settings.numPlayers,[numRandomPlayer, settings.numPlayers])
    const images = import.meta.glob('../assets/Monkey_Images/*.webp', { eager: true, as: 'url' });
    const numMonkeys = useMemo(() => {
    return map.hasWater ? monkeyData.length  : monkeyData.length-2;
    }, [map]);
    const maxNumRandom = 7; // sets the maximum number of monkeys to randomize
    function getRandomIndices(): number[] {
        const indices = Array.from({ length: numMonkeys }, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]]; // Shuffle
        }
        return indices.slice(0, numRandom);
    }

  useEffect(() => {
    handleRandomize()
    }, [numRandomPlayer, settings.numPlayers]);
    
  const monkeyCheck = (arr:MonkeyType[]) =>
  {
    let camoLeadCheck = false
    let globalLead = false
    let globalCamo = false
    for (let i = 0; i<arr.length; i++)
    {
        let localCamo = false
        let localLead = false
        if(globalCamoLookup.includes(arr[i].name))
        {
            console.log(arr[i].name,"provides global camo")
            globalCamo = true;
        }
        if(globalLeadLookup.includes(arr[i].name))
        {
            console.log(arr[i].name,"provides global lead")
            globalLead = true;
        }
        if (arr[i].lead[0][0] > -1) // will be -1 if its never true
        {
            localLead = true
        }
        if (arr[i].camo[0][0] > -1) // will be -1 if its never true
        {
            localCamo = true
        }
        // in the case that both lead and camo are true, then loop over the possibilites to see if theyre compatible
        if((localLead||globalLead) && (localCamo||globalCamo))
        {
            for(let j = 0; j<arr[i].lead.length; j++)
            {
            if (arr[i].lead[j][1] < 3)
            {
                camoLeadCheck = true
            }
            }
            for(let j = 0; j<arr[i].camo.length; j++)
            {
            if (arr[i].lead[j][1] < 3)
            {
                camoLeadCheck = true
            }
            }
        }
    }
    if(camoLeadCheck)
    {
      return true
    }
    return false;
  }
  const handleRandomize = () =>
  {
    const randomIndicies = getRandomIndices()
    let resultFlat: MonkeyType[] = []
    resultFlat = randomIndicies.map((i) => monkeyData[i])
    if(settings.checkPossible)
    {
      while(!monkeyCheck(resultFlat))
      {
        const randomIndicies = getRandomIndices()
        resultFlat = randomIndicies.map((i) => monkeyData[i])
      }
    }
    const result: MonkeyType[][] = [];
    for (let i = 0; i < settings.numPlayers; i++) {
      result.push(resultFlat.slice(i * numRandomPlayer, (i + 1) * numRandomPlayer));
    }
    setSelectedMonkeys(result)
  }
  const handleAdjust = (add:number) =>
  {
    let newNum = numRandomPlayer+add;
    if(0 < newNum && newNum < maxNumRandom)
    {
            setNumRandomPlayer(numRandomPlayer + add);
    }
  }
  return (
    <div>

    <div className="flex items-center justify-center mb-4 space-x-4">
      <button
        onClick={() => handleAdjust(-1)}
        className="randomize-button"
      >
        ←
      </button>
      <span className="font-bold text-[5vh]">Monkeys: {numRandomPlayer}</span>
      <button
        onClick={() => handleAdjust(1)}
        className="randomize-button"
      >
        →
      </button>
    </div>
      <button  className = {`randomize-button`}onClick={handleRandomize}> Randomize Monkeys</button>
    {selectedMonkeys.length > 0 && (
  <div className="flex flex-col gap-10 justify-center m-2">
    {selectedMonkeys.map((playerMonkeys, playerIndex) => (
      <div key={playerIndex} className="flex flex-col items-center gap-2">
        <h2 className="font-bold text-[2.5vh] text-center">Player {playerIndex + 1}</h2>
        <div className="flex flex-row gap-4 justify-center">
          {playerMonkeys.map((monkey) => {
            const monkeyImageUrl = images[`../assets/Monkey_Images/${monkey.name}.webp`];
            return (
              <div key={monkey.name} className="text-center">
                <img
                  src={monkeyImageUrl}
                  alt={monkey.name}
                  className="h-[20vh] w-auto mx-auto rounded"
                />
                <p className="font-bold text-[2.5vh]">{monkey.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
)}

  </div>
  
  );
}
export default MonkeyRandomizer;