var ENEMY_MOVE_SPEED = 0.1;

function enemyClass() {


  this.x = -999;
  this.y = -999;
  this.width = WORLD_W / 2;
  this.height = WORLD_H / 2;

  var speedY = 3;

  this.move = function() {
    this.y += speedY;

    var mapCol = Math.floor(this.x / WORLD_W);
    var mapRow = Math.floor(this.y / WORLD_H);
    var indexUnderEnemy = rowColToArrayIndex(mapCol, mapRow);

    //Walk into wall code
    var walkIntoTileIndex = getTileIndexAtPixelCoord(this.x, this.y);
    var walkIntoTileType = TILE_WALL_MID;

    if (walkIntoTileIndex != undefined) {
      walkIntoTileType = worldGrid[walkIntoTileIndex];
    }

    switch (walkIntoTileType) {
      case TILE_GROUND:
        break;
      case TILE_WALL_MID:
        speedY *= -1;
        break;
        case TILE_WALL_2:
        speedY *= -1;
        break;
      case TILE_DOOR_CLOSED:
        speedY *= -1;
        break;

      default:
        break;
    }
  };

  this.reset = function() {
    for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
      for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
        var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
        if (worldGrid[arrayIndex] == TILE_ENEMYSTART) {
          worldGrid[arrayIndex] = TILE_GROUND;
          this.x = eachCol * WORLD_W + WORLD_W / 2;
          this.y = eachRow * WORLD_H + WORLD_H / 2;
          return;
        } // end of enemy start if
      } // end of col for
    } // end of row for
    console.log("NO ENEMY START FOUND!");
  }; // end of enemy reset function

    
    
    
  // Draw Enemy Functionality
  this.draw = function(x, y) {
    this.x = x;
    this.y = y;

    this.animate();

  };

  this.image = new Image();
    this.image.src = "../../JsGameFiles/images/knight_run.png";
    this.image.src = "../../JsGameFiles/images/fly_anim.png";
    

  this.scale = 1.5;
  this.currFrameX = 1;
  this.currFrameY = 1;

    this.imagewidth = 16;
    this.imageheight = 16;
  this.scaledWidth = this.scale * this.width;
  this.scaledHeight = this.scale * this.height;

    this.drawFrame = function (frameX, frameY, canvasX, canvasY) {
        canvasContext.drawImage(
            this.image,
            frameX * this.imageheight,
            frameY * this.imagewidth,
            this.imagewidth,
            this.imageheight,
            this.x - 16,
            this.y - 16,
            this.scaledWidth,
            this.scaledHeight
        );
    };

  this.cycleLoop = [0,1,2,3];
  this.currentLoopIndex = 0;
  this.frameCount = 0;

  this.animate = function() {
    this.frameCount++;


    this.drawFrame(this.cycleLoop[this.currentLoopIndex], 0, 0, 0);

    this.currentLoopIndex++;

    if (this.currentLoopIndex >= this.cycleLoop.length) {
      this.currentLoopIndex = 0;
    }  
  };
}

function drawBitmapCenteredWithRotation(useBitmap, atX,atY, withAng) {
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();

}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, 10, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}

function drawHeart(fromx, fromy, tox, toy,lw,hlen,color) {

  var x = fromx;
  var y = fromy;
  var width = lw ;
  var height = hlen;

  canvasContext.save();
  canvasContext.beginPath();
  var topCurveHeight = height * 0.3;
  canvasContext.moveTo(x, y + topCurveHeight);
  // top left curve
  canvasContext.bezierCurveTo(
    x, y, 
    x - width / 2, y, 
    x - width / 2, y + topCurveHeight
  );

  // bottom left curve
  canvasContext.bezierCurveTo(
    x - width / 2, y + (height + topCurveHeight) / 2, 
    x, y + (height + topCurveHeight) / 2, 
    x, y + height
  );

  // bottom right curve
  canvasContext.bezierCurveTo(
    x, y + (height + topCurveHeight) / 2, 
    x + width / 2, y + (height + topCurveHeight) / 2, 
    x + width / 2, y + topCurveHeight
  );

  // top right curve
  canvasContext.bezierCurveTo(
    x + width / 2, y, 
    x, y, 
    x, y + topCurveHeight
  );

  canvasContext.closePath();
  canvasContext.fillStyle = color;
  canvasContext.fill();
  canvasContext.restore();

}

