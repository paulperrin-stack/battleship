import Gameboard from './Gameboard';

const Player = (type = 'human') => {
    const gameboard = Gameboard();
    const attacked = new Set();
    
    const attack = (enemyBoard, coord) => {
        enemyBoard.receiveAttack(coord);
    };

    const computerAttack = (enemyBoard) => {
        let row, col, key;
        do {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
            key = `${row},${col}`;
        } while (attacked.has(key));
        
        attacked.add(key);
        enemyBoard.receiveAttack([row, col]);
    };

    return { type, gameboard, attack, computerAttack };
};

export default Player;