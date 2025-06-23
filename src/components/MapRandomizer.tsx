import mapData from '../LookupLists/MapWaterContent.json';
import { useMapContext } from '../Context/MapContext';
import { useEffect, useState } from 'react';
import { useSettingsContext } from '../Context/SettingsContext';

const MapRandomizer: React.FC = () => {
    const images = import.meta.glob('../assets/Map_Images/*.webp', { eager: true, as: 'url' });
    const numMaps:number = mapData.length
    const {map, setMap} = useMapContext();
    const {settings} = useSettingsContext();
    const twoPlayerSplit = ["Free For All", "Vertical", "Horizontal", "Square-In-Square", "Diagonal Up", "Diagonal Down", "Circle"]
    const fourPlayerSplit = ["Free For All", "Straight Four", "Square-In-Square", "Diagonal Four", "Circle"]
    const [selectedSplit, setSelectedSpit] = useState("No Split")
    const selectedImageUrl =
    map && images[`../assets/Map_Images/${map.name}_No_UI.webp`]
      ? images[`../assets/Map_Images/${map.name}_No_UI.webp`]
      : undefined;
    useEffect(() => {
        handleRandomize();
    }, []);
    useEffect(() => {
        randomSplit();
    }, [settings.numPlayers]);
    const randomSplit = () =>
    {
        if(settings.numPlayers === 2)
        {
            let split = twoPlayerSplit[Math.floor(Math.random()*twoPlayerSplit.length)]
            setSelectedSpit(split)
        }
        if(settings.numPlayers > 2)
        {
            let split = fourPlayerSplit[Math.floor(Math.random()*fourPlayerSplit.length)]
            setSelectedSpit(split)
        }
    }
    const handleRandomize = () =>
    {
        const selectedIdx = Math.floor(Math.random()*numMaps);
        setMap(mapData[selectedIdx]);
        randomSplit()
        //console.log(selectedIdx)
    }
    return (
    <div className=' flex  m-2 flex-col items-center'>
        <button  className = {`randomize-button`}onClick={handleRandomize}> Randomize Map</button>
        {
            map.name !== "undefined" &&
            <div className='text-center'>
                <h2 className='font-bold text-[5vh]'>{map.name}</h2>
                <img src={selectedImageUrl} alt={map.name} className='  w-auto h-[20vh] rounded mx-auto'/>
                {
                settings.numPlayers>1 &&
                <div className='font-bold text-[5vh]'>
                    Map Split: {selectedSplit}
                </div>
                }
            </div>
        }
    </div>
    
    );
}
export default MapRandomizer;