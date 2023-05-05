import init from './init.js';
import core from './core.js';
import player from './player.js';

// Initialize the game canvas and event listeners
init();

// Start the game loop
core.start();

// Handle player input and collisions with other game objects
player.init();