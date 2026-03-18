# Battleship

## Build order

```
Ship -> Gameboard -> Player -> Game -> DOM
```

Write tests first for the first 3. Game and DOM don't need tests.

## Ship

```
state:      length, hits (private)
hit()       ->  hits++
isSunk()    ->  hits >= length
```

## Gameboard

```
state:  board[10][10]   (null | Ship ref)
        missedAttacks[]
        ships[]

placeShip(ship, [row, col], dir)    -> Validate -> write to board -> push to ships[]
receiveAttack([row, col])           -> hit: ship.hit() | miss:
missedAttack.push()                 
allSunk()                           -> ships.every(s => s.isSunk())
```

## Player

```
state:  type ('human' | 'computer')
        gameboard   (created internally)
        attacked    Set of "row, col" strings (cpu only)

attack(enemyBoard, coord)   -> enemyBoard.receiveAttack(coord)
computerAttack(enemyBoard)  -> pick random unseen coord -> attack
```

## Game (controller)
```
state:  human, computer (Players)
        currentPlayer
        isGameOver

handleAttack(coord) -> human attacks cpu board
                    -> checkWin? -> end
                    -> cpu attacks human board
                    -> checkWin -> end
                    -> tell DOM to re-render
```

## DOM

```
renders     both boards, hits/misses, win message
listens     cell click -> game.handleAttack([row, col])
            new game button -> game.startGame()
```