import { useSettingsContext } from "../Context/SettingsContext";



const CrosspathToggle = () => {
const {settings, setSettings} = useSettingsContext()
const handleChange = () => { 
    setSettings({
    ...settings,
    generateCrosspath: !settings.generateCrosspath,
  });
};
  return (
        <div > 
        <h1 className= " font-bold text-[2vh]">Generate Crosspaths?</h1>
        <input
        type="checkbox"
        name="CheckCammoLead"
        className="h-[3vh] w-[3vh] accent-[rgb(20,128,223)] mr-2 cursor-pointer"
        checked={settings.generateCrosspath}
        onChange={handleChange}
        />
        </div>
  );
};

export default CrosspathToggle;