var warriorPic = document.createElement("img");
var enemyPic = document.createElement("img");
var worldPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	console.log(picsToLoad);
	if(picsToLoad == 0) {
		imageLoadingDoneSoStartGame()
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "../../JSGameFiles/images/" + fileName;
}

function loadImageForWorldCode(worldCode, fileName) {
	worldPics[worldCode] = document.createElement("img");
	beginLoadingImage(worldPics[worldCode], fileName);
}

function loadImages() {
	var imageList = [
		{varName: warriorPic, theFile: "knight_run.png"},
        {worldType: TILE_ENEMYSTART, theFile: "fly_anim.png"},
        {worldType: TILE_BLANK, theFile: "blank.png"},
		{worldType: TILE_WALL_MID, theFile: "wall_1.png"},
		{worldType: TILE_WALL_2, theFile: "wall_2.png"},
		{worldType: TILE_GROUND, theFile: "floor_1.png"},
		{worldType: TILE_GOAL, theFile: "stairs.png"},
        {worldType: TILE_CHEST, theFile: "chest_full.png"},
		{worldType: TILE_KEY, theFile: "key_silver.png"},
        {worldType: TILE_POTION, theFile: "potion_yellow.png"},
        {worldType: TILE_DOOR_OPEN, theFile: "door_fullyopen.png"},
        {worldType: TILE_DOOR_CLOSED, theFile: "door_closed.png"}

		];

	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile);
		}
	}
}

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

function menuClass(){
    
    this.x;
    this.y;
    this.width = 600;
    this.height = 600;
    
    this.drawMenu = function () {
        canvasContext.globalAlpha = 0.5;
        colorRect(1,1,this.width,this.height, "#9DBAF2");
         colorText("MENU", width/2, height/2, "white");
    }
}

const PLAYER_MOVE_SPEED = 3.5;



