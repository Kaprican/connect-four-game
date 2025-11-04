export type SoundType = 'drop' | 'win' | 'draw' | 'invalid';

export interface SoundConfig {
    enabled: boolean;
}

export interface SoundToggleProps {
    isEnabled: boolean;
    onToggle: () => void;
    className?: string;
}
