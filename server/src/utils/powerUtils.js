const {hexToRGB} = require("./colorUtils")

const powerUsage = (grid, mapping) => {
    let sum = 0.0
    grid.forEach((row, y) => row.forEach((val, x) => {
          let led = mapping.mapping[y][x]
          if (led >= 0 ) {
            let {r, g, b} = hexToRGB(val);
            sum += (r + g + b)
          }
    }))
    return 5 * ((sum / 255.0) * 20)
}

module.exports = {powerUsage}