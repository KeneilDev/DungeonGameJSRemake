// Game loop
export function gameLoop(update, render) {
    // Run the update and render functions in a loop
    requestAnimationFrame(() => gameLoop(update, render));
    update();
    render();
  }
  