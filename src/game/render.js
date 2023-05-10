import { drawText, colorRect, colorCircle } from '../utils/helperFunctions';

export function render(gameState) {
  // Render game elements based on game state
  // This is just an example, you'll need to update this to render your game
  drawText('Score: 0', 10, 10, 'left', 'white', '14px Arial');
  colorRect(10, 50, 100, 100, 'red');
  colorCircle(60, 60, 30, 'blue');

  // Render level and menu elements
  renderLevel(gameState);
  renderMenu(gameState);
}

function renderLevel(gameState) {
  // Render the current level based on game state
}

function renderMenu(gameState) {
  // Render the menu based on game state
}
