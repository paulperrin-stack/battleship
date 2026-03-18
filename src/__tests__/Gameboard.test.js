import Gameboard from '../Gameboard';
import Ship from '../Ship';

test('places a ship horizontally on the board', () => {
    const gb = Gameboard();
    const ship = Ship(3);
    gb.placeShip(ship, [0, 0], 'horizontal');
    expect(gb.board[0][0]).toBe(ship);
    expect(gb.board[0][1]).toBe(ship);
    expect(gb.board[0][2]).toBe(ship);
});

test('places a ship vertically on the board', () => {
    const gb = Gameboard();
    const ship = Ship(3);
    gb.placeShip(ship, [0, 0], 'vertical');
    expect(gb.board[0][0]).toBe(ship);
    expect(gb.board[1][0]).toBe(ship);
    expect(gb.board[2][0]).toBe(ship);
});

test('throws if ship is placed out of bounds', () => {
    const gb = Gameboard();
    expect(() => gb.placeShip(Ship(4), [0, 8], 'horizontal')).toThrow();
});

test('throws if ships overlap', () => {
    const gb = Gameboard();
    gb.placeShip(Ship(3), [0, 0], 'horizontal');
    expect(() => gb.placeShip(Ship(3), [0, 2], 'horizontal')).toThrow();
});

test('records a miss when attacking empty water', () => {
    const gb = Gameboard();
    gb.receiveAttack([5, 5]);
    expect(gb.missedAttacks).toContainEqual([5, 5]);
});

test('calls hit on the ship when attack lands', () => {
    const gb = Gameboard();
    const ship = Ship(3);
    gb.placeShip(ship, [2, 2], 'horizontal');
    gb.receiveAttack([2, 3]);
    expect(ship.isSunk()).toBe(false);
});

test('sinks ship when all cells are hit', () => {
    const gb = Gameboard();
    const ship = Ship(2);
    gb.placeShip(ship, [0, 0], 'horizontal');
    gb.receiveAttack([0, 0]);
    gb.receiveAttack([0, 1]);
    expect(ship.isSunk()).toBe(true);
});

test('allSunk returns false when not all ships are sunk', () => {
    const gb = Gameboard();
    gb.placeShip(Ship(2), [0, 0], 'horizontal');
    gb.placeShip(Ship(1), [5, 5]);
    gb.receiveAttack([0, 0]);
    gb.receiveAttack([0, 1]);
    expect(gb.allSunk()).toBe(false);
});

test('allSunk returns true when all ships are sunk', () => {
    const gb = Gameboard();
    const s1 = Ship(1);
    const s2 = Ship(1);
    gb.placeShip(s1, [0, 0]);
    gb.placeShip(s2, [9, 9]);
    gb.receiveAttack([0, 0]);
    gb.receiveAttack([9, 9]);
    expect(gb.allSunk()).toBe(true);
});