import { validateGame } from './validator';
import { defaultConfig } from '../config/config';

describe('Game Validator', () => {
    test('should validate empty game', () => {
        const result = validateGame([], defaultConfig);

        expect(result.step_0).toEqual({
            player1: [],
            player2: [],
            board_state: 'waiting'
        });
    });

    test('should validate winning game for player 1', () => {
        // Horizontal win for player 1
        const moves = [0, 0, 1, 1, 2, 2, 3];
        const result = validateGame(moves, defaultConfig);

        const lastStep = result[`step_${moves.length}`];
        expect(lastStep.board_state).toBe('win');
        expect(lastStep.winner?.who).toBe('player_1');
        expect(lastStep.winner?.positions).toHaveLength(4);
    });

    test('should validate draw game', () => {
        // This would need a specific sequence that fills the board without wins
        const moves = [
            0, 1, 0, 1, 0, 1,
            2, 3, 2, 3, 2, 3,
            4, 5, 4, 5, 4, 5,
            6, 0, 6, 1, 6, 2,
            3, 4, 3, 4, 3, 4,
            5, 6, 5, 6, 5, 6
        ];

        const result = validateGame(moves, defaultConfig);
        const lastStepKey = Object.keys(result).pop()!;
        expect(result[lastStepKey].board_state).toBe('draw');
    });

    test('should handle invalid moves', () => {
        expect(() => {
            validateGame([10], defaultConfig); // Invalid column
        }).toThrow('Invalid column: 10');
    });
});
