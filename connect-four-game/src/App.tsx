import React from 'react';
import { useGame } from './hooks/useGame';
import { GameBoard } from './components/board/board.tsx';
import { defaultConfig } from './config/config.ts';
import './App.css';
import type { PlayerConfig } from './interfaces/player.interface.ts';

const App: React.FC = () => {
    const {
        board,
        currentPlayer,
        gameState,
        winningPositions,
        makeMove,
        startGame
    } = useGame(defaultConfig);

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
            <h1>Connect Four</h1>

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
