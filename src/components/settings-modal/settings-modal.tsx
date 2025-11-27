import './settings-modal.scss';
import { SlReload } from 'react-icons/sl';
import { SoundToggle } from '../sound-toggle/sound-toggle.tsx';
import { useCallback } from 'react';
import { Modal } from '../modal/modal.tsx';
import { loadTranslations } from '../../services/i18n.service.ts';
import { Trans } from '@lingui/react/macro';

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

    const LanguageSwitcher = () => (
        <select onChange={(e) => loadTranslations(e.target.value)}>
            <option value="en">English</option>
            <option value="ru">Русский</option>
        </select>
    );

    return (
        <Modal
            toggleModal={toggleModal}
        >
            <div className="settings-modal__wrapper">
                <div className="settings-modal__header">
                    <h1><Trans>Settings</Trans></h1>
                </div>

                <div className="settings-modal__main">
                    <LanguageSwitcher></LanguageSwitcher>
                    <button onClick={onRestartButtonClick} className="restart-button" title="Restart game">
                        <SlReload/>&nbsp;<Trans>Restart game</Trans>
                    </button>
                    <div className="sound-wrapper">
                        <Trans>Sound</Trans>:
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