function warriorClass() {
    this.x;
    this.y;
    this.width = (WORLD_W / 2) - 300;
    this.height = (WORLD_H / 2) - 300;
    this.myWarriorPic; // which picture to use
    this.health = 100;
    this.healthColor = "red";
    this.invincible = false;
    this.hit = false;

    this.image = new Image();
    this.image.src = "../../JsGameFiles/images/knight_run.png";
    this.name = "Player 1";
    this.keysHeld = 0;

    this.keyHeld_North = false;
    this.keyHeld_South = false;
    this.keyHeld_West = false;
    this.keyHeld_East = false;
    this.levelsComplete = 0;
    this.levelname = "Epilogue";



    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;

    this.setupInput = function (upKey, rightKey, downKey, leftKey) {
        this.controlKeyUp = KEY_UP_ARROW;
        this.controlKeyRight = KEY_RIGHT_ARROW;
        this.controlKeyDown = KEY_DOWN_ARROW;
        this.controlKeyLeft = KEY_LEFT_ARROW;
    };

    this.reset = function (whichImage, warriorName) {
        this.name = warriorName;
        this.myWarriorPic = whichImage;
        this.keysHeld = 0;

        for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
            for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
                if (worldGrid[arrayIndex] == TILE_PLAYERSTART) {
                    worldGrid[arrayIndex] = TILE_GROUND;
                    this.x = eachCol * WORLD_W + WORLD_W / 2;
                    this.y = eachRow * WORLD_H + WORLD_H / 2;
                    return;
                } // end of player start if
            } // end of col for
        } // end of row for
        console.log("NO PLAYER START FOUND!");
    }; // end of warriorReset func

    this.move = function () {
        var nextX = this.x;
        var nextY = this.y;

        if (this.keyHeld_North) {
            nextY -= PLAYER_MOVE_SPEED;
            footstep.play();
        }
        if (this.keyHeld_East) {
            footstep.play();

            nextX += PLAYER_MOVE_SPEED;
            if (this.invincible == true) {
                this.image.src = "../../JsGameFiles/images/knight_gold.png";
            } else {
                this.image.src = "../../JsGameFiles/images/knight_run.png";
            }

        }
        if (this.keyHeld_South) {
            nextY += PLAYER_MOVE_SPEED;
            footstep.play();

        }
        if (this.keyHeld_West) {
            if (this.invincible == true) {
                this.image.src = "../../JsGameFiles/images/knight_gold_left.png";
            } else {
                this.image.src = "../../JsGameFiles/images/knight_run_left.png";
            }

            nextX -= PLAYER_MOVE_SPEED;
            footstep.play();

        }

        var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX - 2, nextY - 2);
        var walkIntoTileType = TILE_WALL_MID;

        if (walkIntoTileIndex != undefined) {
            walkIntoTileType = worldGrid[walkIntoTileIndex];
        }

        switch (walkIntoTileType) {
            case TILE_GROUND:
                this.x = nextX;
                this.y = nextY;

                break;
            case TILE_GOAL:
                this.health = 100;
                this.keysHeld = 0;
                this.levelsComplete++;
                this.nextLevel();
                break;

            case TILE_CHEST:
                this.levelsComplete = 0;
                gameComplete();
                break;
            case TILE_DOOR_CLOSED:
                if (this.keysHeld > 0) {
                    this.keysHeld--; // one less key
                    worldGrid[walkIntoTileIndex] = TILE_DOOR_OPEN;
                }
                break;

            case TILE_POTION:
                if (this.invincible == false) {
                    this.invincible = true;
                    worldGrid[walkIntoTileIndex] = TILE_GROUND;
                    setTimeout(() => {
                        this.invincible = false;
                    }, 7000);
                }
                break;

            case TILE_KEY:
                this.keysHeld++; // one more key
                worldGrid[walkIntoTileIndex] = TILE_GROUND;


                break;
            case TILE_WALL_MID:
                break;
            case TILE_WALL_MID:
                break;

            case TILE_DOOR_OPEN:
                this.x = nextX;
                this.y = nextY;
                break;
        }
    };

    this.drawhealthbar = function () {
        //Health Bar Variables
        var healthX = this.x - 8;
        var healthY = this.y - 23;
        var healthWidth = 10;

        if (this.invincible == true) {
            this.healthColor = "gold";
        }

        if (this.health == 100) {
            this.healthColor = "green";
            drawHeart(
                camPanX + 230,
                camPanY + 5,
                camPanX + 22,
                camPanY + 30,
                10,
                10,
                "red"
            );

            drawHeart(
                camPanX + 245,
                camPanY + 5,
                camPanX + 22,
                camPanY + 30,
                10,
                10,
                "red"
            );

            drawHeart(
                camPanX + 260,
                camPanY + 5,
                camPanX + 22,
                camPanY + 30,
                10,
                10,
                "red"
            );
        } else if (this.health == 50) {
            this.healthColor = "yellow";
            drawHeart(
                camPanX + 230,
                camPanY + 5,
                camPanX + 22,
                camPanY + 30,
                10,
                10,
                "red"
            );
            drawHeart(
                camPanX + 245,
                camPanY + 5,
                camPanX + 22,
                camPanY + 30,
                10,
                10,
                "red"
            );
        } else if (this.health == 0) {
            this.healthColor = "red";
            drawHeart(
                camPanX + 230,
                camPanY + 5,
                camPanX + 22,
                camPanY + 30,
                10,
                10,
                "red"
            );
        }

        colorRect(healthX, healthY, healthWidth, 3, this.healthColor);

        if (this.health < 0) {
            this.x = 0;
            this.y = 0;
            this.levelsComplete = 0;
            this.image.src = "../../JsGameFiles/images/knight_run.png";
            gameOver();
            this.health = 100;
            this.invincible = false;
        }
    };

    this.collisionEnemy = function (enemyClass) {
        this.reduceHP = function () {
            this.health = this.health - 50;
        };

        if (
            this.x < enemyClass.x + enemyClass.width &&
            /*left of */
            this.x + this.width > enemyClass.x &&
            this.y < enemyClass.y + enemyClass.height &&
            this.y + this.height > enemyClass.y &&
            this.invincible == false &&
            this.hit == false
        ) {
            playerhitsound.play();
            this.hit = true;
            this.reduceHP();
            setTimeout(() => {
                this.hit = false;
            }, 2000);
        }

        if (
            this.x < enemyClass.x + enemyClass.width &&
            /*left of */
            this.x + this.width > enemyClass.x &&
            this.y < enemyClass.y + enemyClass.height &&
            this.y + this.height > enemyClass.y &&
            this.invincible == true
        ) {
            powerupHit.play();
            enemyClass.x = -99999;
            enemyClass.y = -99999;
        }


    };

    this.draw = function () {
        this.drawGameBar();
        colorText("Keys: " + this.keysHeld, camPanX + 10, camPanY + 15, "white");
        this.drawhealthbar();
        this.animate();
    };

    this.scale = 1.3;
    this.width = WORLD_W / 2 - 7;
    this.height = WORLD_H / 2 - 7;
    this.imagewidth = 16;
    this.imageheight = 16;
    this.scaledWidth = this.scale * this.imagewidth;
    this.scaledHeight = this.scale * this.imageheight;

    this.drawFrame = function (frameX, frameY, canvasX, canvasY) {
        canvasContext.drawImage(
            this.image,
            frameX * this.imageheight,
            frameY * this.imagewidth,
            this.imagewidth,
            this.imageheight,
            this.x - 16,
            this.y - 16,
            this.scaledWidth,
            this.scaledHeight
        );
    };

    this.cycleLoop = [0, 1, 2, 3, 4, 5];
    this.currentLoopIndex = 0;
    this.frameCount = 0;

    this.animate = function () {
        this.frameCount++;

        this.drawFrame(this.cycleLoop[this.currentLoopIndex], 0, 0, 0);

        this.currentLoopIndex++;

        if (this.currentLoopIndex >= this.cycleLoop.length) {
            this.currentLoopIndex = 0;
        }
    };


    this.nextLevel = function () {


        if (this.levelsComplete == 0) {

            loadLevel(levelOne);
        }

        if (this.levelsComplete == 1) {

            loadLevel(levelTwo);


        } else if (this.levelsComplete == 2) {

            loadLevel(levelThree);

        } else if (this.levelsComplete == 3) {

            loadLevel(levelFour);

        } else if (this.levelsComplete == 4) {

            loadLevel(levelFive);

        }

    }
    //Draws gamebar at the top of the canvas
    this.drawGameBar = function () {
        canvasContext.globalAlpha = 0.5;
        canvasContext.font = "10px Courier New, monospace";
        colorRect(camPanX, camPanY, canvas.width, 25, "#9DBAF2");
        canvasContext.globalAlpha = 1.0;
        colorRect(camPanX, camPanY + 25, canvas.width, 3, "#434f65");
        colorText(this.levelname, camPanX + 110, camPanY + 15, "white");

        if (this.levelsComplete == 0) {
            this.levelname = "Epilogue";
        }

        if (this.levelsComplete == 1) {
            this.levelname = "Kings Landing";

        } else if (this.levelsComplete == 2) {
            this.levelname = "Sasu's Solace";

        } else if (this.levelsComplete == 3) {
            this.levelname = "Caustic Caverns";

        } else if (this.levelsComplete == 4) {
            this.levelname = "John Dalton";
        }

    }

    //Game over code
    function gameOver() {
        document.getElementById('game-over').style.display = 'block';
        document.getElementById('game-over-overlay').style.display = 'block';
        isGameOver = true;
        this.levelsComplete = 0;



    }
    //Game complete code
    function gameComplete() {
        document.getElementById('game-complete').style.display = 'block';
        document.getElementById('game-complete-overlay').style.display = 'block';
        isGameComplete = true;
        loadLevel(levelOne);
        this.levelsComplete = 0;


    }

    //Game over play again
    document.getElementById('play-again').addEventListener('click', function () {
        document.getElementById('game-over').style.display = 'none';
        document.getElementById('game-over-overlay').style.display = 'none';
        isGameOver = false;
        this.health = 100;
        loadLevel(levelOne);
        this.levelsComplete = 0;





    });

    //Game won play again
    document.getElementById('play-again-2').addEventListener('click', function () {
        document.getElementById('game-complete').style.display = 'none';
        document.getElementById('game-complete-overlay').style.display = 'none';
        isGameComplete = false;
        this.health = 100;
        loadLevel(levelOne);
        this.levelsComplete = 0;



    });



}

