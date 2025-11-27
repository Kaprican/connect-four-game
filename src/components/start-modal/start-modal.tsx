import './start-modal.scss';
import { Modal } from '../modal/modal.tsx';
import { useState } from 'react';
import { Trans } from '@lingui/react/macro';

export function StartModal({startFn}: { startFn: () => void }) {
    const [isRulesVisible, setIsRulesVisibility] = useState(false);
    const toggleRulesVisibility = () => setIsRulesVisibility((v) => !v);

    return (
        <Modal showCloseButton={false}>
            <div className="game-info">

                <h1><Trans>Hi, pal</Trans></h1>
                <div className="subtitle"><Trans>This is a connect four game</Trans></div>

                <div className="rules_wrapper">
                    <div className="rules_header" onClick={toggleRulesVisibility}>
                        {isRulesVisible ? <Trans>Close the rules</Trans> : <Trans>Game rules here</Trans>}
                    </div>
                    {isRulesVisible &&
                        <div className="rules_body">
                            <ul className="rules_body_list">
                                <li><Trans>You have 7x6 grid</Trans></li>
                                <li><Trans>Your goal to get four of their discs in a row — horizontally, vertically, or
                                    diagonally</Trans>
                                </li>
                                <li><Trans>Players drop the discs into the grid, starting in the middle or at the edge to stack
                                    their colored discs</Trans>
                                </li>
                                <li><Trans>When a player drops a disc, it falls to the lowest available space in that column</Trans>
                                </li>
                                <li><Trans>Use strategy to block opponents while aiming to be the first player to get 4 in a
                                    row to win.</Trans>
                                </li>
                            </ul>
                        </div>
                    }
                </div>

                <div>
                    <Trans>If you're ready, so, grab your lad and have a nice time together</Trans>
                </div>
                <span onClick={startFn} className="start-button honk-font">
                    <Trans>Start</Trans>
                </span>
            </div>
        </Modal>
    );
}
