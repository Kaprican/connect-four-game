import { ConnectFourGame } from './game-logic';
import type { GameConfig } from '../interfaces/config.interface.ts';
import type { GameState, ValidationResult } from '../interfaces/game.interface.ts';
import type { Player } from '../interfaces/player.interface.ts';


export function validator(moves: number[], config: GameConfig): ValidationResult {
    const game = new ConnectFourGame(config);
    const result: ValidationResult = {
        step_0: {
            player_1: [],
            player_2: [],
            board_state: 'waiting'
        }
    };

    let currentPlayer: Player = 'player_1';
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
        const player_1Positions: [number, number][] = [];
        const player_2Positions: [number, number][] = [];

        const board = game.getBoard();
        for (let r = 0; r < config.rows; r++) {
            for (let c = 0; c < config.columns; c++) {
                if (board[r][c] === 'player_1') {
                    player_1Positions.push([r, c]);
                } else if (board[r][c] === 'player_2') {
                    player_2Positions.push([r, c]);
                }
            }
        }

        // Check for win
        const winPositions = game.checkWin(row, column, currentPlayer);
        let boardState: GameState = 'pending';
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
            player_1: player_1Positions,
            player_2: player_2Positions,
            board_state: boardState,
            ...(winner && { winner })
        };

        // Stop if game ended
        if (boardState === 'win' || boardState === 'draw') {
            break;
        }

        // Switch player
        currentPlayer = currentPlayer === 'player_1' ? 'player_2' : 'player_1';
        stepNumber++;
    }

    return result;
}
