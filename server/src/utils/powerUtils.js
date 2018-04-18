const {hexToRGB} = require("./colorUtils")

const powerUsage = (grid, mapping) => {
    let sum = 0.0
    grid.forEach((row, y) => row.forEach((val, x) => {
          let led = mapping.mapping[y][x] * 3
          if (led < 0 ) {
            let c = hexToRGB(val);
            console.log(c)
            sum += (20 * c.r) + (20 * c.g) + (20 * c.g)
          }
    }))
    return 5 * (sum / 255)// power = norm(5 * 60 * colorChannelIntencity)
}

module.exports = {powerUsage}