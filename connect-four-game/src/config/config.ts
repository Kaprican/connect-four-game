import type { GameConfig } from '../interfaces/config.interface.ts';

export const defaultConfig: GameConfig = {
    rows: 6,
    columns: 7,
    connectLength: 4,
    players: {
        player1: {
            name: "Player 1",
            color: "#f44336",
            emoji: "🔴",
        },
        player2: {
            name: "Player 2",
            color: "#2196f3",
            emoji: "🔵",
        }
    },
    animations: {
        dropDuration: 400,
        winHighlightDuration: 1000
    }
};
