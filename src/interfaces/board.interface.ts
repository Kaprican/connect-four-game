import type { GameConfig } from './config.interface.ts';

export type BoardState = 'waiting' | 'pending' | 'win' | 'draw';
export type Position = [number, number]; // [row, column]

export interface GameBoardProps {
    board: (string | null)[][];
    onColumnClick: (column: number) => void;
    winningPositions?: Position[];
    config: GameConfig;
}