const WORLD_W = 32;
const WORLD_H = 32;
const WORLD_GAP = 2;
const WORLD_COLS = 17;
const WORLD_ROWS = 17;

var camPanX = 0.0;
var camPanY = 0.0;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 1;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 1;

var levelOne = [
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 12, 0, 0, 1,
1, 0, 0, 14, 0, 0, 1, 1, 5, 1, 1, 0, 1, 1, 11, 1, 1,
1, 0, 4, 0, 4, 0, 1, 0, 0, 0, 11, 0, 1, 4, 4, 0, 1,
1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5, 1, 5, 1, 0, 1,
1, 1, 1, 5, 1, 11, 1, 2, 0, 0, 1, 14, 0, 14, 1, 4, 1,
1, 0, 0, 14, 0, 0, 0, 0, 0, 14, 1, 0, 0, 0, 1, 1, 1,
1, 0, 0, 4, 0, 0, 12, 0, 0, 0, 1, 0, 14, 0, 1, 1, 1,
1, 0, 11, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 1, 1, 1,
1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 11, 0, 0, 0, 1, 1, 1,
1, 0, 5, 0, 5, 0, 5, 0, 3, 0, 1, 1, 1, 1, 1, 1, 1,
1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 11, 1, 1, 1,
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
];
var levelTwo = [
7, 7, 7, 7, 7, 7, 7, 1, 1, 1, 7, 7, 7, 7, 7, 7, 7,
7, 7, 7, 7, 7, 7, 7, 1, 2, 1, 7, 7, 7, 7, 7, 7, 7,
7, 7, 7, 7, 7, 1, 1, 1, 0, 1, 1, 1, 7, 7, 7, 7, 7,
7, 7, 11, 1, 1, 1, 0, 14, 0, 0, 12, 1, 7, 7, 7, 7, 7,
7, 7, 1, 0, 0, 0, 0, 0, 4, 0, 0, 1, 1, 1, 7, 7, 7,
7, 7, 11, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 7, 7,
7, 1, 1, 14, 0, 1, 1, 1, 1, 1, 11, 1, 5, 1, 7, 7, 7,
1, 4, 0, 0, 0, 11, 14, 0, 0, 12, 1, 11, 0, 0, 1, 7, 7,
7, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 7, 7, 7,
7, 7, 1, 0, 0, 1, 0, 4, 0, 0, 5, 0, 0, 1, 7, 7, 7,
7, 7, 1, 0, 14, 11, 0, 0, 0, 0, 1, 0, 14, 1, 7, 7, 7,
7, 7, 1, 12, 0, 1, 0, 0, 14, 0, 1, 0, 0, 1, 7, 7, 7,
7, 7, 1, 0, 0, 1, 1, 11, 1, 0, 1, 1, 1, 1, 7, 7, 7,
7, 7, 1, 0, 0, 11, 7, 1, 11, 5, 1, 1, 11, 7, 7, 7, 7,
7, 7, 1, 4, 0, 11, 1, 1, 0, 0, 1, 3, 1, 7, 7, 7, 7,
7, 7, 1, 0, 0, 0, 0, 1, 0, 0, 5, 0, 1, 7, 7, 7, 7,
7, 7, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 7, 7

];
var levelThree = [
7, 7, 7, 7, 7, 7, 7, 1, 1, 1, 1, 1, 7, 7, 7, 7, 7,
7, 7, 7, 7, 7, 7, 7, 1, 12, 0, 4, 1, 7, 7, 7, 7, 7,
7, 1, 1, 1, 1, 7, 7, 11, 1, 0, 1, 11, 7, 7, 7, 7, 7,
7, 1, 2, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 7, 7, 7,
7, 1, 0, 0, 0, 0, 0, 14, 0, 14, 5, 0, 0, 1, 7, 7, 7,
7, 1, 12, 0, 1, 1, 11, 0, 1, 1, 1, 1, 0, 1, 7, 7, 7,
7, 1, 11, 1, 1, 7, 1, 0, 1, 7, 1, 1, 5, 1, 11, 7, 7,
7, 7, 7, 7, 7, 7, 1, 0, 1, 7, 1, 14, 0, 14, 1, 7, 7,
1, 11, 1, 1, 11, 1, 1, 0, 1, 11, 1, 0, 0, 0, 1, 7, 7,
1, 0, 3, 0, 1, 1, 4, 0, 12, 1, 1, 12, 0, 4, 1, 7, 7,
1, 0, 14, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 7, 7,
1, 1, 0, 1, 7, 7, 7, 7, 7, 7, 7, 11, 0, 1, 11, 1, 11,
7, 11, 0, 1, 1, 1, 11, 1, 1, 1, 11, 1, 0, 1, 1, 14, 1,
7, 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1,
7, 1, 1, 1, 1, 1, 1, 11, 1, 1, 11, 1, 1, 1, 1, 0, 1,
7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 4, 1,
7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 1, 1
]
var levelFour = [
7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
7, 1, 1, 11, 1, 11, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
7, 11, 3, 14, 0, 1, 7, 7, 7, 1, 1, 11, 1, 1, 11, 1, 1,
7, 1, 0, 0, 0, 11, 7, 7, 7, 11, 14, 0, 4, 0, 0, 14, 11,
7, 11, 0, 0, 0, 1, 1, 11, 1, 1, 0, 1, 1, 11, 1, 0, 1,
7, 1, 11, 1, 5, 14, 4, 14, 0, 1, 0, 11, 7, 7, 1, 0, 1,
7, 7, 7, 1, 0, 0, 0, 0, 0, 5, 0, 1, 7, 7, 11, 0, 11,
7, 7, 7, 7, 11, 1, 11, 1, 11, 1, 0, 11, 7, 7, 1, 4, 1,
1, 1, 11, 1, 7, 7, 7, 7, 7, 11, 0, 1, 1, 11, 1, 0, 1,
11, 2, 12, 1, 7, 7, 7, 7, 7, 1, 0, 0, 14, 0, 0, 0, 11,
1, 4, 0, 0, 1, 7, 7, 7, 7, 1, 12, 0, 0, 0, 0, 12, 1,
1, 11, 0, 5, 0, 11, 7, 7, 7, 11, 1, 1, 0, 0, 1, 1, 11,
7, 7, 1, 0, 0, 1, 11, 1, 1, 1, 1, 11, 0, 0, 11, 1, 1,
7, 7, 11, 0, 0, 14, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 1,
7, 7, 1, 0, 0, 0, 0, 14, 0, 0, 0, 14, 0, 14, 0, 0, 1,
7, 7, 1, 1, 11, 1, 11, 1, 1, 11, 1, 1, 1, 11, 1, 1, 1,
7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
]
var levelFive = [
7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 11, 1, 1, 11, 1, 1,
11, 1, 1, 1, 11, 1, 1, 1, 7, 7, 1, 0, 0, 0, 0, 14, 11,
1, 4, 0, 0, 0, 0, 14, 1, 7, 7, 11, 2, 0, 0, 0, 0, 1,
1, 0, 0, 14, 0, 0, 0, 1, 7, 7, 1, 0, 0, 0, 0, 0, 11,
1, 0, 1, 11, 1, 11, 0, 11, 7, 7, 11, 1, 1, 0, 14, 0, 1,
1, 0, 5, 0, 15, 1, 0, 1, 7, 7, 7, 7, 7, 1, 0, 0, 1,
11, 0, 1, 1, 11, 1, 0, 1, 11, 1, 1, 11, 1, 1, 0, 0, 1,
1, 0, 0, 0, 14, 0, 0, 5, 0, 5, 0, 14, 0, 0, 0, 0, 11,
1, 0, 0, 0, 0, 0, 0, 11, 12, 11, 0, 0, 0, 0, 14, 0, 1,
11, 14, 0, 0, 0, 0, 0, 1, 1, 1, 11, 1, 1, 11, 0, 0, 11,
1, 1, 1, 11, 1, 1, 11, 1, 7, 7, 7, 7, 1, 12, 0, 0, 1,
7, 1, 1, 1, 1, 1, 11, 1, 1, 7, 7, 7, 1, 1, 0, 0, 1,
7, 1, 0, 0, 1, 14, 0, 1, 12, 11, 1, 1, 11, 1, 0, 14, 11,
7, 1, 4, 0, 1, 0, 0, 1, 0, 0, 0, 14, 0, 0, 0, 0, 1,
7, 1, 4, 0, 5, 0, 0, 4, 0, 14, 0, 0, 0, 14, 0, 0, 1,
7, 1, 0, 0, 1, 0, 14, 1, 0, 1, 1, 11, 1, 1, 11, 1, 11,
7, 1, 11, 1, 11, 1, 1, 1, 1, 11, 7, 7, 7, 7, 7, 7, 7]

