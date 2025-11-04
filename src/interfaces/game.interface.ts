import type { Position } from './board.interface.ts';
import type { Player } from './player.interface.ts';

export type GameState = 'waiting' | 'pending' | 'win' | 'draw';

export interface ValidationResult {
    [step: string]: GameStep;
}

export interface GameStep {
    player_1: Position[];
    player_2: Position[];
    board_state: GameState;
    winner?: {
        who: Player;
        positions: Position[];
    };
}

export interface GameSession {
    id: string;
    moves: number[];
    config?: string;
    result?: ValidationResult;
}
