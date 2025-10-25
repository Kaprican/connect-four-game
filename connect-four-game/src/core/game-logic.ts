import type { GameConfig } from '../interfaces/config.interface.ts';
import type { Position } from '../interfaces/board.interface.ts';
import type { Player } from '../interfaces/player.interface.ts';

export class ConnectFourGame {
    private rows: number;
    private columns: number;
    private connectLength: number;
    private board: (Player | null)[][];

    constructor(config: GameConfig) {
        this.rows = config.rows;
        this.columns = config.columns;
        this.connectLength = config.connectLength;
        this.board = this.createEmptyBoard();
    }

    private createEmptyBoard(): (Player | null)[][] {
        return Array(this.rows).fill(null).map(() => Array(this.columns).fill(null));
    }

    public makeMove(column: number, player: Player): number | null {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (!this.board[row][column]) {
                this.board[row][column] = player;
                return row;
            }
        }
        return null; // Column is full
    }

    public checkWin(row: number, col: number, player: Player): Position[] | null {
        const directions = [
            [0, 1],   // horizontal
            [1, 0],   // vertical
            [1, 1],   // diagonal /
            [1, -1]   // diagonal \
        ];

        for (const [dr, dc] of directions) {
            const positions: Position[] = [[row, col]];

            // Check positive direction
            for (let i = 1; i < this.connectLength; i++) {
                const newRow = row + dr * i;
                const newCol = col + dc * i;
                if (this.isValidPosition(newRow, newCol) && this.board[newRow][newCol] === player) {
                    positions.push([newRow, newCol]);
                } else {
                    break;
                }
            }

            // Check negative direction
            for (let i = 1; i < this.connectLength; i++) {
                const newRow = row - dr * i;
                const newCol = col - dc * i;
                if (this.isValidPosition(newRow, newCol) && this.board[newRow][newCol] === player) {
                    positions.push([newRow, newCol]);
                } else {
                    break;
                }
            }

            if (positions.length >= this.connectLength) {
                return positions.slice(0, this.connectLength);
            }
        }

        return null;
    }

    public isBoardFull(): boolean {
        return this.board.every(row => row.every(cell => cell !== null));
    }

    private isValidPosition(row: number, col: number): boolean {
        return row >= 0 && row < this.rows && col >= 0 && col < this.columns;
    }

    public getBoard(): (Player | null)[][] {
        return this.board;
    }

    public reset(): void {
        this.board = this.createEmptyBoard();
    }
}
