var warriorPic = document.createElement("img");
var enemyPic = document.createElement("img");
var worldPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	console.log(picsToLoad);
	if(picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
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