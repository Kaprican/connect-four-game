import '@testing-library/jest-dom';

// Mock для Web Audio API
Object.defineProperty(window, 'AudioContext', {
    value: jest.fn().mockImplementation(() => ({
        createBuffer: jest.fn(),
        createBufferSource: jest.fn(),
        createGain: jest.fn(),
        createOscillator: jest.fn(),
        createBiquadFilter: jest.fn(),
        destination: jest.fn(),
    }))
});

// Mock для Audio
window.Audio = jest.fn().mockImplementation(() => ({
    play: jest.fn().mockResolvedValue(undefined),
    pause: jest.fn(),
    volume: 0,
    currentTime: 0,
    preload: '',
}));
