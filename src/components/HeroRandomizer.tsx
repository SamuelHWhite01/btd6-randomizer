import { useState } from 'react';

const HeroRandomizer: React.FC = () => {
  const images = import.meta.glob('../assets/Hero_Images/*.webp', {
    eager: true,
    as: 'url',
  }) as Record<string, string>;

  const imageEntries = Object.entries(images);
  const [selected, setSelected] = useState(() => {
    const index = Math.floor(Math.random() * imageEntries.length);
    return imageEntries[index];
  });

  const handleRandomize = () => {
    const index = Math.floor(Math.random() * imageEntries.length);
    setSelected(imageEntries[index]);
  };

  // Extract just the filename, remove "portrait.webp" and optional underscore or dash before it
  const rawName = selected[0].split('/').pop() || '';
  const cleanedName = rawName
    .replace(/[_-]?portrait\.webp$/i, '') // Remove "_portrait.webp" or "-portrait.webp" or "portrait.webp"
    .replace(/_/g, ' ')                  // Optional: replace underscores with spaces
    .trim();

  return (
    <div className="text-center m-2">
      <button
        onClick={handleRandomize}
        className="randomize-button"
      >
        Randomize Hero
      </button>
      <div>
        <h2 className="font-bold text-[5vh]">{cleanedName}</h2>
        <img src={selected[1]} alt={cleanedName} className="h-[20vh] w-auto mx-auto rounded" />
      </div>
    </div>
  );
};

export default HeroRandomizer;
