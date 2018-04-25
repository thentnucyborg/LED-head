/*
*
*/

//
// Box 
//

const begin = (ctx, x, y) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
};

const end = (ctx, color) => {
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.fill();
};

const drawLeft = (ctx, x, y, w, color) => {
  begin(ctx, x, y);
  ctx.lineTo(x - w, y - w * 0.5);
  ctx.lineTo(x - w, y - w * 1.5);
  ctx.lineTo(x, y - w);
  end(ctx, color);
};

const drawRight = (ctx, x, y, w, color) => {
  begin(ctx, x, y);
  ctx.lineTo(x + w, y - w * 0.5);
  ctx.lineTo(x + w, y - w * 1.5);
  ctx.lineTo(x, y - w);
  end(ctx, color);
};

const drawTop = (ctx, x, y, w, color) => {
  begin(ctx, x, y - w);
  ctx.lineTo(x - w, y - w * 1.5);
  ctx.lineTo(x, y - w * 2);
  ctx.lineTo(x + w, y - w * 1.5);
  end(ctx, color);
};

/* Draws a '3d' box using magic */
const drawBox = ({ ctx, grid, w = 20}) => {
  const height = grid.length / 3;
  const width = grid[0].length / 3;
  ctx.clearRect(0, 0, w * width, w* height);

  const xOffset = 150;
  const yOffset = 200;

  grid.slice(height, width*2).map(x => x.slice(height, width*2)).forEach((l, x) => l.forEach((e, y) => 
    drawTop(ctx, (x+y)*w+xOffset, yOffset+y*w-(w*x/2)-(y*w/2), w, e)));
  grid.slice(0, width).map(x => x.slice(height, width*2)).forEach((l, x) => l.forEach((e, y) => 
    drawLeft(ctx, x*w+xOffset, yOffset+y*w + (w*x/2), w, e)));
  grid.slice(height, width*2).map(x => x.slice(height*2, width*3)).forEach((l, x) => l.forEach((e, y) => 
    drawRight(ctx, x*w+xOffset + (l.length - 1) * w, yOffset+y*w + ((l.length - x) * w/2) - w/2, w, e)));
};

//
// Dome
//

const drawCircle = (ctx, x, y, r, color) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2*Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

const drawDome = ({ ctx, grid, w = 12 }) => {
  const height = grid.length / 3;
  const width = grid[0].length / 3;
  ctx.clearRect(0, 0, w * width, w * height);

  const xOffset = 45;
  const yOffset = 75;

  grid.forEach((r, i) => r.forEach((e, j) => {
    drawCircle(ctx, i * w + xOffset, j * w + yOffset, w/4, e);
  }));
};

export { drawBox, drawDome };
