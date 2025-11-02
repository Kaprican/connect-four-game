import React from 'react';
import './sound-toggle.scss';
import { SlVolumeOff, SlVolume2 } from "react-icons/sl";

interface SoundToggleProps {
    isEnabled: boolean;
    onToggle: (enabled: boolean) => void;
    className?: string;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({
                                                            isEnabled,
                                                            onToggle,
                                                            className = ''
                                                        }) => {
    const handleClick = () => {
        onToggle(!isEnabled);
    };

    return (
        <button
            className={`sound-toggle ${isEnabled ? 'sound-toggle--on' : 'sound-toggle--off'} ${className}`}
            onClick={handleClick}
            aria-label={isEnabled ? 'Enable' : 'Disable'}
            title={isEnabled ? 'Enable' : 'Disable'}
        >
            <div className="sound-toggle-icon">
                {isEnabled ? <SlVolume2 /> : <SlVolumeOff />}
            </div>
        </button>
    );
};
