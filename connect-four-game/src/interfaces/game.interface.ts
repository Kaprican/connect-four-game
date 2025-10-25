import type { BoardState, Position } from './board.interface.ts';
import type { Player } from './player.interface.ts';

export interface ValidationResult {
    [step: string]: GameStep;
}

export interface GameStep {
    player1: Position[];
    player2: Position[];
    board_state: BoardState;
    winner?: {
        who: Player;
        positions: Position[];
    };
}

export interface GameSession {
    id: string;
    moves: number[];
    config: any;
    result?: ValidationResult;
}
