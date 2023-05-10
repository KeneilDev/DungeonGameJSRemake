import { handleInput } from './input';
import { render } from './render';
import { levels } from './levels';
import { menu } from './menu';

export function initGame() {
  // Initialize game state
  const gameState = {
    currentLevel: 0,
    levels,
    menu,
  };

  // Bind input event listeners
  handleInput();

  // Render the initial game state
  render(gameState);
}
