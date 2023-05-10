const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_P = 80;

let mouseX = 0;
let mouseY = 0;
let paused = false;

function togglePause() {
  paused = !paused;
  if (paused) {
    pauseMenu.drawMenu();
  }
}

function setupInput() {
  canvas.addEventListener('mousemove', updateMousePos);
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
  pWarrior.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);

  window.addEventListener('keydown', function (e) {
    if (e.keyCode === KEY_P) {
      togglePause();
    }
  });
}

function updateMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;
}

function keySet(keyEvent, setTo) {
  if (keyEvent.keyCode === pWarrior.controlKeyLeft) {
    pWarrior.keyHeld_West = setTo;
  }
  if (keyEvent.keyCode === pWarrior.controlKeyRight) {
    pWarrior.keyHeld_East = setTo;
  }
  if (keyEvent.keyCode === pWarrior.controlKeyUp) {
    pWarrior.keyHeld_North = setTo;
  }
  if (keyEvent.keyCode === pWarrior.controlKeyDown) {
    pWarrior.keyHeld_South = setTo;
  }
}

function keyPressed(evt) {
  keySet(evt, true);
  evt.preventDefault();
}

function keyReleased(evt) {
  keySet(evt, false);
}
