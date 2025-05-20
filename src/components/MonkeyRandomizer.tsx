import { useEffect, useState } from 'react';
import lookupData from './BTD6CamoLeadLookup.json';

type Entry = {
  camo: number[][];
  lead: number[][];
};

const MonkeyRandomiser: React.FC = () => {
  const [selected, setSelected] = useState<[string, Entry][] | null>(null);

  useEffect(() => {
    // Get all entries as [key, value]
    const entries = Object.entries(lookupData) as [string, Entry][];
    
    // Shuffle function
    function shuffle<T>(array: T[]): T[] {
      return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    }

    // Shuffle and take first 2
    const randomTwo = shuffle(entries).slice(0, 2);
    setSelected(randomTwo);
  }, []);

  if (!selected) return <div>Loading...</div>;

  return (
    <div>
      <h2>Randomly Selected Entries</h2>
      {selected.map(([key, entry]) => (
        <div key={key} style={{ marginBottom: 20 }}>
          <h3>{key}</h3>
          <div><strong>Camo:</strong> {JSON.stringify(entry.camo)}</div>
          <div><strong>Lead:</strong> {JSON.stringify(entry.lead)}</div>
        </div>
      ))}
    </div>
  );
}
export default MonkeyRandomiser;