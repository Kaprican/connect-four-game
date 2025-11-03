import { validateGame } from '../validator';
import { testConfig } from './test-config';

describe('Game Validator', () => {
    test('should validate empty game', () => {
        const result = validateGame([], testConfig);

        expect(result.step_0).toEqual({
            player1: [],
            player2: [],
            board_state: 'waiting'
        });
    });

    test('should validate winning game for player 1', () => {
        // Horizontal win for player 1
        const moves = [0, 0, 1, 1, 2, 2, 3];
        const result = validateGame(moves, testConfig);

        const lastStep = result[`step_${moves.length}`];
        expect(lastStep.board_state).toBe('win');
        expect(lastStep.winner?.who).toBe('player1');
        expect(lastStep.winner?.positions).toHaveLength(4);
    });

    test('should handle invalid moves', () => {
        expect(() => {
            validateGame([10], testConfig); // Invalid column
        }).toThrow('Invalid column: 10');
    });
});
