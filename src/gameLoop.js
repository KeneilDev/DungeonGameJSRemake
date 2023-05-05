export function gameLoop(update, render) {
  let lastTime = 0;

  function loop(timeStamp) {
    // Calculate the time elapsed since the last frame
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    // Update the game state
    update(deltaTime);

    // Render the game
    render();

    // Call the next frame
    window.requestAnimationFrame(loop);
  }

  // Start the game loop
  window.requestAnimationFrame(loop);
}
