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