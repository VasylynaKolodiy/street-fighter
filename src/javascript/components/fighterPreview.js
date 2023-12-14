import createElement from '../helpers/domHelper';

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    if (fighter) {
        const infoElement = createElement({
            tagName: 'div',
            className: 'fighter-preview___info'
        });

        const nameElement = createElement({
            tagName: 'h2',
            className: 'fighter-preview___name'
        });
        nameElement.textContent = `${fighter.name}`;

        const textElement = createElement({
            tagName: 'p',
            className: 'fighter-preview___text'
        });
        textElement.innerHTML = `Attack: ${fighter.attack} | Defense: ${fighter.defense} | Health: ${fighter.health}`;

        const imageElement = createElement({
            tagName: 'div',
            className: 'fighter-preview___image'
        });

        infoElement.append(nameElement, textElement);
        imageElement.append(createFighterImage(fighter));
        fighterElement.append(infoElement, imageElement);
    }
    return fighterElement;
}
