const { hexToRGB, RGBtoString, randomHex } = require('../utils/colorUtils');
const { wave } = require('../utils/numberUtils');
/* 
* dt - time since last update
* time - current timestamp
* grid - grid
* Return updated grid
*/
const test = ({ dt, time, grid }) => {
  // do changes
  return grid;
};


const intensity = ({ dt, time, grid}) => (
  grid.map(r => r.map(tile => RGBtoString({ r: 255, g: 0, b: 255, a: dt % 255 })))
);

const random = ({ dt, time, grid }) => (
  grid.map(r => r.map(tile => randomHex()))
);



module.exports = { intensity, random, test };
