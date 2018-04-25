const { hexToRGB, RGBtoString, randomHex, RGBAToHex, toHex} = require('../utils/colorUtils');
const { wave } = require('../utils/numberUtils');
const { fakeBrainActivity } = require("../utils/fakebrain")
const { getMapping } = require("../services/arduino")
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
  grid.map(r => r.map(tile => RGBAToHex({ r: 255, g: 0, b: 255, a: dt/1000000000000000 % (255/4) })))
);

const maxIntensity = ({ dt, time, grid}) => (
  grid.map(r => r.map(tile => RGBAToHex({ r: 255, g: 255, b: 255, a: 50 })))
);

const random = ({ dt, time, grid }) => (
  grid.map(r => r.map(tile => randomHex()))
);

var counter = 0
const oneByOne = ({ dt, time, grid }) => {
    const newg = grid.map((r, y) => r.map((tile, x) => {
        if (y*r.length + x === counter) {
            return RGBAToHex({r: 255, g: 255, b: 255, a: 255})
            console.log(counter)
        } else {
            return RGBAToHex({r: 0, g: 0, b: 0, a: 0})
        }
    }))
    counter++
    if (counter === 791) counter = 0
    return newg
};

let lastUpdate = + new Date()
let activity = null
const maxSpikes = 100
const timespan = 10000

const fakeBrain = ({ dt, time, grid }) => {
  let mapping = getMapping("CYBORGHEAD")

  let lifetime = time - lastUpdate
  if (lifetime >= 1000 || !activity) { // if one second has passed
    activity = fakeBrainActivity(0, maxSpikes)
    activity.map((x) => (x / maxSpikes) * timespan)
    lastUpdate = time
    lifetime = 0
  }

  mapping.brainMapping.forEach(({x, y}, i) => {
      let c = `#1212ff${toHex(Math.floor(255 * (activity[i] - lifetime)))}`
      // console.log(c)
      grid[y][x] = c
  })
  return grid
}


module.exports = { maxIntensity, intensity, random, test, fakeBrain, oneByOne };
