import { initGame } from './initGame.js';
import { gameLoop } from './gameLoop.js';
import { updateGame } from './updateGame.js';
import { renderGame } from './renderGame.js';

// Initialize the game
initGame();

// Start the game loop
gameLoop(updateGame, renderGame);