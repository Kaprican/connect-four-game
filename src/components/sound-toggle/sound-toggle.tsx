import React from 'react';
import './sound-toggle.scss';
import { SlVolumeOff, SlVolume2 } from "react-icons/sl";
import type { SoundToggleProps } from '../../interfaces/sound.interface.ts';

export const SoundToggle: React.FC<SoundToggleProps> = ({ isEnabled, onToggle }: SoundToggleProps) => {
    return (
        <button
            className={`sound-toggle ${isEnabled ? 'sound-toggle--on' : 'sound-toggle--off'}`}
            onClick={onToggle}
            aria-label={isEnabled ? 'Enable' : 'Disable'}
            title={isEnabled ? 'Enable' : 'Disable'}
        >
            <div className="sound-toggle-icon">
                {isEnabled ? <SlVolume2/> : <SlVolumeOff/>}
            </div>
        </button>
    );
};
