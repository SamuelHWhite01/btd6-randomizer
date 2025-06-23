import { useSettingsContext } from "../Context/SettingsContext";



const CheckToggle = () => {
const {settings, setSettings} = useSettingsContext()
const handleChange = () => {
    setSettings({
    ...settings,
    checkPossible: !settings.checkPossible,
    generateCrosspath:false
  });
};
  return (
        <div> 
            <h1 className= " font-bold text-[2vh]">Check Camo/Lead?</h1>
        <input
        type="checkbox"
        name="CheckCammoLead"
        className="h-[3vh] w-[3vh] accent-green-600 mr-2 cursor-pointer"
        checked={settings?.checkPossible ?? true}
        onChange={handleChange}
        />
        </div>
  );
};

export default CheckToggle;
