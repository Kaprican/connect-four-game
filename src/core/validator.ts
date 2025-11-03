import { ConnectFourGame } from './game-logic.ts';
import type { GameConfig } from '../interfaces/config.interface.ts';
import type { ValidationResult } from '../interfaces/game.interface.ts';
import type { Player } from '../interfaces/player.interface.ts';

export function validateGame(moves: number[], config: GameConfig): ValidationResult {
    const game = new ConnectFourGame(config);
    const result: ValidationResult = {
        step_0: {
            player1: [],
            player2: [],
            board_state: 'waiting'
        }
    };

    let currentPlayer: Player = 'player1';
    let stepNumber = 1;

    for (const column of moves) {
        // Validate column
        if (column < 0 || column >= config.columns) {
            throw new Error(`Invalid column: ${column}`);
        }

        // Make move
        const row = game.makeMove(column, currentPlayer);

        if (row === null) {
            // Column is full, skip this move
            continue;
        }

        // Get current positions
        const player1Positions: [number, number][] = [];
        const player2Positions: [number, number][] = [];

        const board = game.getBoard();
        for (let r = 0; r < config.rows; r++) {
            for (let c = 0; c < config.columns; c++) {
                if (board[r][c] === 'player1') {
                    player1Positions.push([r, c]);
                } else if (board[r][c] === 'player2') {
                    player2Positions.push([r, c]);
                }
            }
        }

        // Check for win
        const winPositions = game.checkWin(row, column, currentPlayer);
        let boardState: 'pending' | 'win' | 'draw' = 'pending';
        let winner = undefined;

        if (winPositions) {
            boardState = 'win';
            winner = {
                who: currentPlayer,
                positions: winPositions
            };
        } else if (game.isBoardFull()) {
            boardState = 'draw';
        }

        // Record step
        result[`step_${stepNumber}`] = {
            player1: player1Positions,
            player2: player2Positions,
            board_state: boardState,
            ...(winner && { winner })
        };

        // Stop if game ended
        if (boardState === 'win' || boardState === 'draw') {
            break;
        }

        // Switch player
        currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
        stepNumber++;
    }

    return result;
}
