export type Player = 'player1' | 'player2';

export interface PlayerConfig {
    name: string;
    color: string;
    emoji?: string,
}

export type Players = {
    [key in Player]: PlayerConfig;
};
