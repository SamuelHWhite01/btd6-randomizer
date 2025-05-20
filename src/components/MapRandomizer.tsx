import mapData from '../LookupLists/MapWaterContent.json';
import { useMapContext } from '../Context/MapContext';
import { useEffect } from 'react';

const MapRandomizer: React.FC = () => {
    const images = import.meta.glob('../assets/Map_Images/*.webp', { eager: true, as: 'url' });
    const numMaps:number = mapData.length
    const {map, setMap} = useMapContext();
    const selectedImageUrl =
    map && images[`../assets/Map_Images/${map.name}_No_UI.webp`]
      ? images[`../assets/Map_Images/${map.name}_No_UI.webp`]
      : undefined;
    useEffect(() => {
        handleRandomize();
    }, []);
    const handleRandomize = () =>
    {
        const selectedIdx = Math.floor(Math.random()*numMaps);
        setMap(mapData[selectedIdx]);
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
            </div>
        }
    </div>
    
    );
}
export default MapRandomizer;