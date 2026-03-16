import Ship from '../Ship';

test('has the correct length', () => {
  const ship = Ship(4);
  expect(ship.length).toBe(4);
});

test('is not sunk when first created', () => {
    const ship = Ship(3);
    expect(ship.isSunk()).toBe(false);
});

test('a single hit does not sink a length-3 ship', () => {
    const ship = Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
});

test('hitting is exactly as many times as its length sinks it', () => {
    const ship = Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});

test('a length-1 ship sinks after one hit', () => {
    const ship = Ship(1);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})