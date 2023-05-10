// Constants
const ENEMY_MOVE_SPEED = 0.1;

// Enemy class
function enemyClass() {
  // Properties
  this.x = -999;
  this.y = -999;
  this.width = WORLD_W / 2;
  this.height = WORLD_H / 2;
  this.speedY = 3;
  this.cycleLoop = [0, 1, 2, 3];
  this.currentLoopIndex = 0;
  this.frameCount = 0;
  this.scale = 1.5;
  this.currFrameX = 1;
  this.currFrameY = 1;
  this.imagewidth = 16;
  this.imageheight = 16;
  this.scaledWidth = this.scale * this.width;
  this.scaledHeight = this.scale * this.height;
  this.image = new Image();
  this.image.src = "./JsGameFiles/images/fly_anim.png";

  // Methods
  this.move = function() {
    this.y += this.speedY;
    var mapCol = Math.floor(this.x / WORLD_W);
    var mapRow = Math.floor(this.y / WORLD_H);
    var indexUnderEnemy = rowColToArrayIndex(mapCol, mapRow);

    // Walk into wall code
    var walkIntoTileIndex = getTileIndexAtPixelCoord(this.x, this.y);
    var walkIntoTileType = TILE_WALL_MID;

    if (walkIntoTileIndex !== undefined) {
      walkIntoTileType = worldGrid[walkIntoTileIndex];
    }

    switch (walkIntoTileType) {
      case TILE_GROUND:
        break;
      case TILE_WALL_MID:
        this.speedY *= -1;
        break;
      case TILE_WALL_2:
        this.speedY *= -1;
        break;
      case TILE_DOOR_CLOSED:
        this.speedY *= -1;
        break;
      default:
        break;
    }
  };

  this.reset = function() {
    for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
      for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
        var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
        if (worldGrid[arrayIndex] === TILE_ENEMYSTART) {
          worldGrid[arrayIndex] = TILE_GROUND;
          this.x = eachCol * WORLD_W + WORLD_W / 2;
          this.y = eachRow * WORLD_H + WORLD_H / 2;
          return;
        }
      }
    }
    console.log("NO ENEMY START FOUND!");
  };

  this.drawFrame = function(frameX, frameY, canvasX, canvasY) {
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

  this.animate = function() {
    this.frameCount++;
    this.drawFrame(
      this.cycleLoop[this.currentLoopIndex],
      0,
      0,
      0
    );
    this.currentLoopIndex++;
    if (this.currentLoopIndex >= this.cycleLoop.length) {
      this.currentLoopIndex = 0;
    }
  };

  this.draw = function(x, y) {
    this.x = x;
    this.y = y;
    this.animate();
  };
}
