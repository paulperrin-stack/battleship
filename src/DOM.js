import Game from './Game';

const DOM = (game) => {
    const humanBoardE1 = document.getElementById('human-board');
    const cupBoardE1 = document.getElementById('cpu-board');
    const messageE1 = document.getElementById('message');
    const newGameBtn = document.getElementById('new-game-btn');

    const renderBoard = (gameboard, containerE1, isEnemy = false) => {
        containerE1.innerHTML = '';

        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');

                const ship = gameboard.board[row][col];
                const isMiss = gameboard.missedAttacks.some(
                    ([r, c]) => r === row && c === col
                );
                const isHit = ship && gameboard.attackedCoords && 
                    gameboard.attackedCoords.has(`${row},${col}`);

                if (!isEnemy && ship) cell.classList.add('ship');
                if (isMiss) cell.classList.add('miss');
                if (isHit) cell.classList.add('hit');

                if (isEnemy && !isMiss && !isHit && !game.isGameOver) {
                    cell.classList.add('clickable');
                    cell.addEventListener('click', () => {
                        game.handleAttack([row, col]);
                    });
                }

                containerE1.appendChild(cell);
            }
        }
    };

    const render = () => {
        renderBoard(game.human.gameboard, humanBoardE1, false);
        renderBoard(game.computer.gameboard, cupBoardE1, true);

        if (game.isGameOver) {
            messageE1.textContent = game.winner === 'human'
                ? 'You win!'
                : 'Computer wins!';
        } else {
            messageE1.textContent = 'Your turn - click an enemy cell.';
        }
    };

    newGameBtn.addEventListener('click', () => {
        game = Game();
        game.setupBoards();
        game.registerUpdateCallback(render);
        render();
    });

    return { render };
};

export default DOM;