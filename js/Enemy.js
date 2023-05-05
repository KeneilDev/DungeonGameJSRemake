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
