import React, { useState } from 'react';
import type { GameBoardProps } from '../../interfaces/board.interface.ts';
import './board.scss'


export const GameBoard: React.FC<GameBoardProps> = ({
                                                        board,
                                                        onColumnClick,
                                                        winningPositions = []
                                                    }) => {
    const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

    const isWinningPosition = (row: number, col: number) => {
        return winningPositions.some(pos => pos[0] === row && pos[1] === col);
    };

    return (
        <div className="game-board">
            {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <div
                        className={`cell-wrapper ${hoveredColumn === colIndex ? 'column-hover' : ''}`}
                        onMouseEnter={() => setHoveredColumn(colIndex)}
                        onMouseLeave={() => setHoveredColumn(null)}
                    >
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`cell ${cell || 'cell__empty'} ${isWinningPosition(rowIndex, colIndex) ? 'cell__winning' : ''}`}
                            onClick={() => onColumnClick(colIndex)}
                        />
                    </div>
                ))
            )}
        </div>
    );
};
