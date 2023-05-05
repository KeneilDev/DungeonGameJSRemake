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