import './settings-modal.scss';
import { SlReload } from 'react-icons/sl';
import { SoundToggle } from '../sound-toggle/sound-toggle.tsx';
import { useCallback } from 'react';
import { Modal } from '../modal/modal.tsx';

export function SettingsModal(
    {startGame, handleSoundToggle, isSoundEnabled, toggleModal}
    : {
        startGame: () => void,
        handleSoundToggle: () => void,
        isSoundEnabled: boolean,
        toggleModal: () => void
    }) {
    const onRestartButtonClick = useCallback(() => {
        startGame();
        toggleModal();
    }, [startGame, toggleModal]);

    return (
        <Modal
            toggleModal={toggleModal}
        >
            <div className="settings-modal__wrapper">
                <div className="settings-modal__header">
                    <h1>Settings</h1>
                </div>

                <div className="settings-modal__main">
                    <button onClick={onRestartButtonClick} className="restart-button" title="Restart game">
                        <SlReload/> Restart game
                    </button>
                    <div className="sound-wrapper">
                        Sound:
                        <SoundToggle
                            isEnabled={isSoundEnabled}
                            onToggle={handleSoundToggle}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}
