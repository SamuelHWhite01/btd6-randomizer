import monkeyData from '../LookupLists/BDT6CamoLeadLookup.json';
import { useMapContext } from '../Context/MapContext';
import MonkeyType from '../types/MonkeyType';
import { useEffect, useMemo, useState } from 'react';

const MonkeyRandomizer: React.FC = () => {
  const {map} = useMapContext();
  const [selectedMonkeys, setSelectedMonkeys] = useState<MonkeyType[]>([])
  const [numRandom, setNumRandom] = useState(3);
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
    }, [numRandom]);
    
  const monkeyCheck = (arr:MonkeyType[]) =>
  {
    let leadCheck = false
    let camoCheck = false
    let camoLeadCheck = false
    for (let i = 0; i<arr.length; i++)
    {

      let localCamo = false
      let localLead = false
      if (arr[i].lead[0][0] > -1) // will be -1 if its never true
      {
        leadCheck = true
        localLead = true
      }
      if (arr[i].camo[0][0] > -1) // will be -1 if its never true
      {
        camoCheck = true
        localCamo = true
      }
      // in the case that both lead and camo are true, then loop over the possibilites to see if theyre compatible
      if(localLead && localCamo)
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
    if(camoCheck && leadCheck && camoLeadCheck)
    {
      return true
    }
    return false;
  }
  const handleRandomize = () =>
  {
    const randomIndicies = getRandomIndices()
    let result: MonkeyType[] = []
    result = randomIndicies.map((i) => monkeyData[i])
    while(!monkeyCheck(result))
    {
      const randomIndicies = getRandomIndices()
      result = randomIndicies.map((i) => monkeyData[i])
    }
    setSelectedMonkeys(result)
  }
  const handleAdjust = (add:number) =>
  {
    let newNum = numRandom+add;
    if(0 < newNum && newNum < maxNumRandom)
    {
            setNumRandom(numRandom + add);
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
      <span className="font-bold text-[5vh]">Monkeys: {numRandom}</span>
      <button
        onClick={() => handleAdjust(1)}
        className="randomize-button"
      >
        →
      </button>
    </div>
      <button  className = {`randomize-button`}onClick={handleRandomize}> Randomize Monkeys</button>
      {selectedMonkeys.length > 0 && (
          <div className="flex flex-row gap-10 justify-center m-2">
          {selectedMonkeys.map((monkey) => {
            const monkeyImageUrl = images[`../assets/Monkey_Images/${monkey.name}.webp`];

            return (
              <div key={monkey.name} className="text-center">
                <img
                  src={monkeyImageUrl}
                  alt={monkey.name}
                  className="h-[20vh] w-auto mx-auto rounded"
                />
                <p className="font-bold text-[5vh]">{monkey.name}</p>
              </div>
            );
          })}
        </div>
      )}
  </div>
  
  );
}
export default MonkeyRandomizer;