var worldGrid = [];

const TILE_GROUND = 0;
const TILE_BLANK = 7;
const TILE_WALL_MID = 1;
const TILE_WALL_2 = 11;
const TILE_PLAYERSTART = 2;
const TILE_GOAL = 3;
const TILE_KEY = 4;
const TILE_POTION = 12;
const TILE_DOOR_CLOSED = 5;
const TILE_DOOR_OPEN = 6;
const TILE_ENEMYSTART = 14;
const TILE_CHEST = 15;

function returnTileTypeAtColRow(col, row) {
    if (col >= 0 && col < WORLD_COLS && row >= 0 && row < WORLD_ROWS) {
        var worldIndexUnderCoord = rowColToArrayIndex(col, row);
        return worldGrid[worldIndexUnderCoord];
    } else {
        return WORLD_WALL;
    }
}

function getTileIndexAtPixelCoord(atX, atY) {
    var warriorWorldCol = Math.floor(atX / WORLD_W);
    var warriorWorldRow = Math.floor(atY / WORLD_H);
    var worldIndexUnderWarrior = rowColToArrayIndex(
        warriorWorldCol,
        warriorWorldRow
    );

    if (
        warriorWorldCol >= 0 &&
        warriorWorldCol < WORLD_COLS &&
        warriorWorldRow >= 0 &&
        warriorWorldRow < WORLD_ROWS
    ) {
        return worldIndexUnderWarrior;
    } // end of valid col and row

    return undefined;
} // end of warriorWorldHandling func

function rowColToArrayIndex(col, row) {
    return col + WORLD_COLS * row;
}

function tileTypeHasTransparency(checkTileType) {
    return (

        checkTileType == TILE_GOAL ||
        checkTileType == TILE_KEY ||
        checkTileType == TILE_ENEMYSTART ||
        checkTileType == TILE_POTION ||
        checkTileType == TILE_CHEST ||
        checkTileType == TILE_DOOR_OPEN ||
        checkTileType == TILE_DOOR_CLOSED
        
    );
}

function drawWorld() {
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            var tileKindHere = worldGrid[arrayIndex];
            var useImg = worldPics[tileKindHere];
            if (tileTypeHasTransparency(tileKindHere)) {
                canvasContext.drawImage(
                    worldPics[TILE_GROUND],
                    drawTileX,
                    drawTileY,
                    32,
                    32
                );
            }

            canvasContext.drawImage(useImg, drawTileX, drawTileY, 32, 32);
            drawTileX += WORLD_W;
            arrayIndex++;
        }
        // end of for each col
        drawTileY += WORLD_H;
        drawTileX = 0;
    } // end of for each row
} // end of drawWorld func

