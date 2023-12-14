import showModal from './modal';
import createElement from '../../helpers/domHelper';
import { createFighterImage } from '../fighterPreview';

export default function showWinnerModal(fighter) {
    // call showModal function

    const onClose = () => {
        window.location.reload();
    };

    const bodyElement = createElement({ tagName: 'div', className: 'modal-body' });
    const imageElement = createFighterImage(fighter);
    const infoElement = createElement({ tagName: 'h3', className: 'modal-info' });

    infoElement.innerText = `${fighter.name} is a winner!`;
    bodyElement.append(imageElement, infoElement);
    showModal({ title: "Fight's result:", bodyElement, onClose });
}
