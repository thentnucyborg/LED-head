const { hexToRGB, RGBtoString, randomHex, } = require('../utils/colorUtils');
const { wave } = require('../utils/numberUtils');
/* 
* dt - time since last update
* time - current timestamp
* grid - grid
* Return updated grid
*/
const nothing = ({ dt, time, grid }) => {
  // do changes
  return grid;
};

const test = ({ dt, time, grid }) => {
  let r = () => Math.floor(Math.random() * grid.length);
  grid[r()][r()] = (grid[r()][r()] === '#000000ff') ? '#ff0000ff' : '#000000ff';
  grid[r()][r()] = (grid[r()][r()] === '#000000ff') ? '#ff0000ff' : '#000000ff';
  grid[r()][r()] = (grid[r()][r()] === '#000000ff') ? '#ff0000ff' : '#000000ff';
  grid[r()][r()] = (grid[r()][r()] === '#000000ff') ? '#ff0000ff' : '#000000ff';
  //grid[r()][r()] = (grid[r()][r()] === '#000000ff') ? '#ff0000ff' : '#000000ff';
  //grid[r()][r()] = (grid[r()][r()] === '#000000ff') ? '#ff0000ff' : '#000000ff';
  //grid[r()][r()] = (grid[r()][r()] === '#000000ff') ? '#ff0000ff' : '#000000ff';
  return grid;
};

const intensity = ({ dt, time, grid}) => (
  grid.map(r => r.map(tile => RGBtoString({ r: 255, g: 0, b: 255, a: dt/100 % 255 })))
);

const random = ({ dt, time, grid }) => (
  grid.map(r => r.map(tile => randomHex()))
);


let n = 0;
let lastUpdate = + new Date();
const shift = ({ dt, time, grid }) => {
  if (time - lastUpdate > 200) {
    lastUpdate = time;

    grid[n][5] = '#ffffffff';
    n = (n + 1 < grid.length) ? n + 1 : 0;
    grid[n][5] = '#00000000';
  }

  return grid;
};

module.exports = { intensity, random, test, shift, nothing };
