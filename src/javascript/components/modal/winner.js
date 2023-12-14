import showModal from './modal';
import { createFighterImage } from '../fighterPreview';

export default function showWinnerModal(fighter) {
    // call showModal function

    const onClose = () => {
        window.location.reload();
    };

    const bodyElement = createFighterImage(fighter);

    showModal({ title: `${fighter.name} is a winner!`, bodyElement, onClose });
}
