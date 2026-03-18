import Player from './Player';
import Ship from './Ship';

const Game = () => {
    const human = Player('human');
    const computer = Player('computer');

    let isGameOver = false;
    let winner = null;

    const SHIP_LENGTHS = [5, 4, 3, 3, 2];

    const placeShipsRandomly = (gameboard) => {
        SHIP_LENGTHS.forEach((len) => {
            let placed = false;
            while (!placed) {
                try {
                    const row = Math.floor(Math.random() * 10);
                    const col = Math.floor(Math.random() * 10);
                    const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
                    gameboard.placeShip(Ship(len), [row, col], direction);
                    placed = true;
                } catch {
                    // overlap or out of bounds - try again
                }
            }
        });
    };

    const setupBoards = () => {
        placeShipsRandomly(human.gameboard);
        placeShipsRandomly(computer.gameboard);
    };

    let onUpdate = () => {};

    const handleAttack = (coord) => {
        if (isGameOver) return;

        human.attack(computer.gameboard, coord);

        if (computer.gameboard.allSunk()) {
            isGameOver = true;
            winner = 'human';
            onUpdate();
            return;
        }

        setTimeout(() => {
            computer.computerAttack(human.gameboard);

            if (human.gameboard.allSunk()) {
                isGameOver = true;
                winner = 'computer';
            }

            onUpdate();
        }, 400);
    };

    const registerUpdateCallback = (cb) => {
        onUpdate = cb;
    };

    return {
        human, 
        computer, 
        get isGameOver() { return isGameOver },
        get winner() { return winner}, 
        setupBoards,
        handleAttack,
        registerUpdateCallback,
    };
};

export default Game;