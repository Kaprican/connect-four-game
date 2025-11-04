import { validator } from '../validator';
import { testConfig } from './test-config';

describe('Game Validator', () => {
    test('should validate empty game', () => {
        const result = validator([], testConfig);

        expect(result.step_0).toEqual({
            player_1: [],
            player_2: [],
            board_state: 'waiting'
        });
    });

    test('should validate winning game for player 1', () => {
        // Horizontal win for player 1
        const moves = [0, 0, 1, 1, 2, 2, 3];
        const result = validator(moves, testConfig);

        const lastStep = result[`step_${moves.length}`];
        expect(lastStep.board_state).toBe('win');
        expect(lastStep.winner?.who).toBe('player_1');
        expect(lastStep.winner?.positions).toHaveLength(4);
    });

    test('should handle invalid moves', () => {
        expect(() => {
            validator([10], testConfig); // Invalid column
        }).toThrow('Invalid column: 10');
    });

    test('should validate winning game for player 1 test from tz', () => {
        const moves = [0, 1, 1, 2, 4, 2, 2, 3, 5, 3, 4, 3, 3];
        const result = validator(moves, testConfig);

        const player_1_moves = JSON.stringify([
            [5, 0],
            [4, 1],
            [3, 2],
            [2, 3],
            [5, 4],
            [4, 4],
            [5, 5]
        ].sort());

        const lastStep = result[`step_${moves.length}`];
        const player_1_moves_from_result = JSON.stringify([...lastStep.player_1].sort());

        expect(lastStep.board_state).toBe('win');
        expect(lastStep.winner?.who).toBe('player_1');
        expect(lastStep.player_1).toHaveLength(7);
        expect(player_1_moves_from_result).toEqual(player_1_moves);
        expect(lastStep.player_2).toHaveLength(6);
    });
});
