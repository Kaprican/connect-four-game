import './result-modal.scss';
import type { GameState } from '../../interfaces/game.interface.ts';
import { Modal } from '../modal/modal.tsx';
import { Trans } from '@lingui/react/macro';

export function ResultModal({startFn, gameState, statusMessage}: {
    startFn: () => void;
    gameState: GameState;
    statusMessage: string
}) {
    const TitleMessage = ( { gameState }: { gameState: GameState }) => {
        return (
        <h1 className="status">
            { gameState === 'win' ? <Trans>Congrats!</Trans> : <Trans>So...</Trans> }
        </h1>
        );
    }

    return (
        <Modal showCloseButton={false}>
            <div className="game-info">
                <TitleMessage gameState={gameState}></TitleMessage>
                <h3>{statusMessage}</h3>
                <button onClick={startFn} className="start-button">
                    <Trans>Start new game</Trans>
                </button>
            </div>
        </Modal>
    );
}
