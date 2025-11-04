import './modal.scss';
import type { ReactNode } from 'react';
import { SlClose } from 'react-icons/sl';

export function Modal({children, showCloseButton = true, toggleModal}: {
    children: ReactNode;
    showCloseButton?: boolean;
    toggleModal?: () => void
}) {
    return (
        <div className="overlay">
            <div className="modal">
                {showCloseButton &&
                    <SlClose className="close-button" onClick={toggleModal}/>
                }
                <main className="modal-main-wrapper">{children}</main>
            </div>
        </div>
    );
}
