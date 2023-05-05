var canvas;
var canvasContext;

var pWarrior = new warriorClass();
var pauseMenu = new menuClass();
var enemyList = [];
var mySound;

//Gets enemy location
function getenemy() {
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            var tileKindHere = worldGrid[arrayIndex];
            var useImg = worldPics[tileKindHere];
            if (tileKindHere == 14) {
                enemyList.push(new enemyClass());
            }

            drawTileX += WORLD_W;
            arrayIndex++;
        } // end of for each col

        drawTileY += WORLD_H;
    } // end of for each row
    drawTileX = 0;
}

//When window is loaded
window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    canvasContext.scale(2, 2);
    loadImages();
    loadLevel(levelOne);
    bkdmusic = new sound("../../JsGameFiles/sounds/bkgdmusic.mp3");
    playerhitsound = new sound("../../JsGameFiles/sounds/player_hit.mp3");
    powerupHit = new sound("../../JsGameFiles/sounds/power_up.mp3");
    footstep = new sound("../../JsGameFiles/sounds/footstepwav.wav");
};

//Once images loaded in begin the game!
function imageLoadingDoneSoStartGame() {
    setTimeout(() => {
    requestAnimationFrame(imageLoadingDoneSoStartGame);
    }, 1000 / 26.5);
    //bkdmusic.play();
    setupInput();
    if(!paused){
    requestAnimationFrame(updateAll);
    }
    
}

//Function for loading different levels
function loadLevel(whichLevel) {
    isGameOver = false;
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    worldGrid = [];
    worldGrid = whichLevel.slice();
    pWarrior.reset( "Player 1");
    enemyList = [];
    getenemy();
    for (var i = 0; i < enemyList.length; i++) {
        enemyList[i].reset();
    }
}

// Constant update for game animations etc...
function updateAll() {
    
    instantCamFollow();

    moveAll();

    drawAll();
}

// Moves Everything
function moveAll() {
    pWarrior.move();

    for (var i = 0; i < enemyList.length; i++) {
        enemyList[i].move();
    }

    for (var i = 0; i < enemyList.length; i++) {
        pWarrior.collisionEnemy(enemyList[i]);
    }

}

// Draws Everything
function drawAll() {


    var background = new Image();

    background.src = "../../JsGameFiles/images/mb.jpg";

    canvasContext.drawImage(background, 0, 0);

    canvasContext.save(); // used to undo this .translate() used for scrolling

    canvasContext.translate(-camPanX, -camPanY);

    drawWorld();

    for (var i = 0; i < enemyList.length; i++) {
        enemyList[i].draw(enemyList[i].x, enemyList[i].y);
    }
    pWarrior.draw();

    canvasContext.restore();

}

//Camera code for tracking player 

function instantCamFollow() {
    camPanX = pWarrior.x - canvas.width / 4;
    camPanY = pWarrior.y - canvas.height / 4;
}

var pause = document.querySelector(".pause");
var audio = document.querySelector(".audio");

function togglePlay() {
    if (audio.paused) {
        audio.play();
        pause.innerHTML = "🔇";
    } else {
        audio.pause();
        pause.innerHTML = "🔊";
        pause.style.color = " #848484";
    }
}

function sound(src) {

    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);

    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
 
}
