const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_P = 80;

var mouseX = 0;
var mouseY = 0;
var paused = false;

function togglePause(){
    if (!paused){
        paused = true;
        pauseMenu.drawMenu();
    }
    else if (paused){
        paused = false;
    }
}

function setupInput() {
	canvas.addEventListener('mousemove', updateMousePos);
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
    pWarrior.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);

    window.addEventListener('keydown', function (e) {
        var key = e.keyCode;
        if (key === 80) // p key
        {
            togglePause();
        }
    });
    
} 



function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

}

function keySet(keyEvent, setTo) {
	if(keyEvent.keyCode == pWarrior.controlKeyLeft) {
		pWarrior.keyHeld_West = setTo;
	}
	if(keyEvent.keyCode == pWarrior.controlKeyRight) {
		pWarrior.keyHeld_East = setTo;
	}
	if(keyEvent.keyCode == pWarrior.controlKeyUp) {
		pWarrior.keyHeld_North = setTo;
	}
	if(keyEvent.keyCode == pWarrior.controlKeyDown) {
		pWarrior.keyHeld_South = setTo;
	}
}

function keyPressed(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, true);

	evt.preventDefault();
}

function keyReleased(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, false);
}