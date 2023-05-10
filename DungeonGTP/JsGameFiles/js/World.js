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

