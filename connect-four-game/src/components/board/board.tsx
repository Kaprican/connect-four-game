import React from 'react';
import type { GameBoardProps } from '../../interfaces/board.interface.ts';
import './board.scss'


export const GameBoard: React.FC<GameBoardProps> = ({
                                                        board,
                                                        onColumnClick,
                                                        winningPositions = [],
                                                        config
                                                    }) => {
    const isWinningPosition = (row: number, col: number) => {
        return winningPositions.some(pos => pos[0] === row && pos[1] === col);
    };

    return (
        <div className="game-board" style={{
            gridTemplateColumns: `repeat(${config.columns}, 60px)`,
        }}>
            {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`cell ${cell || 'cell__empty'} ${isWinningPosition(rowIndex, colIndex) ? 'cell__winning' : ''}`}
                        onClick={() => onColumnClick(colIndex)}
                    />
                ))
            )}
        </div>
    );
};
