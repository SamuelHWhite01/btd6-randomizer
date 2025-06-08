import React, { useState } from 'react';
import CheckToggle from './CheckToggle';
import PlayerSelect from './PlayerSelect';
import HeroToggle from './HeroToggle';
import CrosspathToggle from './CrosspathToggle';
import { useSettingsContext } from '../Context/SettingsContext';
import TierSelect from './TierSelect';


const CollapsibleMenu: React.FC = () => {
    const {settings} = useSettingsContext();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={`fixed top-0 left-0 h-full bg-[#2c3e50] text-[#ecf0f1] overflow-x-hidden transition-all duration-300 p-4 ${isOpen ? 'w-[200px]' : 'w-[50px]'}`}
        >
            <button
                className="bg-none border-none text-inherit text-2xl cursor-pointer outline-none mb-4"
                onClick={toggleMenu}
            >
                {isOpen ? '<' : '>'}
            </button>
            {isOpen && (
                <nav>
                    <ul className="list-none p-0">
                        <li className="my-4">
                            <CheckToggle/>
                            <CrosspathToggle/>
                            <HeroToggle/>
                            <PlayerSelect/>
                            {settings.generateCrosspath && <TierSelect/>}
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default CollapsibleMenu;