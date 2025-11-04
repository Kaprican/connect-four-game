import type { GameConfig } from './config.interface.ts';

export type Position = [number, number]; // [row, column]

export interface GameBoardProps {
    board: (string | null)[][];
    onColumnClick: (column: number) => void;
    winningPositions?: Position[];
    config?: GameConfig;
}
