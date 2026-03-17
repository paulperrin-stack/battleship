import Game from './Game';
import DOM from './DOM';
import './styles.css';

const game = Game();
game.setupBoards();

const dom = DOM(game);
game.registerUpdateCallback(dom.render);

dom.render();