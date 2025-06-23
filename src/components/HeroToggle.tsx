import { useSettingsContext } from "../Context/SettingsContext";



const HeroToggle = () => {
const {settings, setSettings} = useSettingsContext()
const handleChange = () => {
    setSettings({
    ...settings,
    randomHero: !settings.randomHero
  });
};
  return (
        <div> 
            <h1 className= " font-bold text-[2vh]">Random Hero?</h1>
        <input
        type="checkbox"
        name="randomHero"
        className="h-[3vh] w-[3vh] accent-[rgb(20,128,223)] mr-2 cursor-pointer"
        checked={settings.randomHero}
        onChange={handleChange}
        />
        </div>
  );
};

export default HeroToggle;
