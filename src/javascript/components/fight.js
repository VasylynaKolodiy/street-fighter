import controls from '../../constants/controls';

export function getHitPower({ attack }) {
    // return hit power
    const criticalHitChance = Math.random() + 1;
    return attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    // return block power
    const dodgeChance = Math.random() + 1;
    return fighter.defense * dodgeChance;
}

export function getDamage(attacker, defender) {
    // return damage
    return Math.max(getHitPower(attacker) - getBlockPower(defender), 0);
}

export async function fight(firstFighter, secondFighter) {
    const pressedKeys = new Map();
    let firstFighterSuperHit = true;
    let secondFighterSuperHit = true;

    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
        const firstFighterIndicator = document.getElementById('left-fighter-indicator');
        const secondFighterIndicator = document.getElementById('right-fighter-indicator');
        let firstFighterHealth = firstFighter.health;
        let secondFighterHealth = secondFighter.health;
        const firstFighterCoefficient = 100 / firstFighterHealth;
        const secondFighterCoefficient = 100 / secondFighterHealth;

        const keyUp = e => pressedKeys.delete(e.code);
        const keyDown = e => {
            pressedKeys.set(e.code, true);

            if (pressedKeys.has(controls.PlayerOneAttack) && !pressedKeys.has(controls.PlayerOneBlock)) {
                const damage = pressedKeys.has(controls.PlayerTwoBlock)
                    ? getDamage(firstFighter, secondFighter)
                    : getHitPower(firstFighter);
                secondFighterHealth -= damage;
                secondFighterIndicator.style.width = `${Math.max(secondFighterHealth * secondFighterCoefficient, 0)}%`;
            }
            if (pressedKeys.has(controls.PlayerTwoAttack) && !pressedKeys.has(controls.PlayerTwoBlock)) {
                const damage = pressedKeys.has(controls.PlayerOneBlock)
                    ? getDamage(secondFighter, firstFighter)
                    : getHitPower(secondFighter);
                firstFighterHealth -= damage;
                firstFighterIndicator.style.width = `${Math.max(firstFighterHealth * firstFighterCoefficient, 0)}%`;
            }
            if (firstFighterSuperHit && controls.PlayerOneCriticalHitCombination.every(item => pressedKeys.has(item))) {
                firstFighterSuperHit = false;
                setTimeout(() => {
                    firstFighterSuperHit = true;
                }, 10000);
                const damage = firstFighter.attack * 2;
                secondFighterHealth -= damage;
                secondFighterIndicator.style.width = `${Math.max(secondFighterHealth * secondFighterCoefficient, 0)}%`;
            }
            if (
                secondFighterSuperHit &&
                controls.PlayerTwoCriticalHitCombination.every(item => pressedKeys.has(item))
            ) {
                secondFighterSuperHit = false;
                setTimeout(() => {
                    secondFighterSuperHit = true;
                }, 10000);
                const damage = secondFighter.attack * 2;
                firstFighterHealth -= damage;
                firstFighterIndicator.style.width = `${Math.max(firstFighterHealth * firstFighterCoefficient, 0)}%`;
            }

            if (firstFighterHealth <= 0 || secondFighterHealth <= 0) {
                document.removeEventListener('keydown', keyDown);
                document.removeEventListener('keyup', keyUp);
                resolve(secondFighterHealth <= 0 ? firstFighter : secondFighter);
            }
        };

        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);
    });
}
