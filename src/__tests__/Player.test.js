import Player from '../Player';
import Ship from '../Ship';

test('creates a player with correct type', () => {
    const player = Player('human');
    expect(player.type).toBe('human');
});

test('each player has their own gameboard', () => {
    const p1 = Player('human');
    const p2 = Player('human');
    expect(p1.gameboard).not.toBe(p2.gameboard);
});

test('attack sends receiveAttack to the enemy board', () => {
    const attacker = Player('human');
    const defender = Player('human');
    const ship = Ship(1);
    defender.gameboard.placeShip(ship, [3, 3]);
    attacker.attack(defender.gameboard, [3, 3]);
    expect(ship.isSunk()).toBe(true);
});

test('computer never attacks the same coordinate twice', () => {
    const cpu = Player('computer');
    const defender = Player('human');
    const seen = new Set();

    for (let i = 0; i < 30; i++) {
        const before = defender.gameboard.missedAttacks.length;
        cpu.computerAttack(defender.gameboard);
        const after = defender.gameboard.missedAttacks.length;
        if (after > before) {
            const last = defender.gameboard.missedAttacks[after - 1];
            const key = last.join(',');
            expect(seen.has(key)).toBe(false);
            seen.add(key);
        };
    };
});