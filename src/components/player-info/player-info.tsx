import { defaultConfig } from '../../config/config.ts';
import type { PlayerConfig } from '../../interfaces/player.interface.ts';
import { useGame } from '../../hooks/useGame.ts';


export function PlayerInfo() {
    const {
        currentPlayer,
        gameState,
        startGame
    } = useGame(defaultConfig);

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

    return (
        <>
            <div className="game-info">
                <div className="status">{getStatusMessage()}</div>
                <button onClick={startGame} className="start-button">
                    {gameState === 'waiting' ? 'Start Game' : 'Restart Game'}
                </button>
            </div>

            <div className="player-info">
                <div className="player">
                    <div
                        className="player-color"
                        style={{backgroundColor: defaultConfig.players.player1.color}}
                    />
                    <span>{defaultConfig.players.player1.name}</span>
                </div>
                <div className="player">
                    <div
                        className="player-color"
                        style={{backgroundColor: defaultConfig.players.player2.color}}
                    />
                    <span>{defaultConfig.players.player2.name}</span>
                </div>
            </div>
        </>

    )
}
