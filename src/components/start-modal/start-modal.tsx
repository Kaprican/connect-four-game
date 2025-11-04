import './start-modal.scss';
import { Modal } from '../modal/modal.tsx';
import { useState } from 'react';

export function StartModal({startFn}: { startFn: () => void }) {
    const [isRulesVisible, setIsRulesVisibility] = useState(false);
    const toggleRulesVisibility = () => setIsRulesVisibility((v) => !v);

    return (
        <Modal showCloseButton={false}>
            <div className="game-info">

                <h1>Hi, pal</h1>
                <div className="subtitle">This is a connect four game</div>

                <div className="rules_wrapper">
                    <div className="rules_header" onClick={toggleRulesVisibility}>
                        {isRulesVisible ? "Close the rules" : "Game rules here"}
                    </div>
                    {isRulesVisible &&
                        <div className="rules_body">
                            <ul className="rules_body_list">
                                <li>You have 7x6 grid</li>
                                <li>Your goal to get four of their discs in a row — horizontally, vertically, or
                                    diagonally
                                </li>
                                <li>Players drop the discs into the grid, starting in the middle or at the edge to stack
                                    their colored discs
                                </li>
                                <li>When a player drops a disc, it falls to the lowest available space in that column
                                </li>
                                <li>Use strategy to block opponents while aiming to be the first player to get 4 in a
                                    row to win.
                                </li>
                            </ul>
                        </div>
                    }
                </div>

                <div>
                    If you're ready, so, grab your lad and have a nice time together
                </div>
                <span onClick={startFn} className="start-button honk-font">
                    Start
                </span>
            </div>
        </Modal>
    );
}
