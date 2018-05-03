const { randomHex, RGBAToHex, toHex} = require('../utils/colorUtils');
const { fakeBrainActivity } = require('../utils/fakebrain');
const { getMapping } = require('../services/arduino');

/* 
* Example of program that does nothing
* dt - time since last update
* time - current timestamp
* grid - grid
* Return updated grid
*/
const nothing = ({ dt, time, grid }) => {
  let newGrid = grid;
  // do changes
  // return changes
  return newGrid;
};

const test = ({ dt, time, grid }) => {
  let r = () => Math.floor(Math.random() * grid.length);
  grid[r()][r()] = (grid[r()][r()] === '#000000ff') ? '#ff0000ff' : '#000000ff';
  grid[r()][r()] = (grid[r()][r()] === '#000000ff') ? '#ff0000ff' : '#000000ff';
  grid[r()][r()] = (grid[r()][r()] === '#000000ff') ? '#ff0000ff' : '#000000ff';
  grid[r()][r()] = (grid[r()][r()] === '#000000ff') ? '#ff0000ff' : '#000000ff';
  return grid;
};

const intensity = ({ dt, time, grid}) => (
  grid.map(r => r.map(tile => RGBAToHex({ r: 255, g: 0, b: 255, a: dt/1000000000000000 % (255/4) })))
);

/* Sets all leds to white */
const maxIntensity = ({ dt, time, grid}) => (
  grid.map(r => r.map(tile => RGBAToHex({ r: 255, g: 255, b: 255, a: 50 })))
);

/* Random led color */
const random = ({ dt, time, grid }) => (
  grid.map(r => r.map(tile => randomHex()))
);

let counter = 0;
const oneByOne = ({ dt, time, grid }) => {
  const newg = grid.map((r, y) => r.map((tile, x) => {
    if (y * r.length + x === counter) {
      return RGBAToHex({r: 255, g: 255, b: 255, a: 255});
    } else {
      return RGBAToHex({r: 0, g: 0, b: 0, a: 0});
    }
  }));
  counter++;
  if (counter === 791) counter = 0;
  return newg;
};

let lastUpdate = + new Date();
let activity = null;
const maxSpikes = 100;
const timespan = 10000;

const fakeBrain = ({ dt, time, grid }) => {
  let mapping = getMapping('CYBORGHEAD');

  let lifetime = time - lastUpdate;
  if (lifetime >= 1000 || !activity) { // if one second has passed
    activity = fakeBrainActivity(0, maxSpikes);
    activity.map((x) => (x / maxSpikes) * timespan);
    lastUpdate = time;
    lifetime = 0;
  }

  mapping.brainMapping.forEach(({x, y}, i) => {
    let c = `#1212ff${toHex(Math.floor(255 * (activity[i] - lifetime)))}`;
    grid[y][x] = c;
  });
  return grid;
};

let n = 0;
const shift = ({ dt, time, grid }) => {
  if (time - lastUpdate > 200) {
    lastUpdate = time;

    grid[n][5] = '#ffffffff';
    n = (n + 1 < grid.length) ? n + 1 : 0;
    grid[n][5] = '#00000000';
  }
  return grid;
};

module.exports = { maxIntensity, intensity, random, test, shift, nothing, fakeBrain, oneByOne };
