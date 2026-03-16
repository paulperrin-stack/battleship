const Gameboard = () => {
  const board = Array.from({ length: 10 }, () => Array(10).fill(null));
  const missedAttacks = [];
  const ships = [];

  const placeShip = (ship, [row, col], direction = 'horizontal') => {
    const cells = [];

    for (let i = 0; i < ship.length; i++) {
      const r = direction === 'vertical' ? row + i : row;
      const c = direction === 'horizontal' ? col + i : col;
      if (r > 9 || c > 9 || r < 0 || c < 0) {
        throw new Error('Ship out of bounds');
      }
      if (board[r][c] !== null) {
        throw new Error('Cell already occupied');
      }
      cells.push([r, c]);
    }

    cells.forEach(([r, c]) => { board[r][c] = ship; });
    ships.push(ship);
  };

  const receiveAttack = ([row, col]) => {
    const target = board[row][col];
    if (target !== null) {
        target.hit();
    } else {
        missedAttacks.push([row, col]);
    }
  };

  const allSunk = () => ships.every((ship) => ship.isSunk());

  return { board, missedAttacks, placeShip, receiveAttack, allSunk };
};

export default Gameboard;