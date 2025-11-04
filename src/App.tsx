import React, { useCallback, useEffect, useState } from 'react';
import { useGame } from './hooks/useGame.ts';
import { GameBoard } from './components/board/board.tsx';
import { defaultConfig } from './config/config.ts';
import './App.scss';
import type { PlayerConfig } from './interfaces/player.interface.ts';
import type { GameConfig } from './interfaces/config.interface.ts';
import Confetti from 'react-confetti';
import { StartModal } from './components/start-modal/start-modal.tsx';
import { SlSettings } from "react-icons/sl";
import { SettingsModal } from './components/settings-modal/settings-modal.tsx';
import { ResultModal } from './components/result-modal/result-modal.tsx';

const App: React.FC = () => {
    const [config, setConfig] = useState(defaultConfig);
    const [isStartModalOpen, toggleStartModal] = useState(true);
    const [isSettingsModalOpen, setSettingsModalState] = useState(false);

    const toggleSettingsModal = useCallback(() => setSettingsModalState((v) => !v), []);

    const {
        board,
        currentPlayer,
        gameState,
        winningPositions,
        makeMove,
        startGame
    } = useGame(config);

    const handleSoundToggle = () => {
        setConfig((prev: GameConfig) => ({
            ...prev,
            sound: { enabled: !prev.sound.enabled }
        }));
    };

    const getStatusMessage = () => {
        const currentPlayerConfig: PlayerConfig = defaultConfig.players[currentPlayer];

        switch (gameState) {
            case 'waiting':
                return 'Press Start to begin!';
            case 'pending':
                return `${currentPlayerConfig.name}'s turn${' ' + currentPlayerConfig?.emoji}`;
            case 'win':
                return `${currentPlayerConfig.name} wins!`;
            case 'draw':
                return "It's a draw!";
        }
    };

    const onStartButtonClick = () => {
        toggleStartModal(false);
        startGame();
    }

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && gameState === 'pending') {
                toggleSettingsModal();
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [gameState]);

    return (
        <div className="app">
            { isStartModalOpen && (
                <StartModal startFn={onStartButtonClick}></StartModal>
            )}

            { isSettingsModalOpen && (
                <SettingsModal
                    startGame={startGame}
                    toggleModal={toggleSettingsModal}
                    handleSoundToggle={handleSoundToggle}
                    isSoundEnabled={config.sound.enabled}
                ></SettingsModal>
            )}

            { gameState === 'win' ? <Confetti/> : '' }

            {
                gameState === 'win' || gameState === 'draw' ?
                    <ResultModal
                        startFn={startGame}
                        gameState={gameState}
                        statusMessage={getStatusMessage()}
                    ></ResultModal> :
                    ''
            }

            <div className="header">
                <h1 className="game-title">Connect Four</h1>
                <SlSettings onClick={toggleSettingsModal} className="settings-button" title="Settings"/>
            </div>

            <div className="game-info">
                <div className="status">{getStatusMessage()}</div>
            </div>

            <GameBoard
                board={board}
                onColumnClick={makeMove}
                winningPositions={winningPositions}
            />

        </div>
    );
};

export default App;
