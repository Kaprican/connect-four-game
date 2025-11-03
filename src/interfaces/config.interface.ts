import type { Players } from './player.interface.ts';
import type { SoundConfig } from './sound.interface.ts';

export interface GameConfig {
    rows: number;
    columns: number;
    connectLength: number;
    players: Players;
    animations: {
        dropDuration: number;
        winHighlightDuration: number;
    };
    sound: SoundConfig;
}
