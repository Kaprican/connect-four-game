import React, { useState } from 'react';
import { useGame } from './hooks/useGame';
import { GameBoard } from './components/board/board.tsx';
import { defaultConfig } from './config/config.ts';
import './App.scss';
import type { PlayerConfig } from './interfaces/player.interface.ts';
import { SoundToggle } from './components/sound-toggle/sound-toggle.tsx';
import type { GameConfig } from './interfaces/config.interface.ts';

const App: React.FC = () => {
    const [config, setConfig] = useState(defaultConfig);

    const {
        board,
        currentPlayer,
        gameState,
        winningPositions,
        makeMove,
        startGame
    } = useGame(config);

    const handleSoundToggle = (enabled: boolean) => {
        setConfig((prev: GameConfig) => ({
            ...prev,
            sound: { enabled }
        }));
    };

    const getStatusMessage = () => {
        const currentPlayerConfig: PlayerConfig = defaultConfig.players[currentPlayer];

        switch (gameState) {
            case 'waiting':
                return 'Press Start to begin!';
            case 'playing':
                return `${currentPlayerConfig.name}'s turn${' ' + currentPlayerConfig?.emoji}`;
            case 'win':
                return `${currentPlayerConfig.name} wins!`;
            case 'draw':
                return "It's a draw!";
        }
    };

    return (
        <div className="app">
            <div className="header">
                <h1 className="game-title">Connect Four</h1>

                <SoundToggle
                    isEnabled={config.sound.enabled}
                    onToggle={handleSoundToggle}
                    className="header-sound-toggle"
                />
            </div>

            <div className="game-info">
                <div className="status">{getStatusMessage()}</div>
                <button onClick={startGame} className="start-button">
                    {gameState === 'waiting' ? 'Start Game' : 'Restart Game'}
                </button>
            </div>

            <GameBoard
                board={board}
                onColumnClick={makeMove}
                winningPositions={winningPositions}
                config={defaultConfig}
            />

        </div>
    );
};

export default App;
