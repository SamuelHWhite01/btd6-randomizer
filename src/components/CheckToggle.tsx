import { useSettingsContext } from "../Context/SettingsContext";



const SettingsToggle = () => {
const {settings, setSettings} = useSettingsContext()
const handleChange = () => {
    setSettings({
    ...settings,
    checkPossible: !settings.checkPossible
  });
};
  return (
        <div> 
            <h1 className= " font-bold text-[2vh]">Check to make sure its possible?</h1>
        <input
        type="checkbox"
        name="CheckCammoLead"
        className="h-[3vh] w-[3vh] accent-[rgb(20,128,223)] mr-2 cursor-pointer"
        checked={settings.checkPossible}
        onChange={handleChange}
        />
        </div>
  );
};

export default SettingsToggle;
