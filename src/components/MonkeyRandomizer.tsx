import monkeyData from '../LookupLists/BDT6CamoLeadLookup.json';
import { useMapContext } from '../Context/MapContext';
import MonkeyType from '../types/MonkeyType';
import { useEffect, useMemo, useState } from 'react';
import { useSettingsContext } from '../Context/SettingsContext';

const MonkeyRandomizer: React.FC = () => {
    const {settings, setSettings} = useSettingsContext()
    const globalLeadLookup = ["Alchemist"]
    const globalCamoLookup = ["Wizard", "Mortar", "Ninja", "Sub", "Village", "Engineer", "Ice", "Mermonkey"]
    const {map} = useMapContext();
    const [selectedMonkeys, setSelectedMonkeys] = useState<MonkeyType[][]>([])
    const [selectedHeroes, setSelectedHeroes] = useState<number[]>([]); // track index of selected hero form images
    const numRandom = useMemo(() => settings.numMonkeys * settings.numPlayers,[settings.numMonkeys, settings.numPlayers])
    const images = import.meta.glob('../assets/Monkey_Images/*.webp', { eager: true, as: 'url' });
    const numMonkeys = useMemo(() => {
    return map.hasWater ? monkeyData.length  : monkeyData.length-2;
    }, [map]);
    const maxNumRandom = 5; // sets the maximum number of monkeys to randomize


      const heroImages = import.meta.glob('../assets/Hero_Images/*.webp', {
    eager: true,
    as: 'url',
  }) as Record<string, string>;
  const heroImageEntries = Object.entries(heroImages);
    function getRandomIndices(max:number, numSelected:number): number[] {
        const indices = Array.from({ length: max }, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]]; // Shuffle
        }
        return indices.slice(0, numSelected);
    }

  useEffect(() => {
    handleRandomize()
    }, [settings.numMonkeys, settings.numPlayers, settings.tierNumber]);
    
  const heroCheck = (arr:number[]) =>
  {
    if(map.hasWater) // if the map has water then any hero is fine
    {
      return true
    }
    for(let i = 0; i<arr.length; i++) // if the map does not have water
    {
      if(arr[i] === 0) // if one of the heroes is brickel
      {
        return false; // not fine
      }
    }
    return true;
  }
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
            //console.log(arr[i].name,"provides global camo")
            globalCamo = true;
        }
        if(globalLeadLookup.includes(arr[i].name))
        {
            //console.log(arr[i].name,"provides global lead")
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
  const randomCrossPath = (arr:MonkeyType[][]) =>
  {
    let result = arr
    for(let i = 0; i<result.length; i++)// for each player
    {
      let numTiers = 0
      while(numTiers < settings.tierNumber) // keep looping until all the tiers are used up
      {
        let j = Math.floor(Math.random()*settings.numMonkeys)
        let k = Math.floor(Math.random()*3)
        if(arr[i][j].paths[k] <5) // if its not maxed out
        {
          numTiers += 1
          arr[i][j].paths[k] += 1
        }
          
        
      }
    }
    return result
  }
  const handleRandomize = () =>
  {
    const randomIndicies = getRandomIndices(numMonkeys, numRandom)
    let randomHeroes = getRandomIndices(heroImageEntries.length, settings.numPlayers)
    let resultFlat: MonkeyType[] = []
    resultFlat = randomIndicies.map((i) => {
      return ({
        lead:monkeyData[i].lead,
        camo:monkeyData[i].camo,
        name:monkeyData[i].name,
        paths:[0,0,0],
      })})
    if(settings.checkPossible)
    {
      while(!monkeyCheck(resultFlat))
      {
        const randomIndicies = getRandomIndices(numMonkeys, numRandom)
        resultFlat = randomIndicies.map((i) => {
      return ({
        lead:monkeyData[i].lead,
        camo:monkeyData[i].camo,
        name:monkeyData[i].name,
        paths:[0,0,0]
      })})
      }
    }
    while(!heroCheck(randomHeroes))
    {
      randomHeroes = getRandomIndices(heroImageEntries.length, settings.numPlayers)
    }
    let result: MonkeyType[][] = [];
    for (let i = 0; i < settings.numPlayers; i++) {
      result.push(resultFlat.slice(i * settings.numMonkeys, (i + 1) * settings.numMonkeys));
    }
    result = randomCrossPath(result)
    setSelectedMonkeys(result)
    setSelectedHeroes(randomHeroes)
  }
  const handleAdjust = (add:number) =>
  {
    let newNum = settings.numMonkeys+add;
    if(0 < newNum && newNum <= maxNumRandom)
    {
        setSettings({
          ...settings,
          numMonkeys: newNum
        }
        );
    }
  }
  return (
    <div>

    <div className="flex items-center justify-center mb-4 space-x-4">
      <button
        onClick={() => handleAdjust(-1)}
        className="randomize-button "
      >
        ←
      </button>
      <span className="font-bold text-[5vh]">Monkeys: {settings.numMonkeys}</span>
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
    {selectedMonkeys.map((playerMonkeys, playerIndex) => {

    const rawName = heroImageEntries[selectedHeroes[playerIndex]][0].split('/').pop() || '';
    const cleanedName = rawName
    .replace(/[_-]?portrait\.webp$/i, '') // Remove "_portrait.webp" or "-portrait.webp" or "portrait.webp"
    .replace(/_/g, ' ')                  // Optional: replace underscores with spaces
    .trim();
    const heroUrl = heroImageEntries[selectedHeroes[playerIndex]][1]
      return (
      <div key={playerIndex} className="flex flex-col items-center gap-2">
        <h2 className="font-bold text-[2.5vh] text-center">Player {playerIndex + 1}</h2>
        <div className="flex flex-row gap-4 justify-center">
        {settings.randomHero && (
          <div key={cleanedName} className="text-center w-[20vh]">
                <img
                  src={heroUrl}
                  alt={cleanedName}
                  className="h-[20vh] w-auto mx-auto rounded"
                />
                <p className="font-bold text-[2.5vh]">{cleanedName}</p>
          </div>
        
    )}
        

          
          {playerMonkeys.map((monkey) => {
            const monkeyImageUrl = images[`../assets/Monkey_Images/${monkey.name}.webp`];
            return (
              <div key={monkey.name} className="text-center w-[20vh]">
                <img
                  src={monkeyImageUrl}
                  alt={monkey.name}
                  className="h-[20vh] w-auto mx-auto rounded"
                />
                <p className="font-bold text-[2.5vh]">{monkey.name}</p>
                {settings.generateCrosspath &&
                <p className="font-bold text-[2.5vh]">{monkey.paths[0]} {monkey.paths[1]} {monkey.paths[2]}</p>}
              </div>
            );
          })}
        </div>
      </div>
)})}
  </div>
)}

  </div>
  
  );
}
export default MonkeyRandomizer;