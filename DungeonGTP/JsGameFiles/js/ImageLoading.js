const warriorPic = new Image();
const enemyPic = new Image();
const worldPics = [];

let picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady() {
  picsToLoad--;
  if (picsToLoad === 0) {
    imageLoadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload = countLoadedImagesAndLaunchIfReady;
  imgVar.src = `./JSGameFiles/images/${fileName}`;
}

function loadImageForWorldCode(worldCode, fileName) {
  worldPics[worldCode] = new Image();
  beginLoadingImage(worldPics[worldCode], fileName);
}

function loadImages() {
  const imageList = [
    { varName: warriorPic, theFile: 'knight_run.png' },
    { worldType: TILE_ENEMYSTART, theFile: 'fly_anim.png' },
    { worldType: TILE_BLANK, theFile: 'blank.png' },
    { worldType: TILE_WALL_MID, theFile: 'wall_1.png' },
    { worldType: TILE_WALL_2, theFile: 'wall_2.png' },
    { worldType: TILE_GROUND, theFile: 'floor_1.png' },
    { worldType: TILE_GOAL, theFile: 'stairs.png' },
    { worldType: TILE_CHEST, theFile: 'chest_full.png' },
    { worldType: TILE_KEY, theFile: 'key_silver.png' },
    { worldType: TILE_POTION, theFile: 'potion_yellow.png' },
    { worldType: TILE_DOOR_OPEN, theFile: 'door_fullyopen.png' },
    { worldType: TILE_DOOR_CLOSED, theFile: 'door_closed.png' },
  ];

  picsToLoad = imageList.length;

  for (let i = 0; i < imageList.length; i++) {
    const { varName, worldType, theFile } = imageList[i];
    if (varName) {
      beginLoadingImage(varName, theFile);
    } else {
      loadImageForWorldCode(worldType, theFile);
    }
  }
}
