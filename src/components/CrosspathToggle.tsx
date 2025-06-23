import { useSettingsContext } from "../Context/SettingsContext";



const CrosspathToggle = () => {
const {settings, setSettings} = useSettingsContext()
const handleChange = () => { 
    setSettings({
    ...settings,
    generateCrosspath: !settings.generateCrosspath,
    checkPossible: false
  });
};
  return (
        <div > 
        <h1 className= " font-bold text-[2vh]">Generate Crosspaths?</h1>
        <input
        type="checkbox"
        name="CheckCammoLead"
        className="h-[3vh] w-[3vh] accent-green-600 mr-2 cursor-pointer"
        checked={settings.generateCrosspath}
        onChange={handleChange}
        />
        </div>
  );
};

export default CrosspathToggle;
