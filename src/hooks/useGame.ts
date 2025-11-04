import { useState, useCallback, useEffect } from 'react';
import { ConnectFourGame } from '../core/game-logic.ts';
import type { GameConfig } from '../interfaces/config.interface.ts';
import type { Player } from '../interfaces/player.interface.ts';
import type { Position } from '../interfaces/board.interface.ts';
import type { GameState } from '../interfaces/game.interface.ts';
import { soundCoreService } from '../core/sound-core.ts';

export const useGame = (config: GameConfig) => {
    const [game] = useState(() => new ConnectFourGame(config));
    const [board, setBoard] = useState(game.getBoard());
    const [currentPlayer, setCurrentPlayer] = useState<Player>('player1');
    const [gameState, setGameState] = useState<GameState>('waiting');
    const [winningPositions, setWinningPositions] = useState<Position[]>([]);

    useEffect(() => {
        soundCoreService.initializeSounds(config.sound);
    }, [config.sound]);

    const makeMove = useCallback((column: number) => {
        if (gameState !== 'pending') return;

        const row = game.makeMove(column, currentPlayer);
        if (row === null) {
            soundCoreService.playSound('invalid');
            return;
        }

        // Воспроизводим звук падения фишки
        soundCoreService.playSound('drop');

        const newBoard = game.getBoard();
        setBoard([...newBoard]);

        // Check for win
        const winPositions = game.checkWin(row, column, currentPlayer);
        if (winPositions) {
            setGameState('win');
            setWinningPositions(winPositions);
            return;
        }

        // Check for draw
        if (game.isBoardFull()) {
            setGameState('draw');
            return;
        }

        // Switch player
        setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
    }, [game, currentPlayer, gameState]);

    useEffect(() => {
        switch (gameState) {
            case 'win':
                soundCoreService.playSound('win');
                break;
            case 'draw':
                soundCoreService.playSound('draw');
                break;
            default:
                break;
        }
    }, [gameState]);

    const startGame = useCallback(() => {
        game.reset();
        setBoard(game.getBoard());
        setCurrentPlayer('player1');
        setGameState('pending');
        setWinningPositions([]);
    }, [game]);

    return {
        board,
        currentPlayer,
        gameState,
        winningPositions,
        makeMove,
        startGame
    };
};
