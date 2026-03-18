# Battleship

A browser-based Battleship game built with vanilla JavaScript using Test Driven Development (TDD). Part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-battleship) JavaScript curriculum.

**[Play it live](https://paulperrin-stack.github.io/battleship/)**

---

## How to play

- Click any cell on the **Enemy Waters** board to fire a shot
- A red marker means you hit a ship — a blue dot means you missed
- The computer fires back automatically after your shot
- Sink all 5 enemy ships before the computer sinks yours to win
- Click **New Game** at any time to reset

---

## Built with

- Vanilla JavaScript (ES6 modules, factory functions)
- Webpack + webpack-dev-server
- Jest + Babel for TDD
- ESLint for code quality
- CSS Grid for the game boards
- GitHub Pages for deployment

---

## Architecture

The project is split into five modules, each with a single responsibility:

| Module | Responsibility |
|---|---|
| `Ship` | Tracks length, hits and sunk state |
| `Gameboard` | 10×10 grid, places ships, receives attacks, tracks misses |
| `Player` | Owns a Gameboard — human attacks by coordinate, computer picks randomly |
| `Game` | Orchestrates two players, manages turns and win condition |
| `DOM` | Renders boards, handles clicks — the only module that touches the DOM |

---

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Start dev server at localhost:8080
npm run dev

# Lint all source files
npm run lint

# Deploy to GitHub Pages
npm run deploy
```

---

## Testing

18 tests across three test suites, written TDD — tests were written before implementation.

```
PASS  src/__tests__/Ship.test.js
PASS  src/__tests__/Gameboard.test.js
PASS  src/__tests__/Player.test.js

Test Suites: 3 passed, 3 total
Tests:       18 passed, 18 total
```

---

## What I learned

- Test Driven Development — writing failing tests first, then making them pass
- Factory functions and closures for private state in JavaScript
- Separating concerns — keeping game logic completely out of the DOM
- Webpack module bundling and dev server setup
- Deploying a static site with GitHub Pages