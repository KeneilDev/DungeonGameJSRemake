export function drawText(text, x, y, align, color, font) {
    ctx.textAlign = align;
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y);
  }
  
  export function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
  }
  
  export function colorCircle(centerX, centerY, radius, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    ctx.fill();
  }
  