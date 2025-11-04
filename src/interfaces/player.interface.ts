export type Player = 'player_1' | 'player_2';

export interface PlayerConfig {
    name: string;
    color: string;
    emoji?: string,
}

export type Players = {
    [key in Player]: PlayerConfig;
};
