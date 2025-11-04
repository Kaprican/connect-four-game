import './result-modal.scss';
import type { GameState } from '../../interfaces/game.interface.ts';
import { Modal } from '../modal/modal.tsx';

export function ResultModal({startFn, gameState, statusMessage}: {
    startFn: () => void;
    gameState: GameState;
    statusMessage: string
}) {
    const titleMessage: string = gameState === 'win' ? 'Congrats!' : 'So...'

    return (
        <Modal showCloseButton={false}>
            <div className="game-info">
                <h1 className="status">{titleMessage}</h1>
                <h3>{statusMessage}</h3>
                <button onClick={startFn} className="start-button">
                    Start new game
                </button>
            </div>
        </Modal>
    );
}
