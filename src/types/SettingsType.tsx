import monkeyData from '../LookupLists/BDT6CamoLeadLookup.json';
class SettingsType{
    checkPossible:boolean;
    banList:boolean[];
    constructor()
    {
        this.checkPossible = true;
        this.banList = Array.from({ length: monkeyData.length }, () => false); // no bans to start with
    }
}
export default SettingsType;