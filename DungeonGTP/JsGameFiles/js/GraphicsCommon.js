function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
  canvasContext.save();
  canvasContext.translate(atX, atY);
  canvasContext.rotate(withAng);
  canvasContext.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
  canvasContext.restore();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
}

function drawHeart(fromX, fromY, toX, toY, lineWidth, height, color) {
  var x = fromX;
  var y = fromY;
  var width = lineWidth;
  var heartHeight = height;

  canvasContext.save();
  canvasContext.beginPath();
  var topCurveHeight = heartHeight * 0.3;
  canvasContext.moveTo(x, y + topCurveHeight);
  // top left curve
  canvasContext.bezierCurveTo(
    x, y,
    x - width / 2,
    y,
    x - width / 2,
    y + topCurveHeight
  );

  // bottom left curve
  canvasContext.bezierCurveTo(
    x - width / 2,
    y + (heartHeight + topCurveHeight) / 2,
    x,
    y + (heartHeight + topCurveHeight) / 2,
    x,
    y + heartHeight
  );

  // bottom right curve
  canvasContext.bezierCurveTo(
    x,
    y + (heartHeight + topCurveHeight) / 2,
    x + width / 2,
    y + (heartHeight + topCurveHeight) / 2,
    x + width / 2,
    y + topCurveHeight
  );

  // top right curve
  canvasContext.bezierCurveTo(
    x + width / 2,
    y,
    x,
    y,
    x,
    y + topCurveHeight
  );

  canvasContext.closePath();
  canvasContext.fillStyle = color;
  canvasContext.fill();
  canvasContext.restore();
}
