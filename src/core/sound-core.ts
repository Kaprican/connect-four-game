import type { SoundType, SoundConfig } from '../interfaces/sound.interface.ts';

export class SoundCoreService {

    config: SoundConfig = { enabled: true };
    soundsDictionary: Partial<Record<SoundType, HTMLAudioElement>> = {};

    public initializeSounds(config: SoundConfig): void {
        this.config = config;

        const soundFiles: Record<SoundType, string> = {
            drop: '/sounds/drop.mp3',
            win: '/sounds/win.mp3',
            draw: '/sounds/draw.mp3',
            invalid: '/sounds/invalid.mp3'
        };

        Object.entries(soundFiles).forEach(([type, src]) => {
            const audio = new Audio(src);
            audio.volume = 0.5;
            audio.preload = 'auto';
            this.soundsDictionary[type as SoundType] = audio;
        });
    }

    public playSound(type: SoundType): void {
        if (!this.config?.enabled) return;

        try {
            const audio = this.soundsDictionary[type];
            if (audio) {
                audio.currentTime = 0; // Перематываем в начало
                audio.volume = 0.5;
                audio.play().catch(error => {
                    console.warn('Failed to play sound: ', error);
                });
            }
        } catch (error) {
            console.warn('Sound playback error:', error);
        }
    }
}

// Singleton
export const soundCoreService = new SoundCoreService();
