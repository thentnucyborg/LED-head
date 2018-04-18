const {hexToRGB, RGBtoString, RGBAToHex} = require('../utils/colorUtils');
const {wave} = require('../utils/numberUtils');

/*
* Controls the grid array
*/
class Model {
    constructor(w, h) {
        this.grid = [...new Array(h * 3)].map((y, i) => [...new Array(w * 3)].map((x, j) => '#000000'));

        this.modes = this.createModes();
        this.selectedMode = 'test1';

        this.startDelay = 500;
        this.frequency = 10;
        this.maxBrightness = 1.0;
    }

    /* Create object with the different modes */
    createModes() {
        // In the future move to different location.
        return {
            test1: (dt) => this.grid.map(r => r.map(tile => RGBAToHex({r: 255, g: 255, b: 255, a: 255}))),
            test2: () => {},
        };
    }

    /* Return as promise to startPulseAnimation chain methods in parent class */
    getData() {
        return Promise.resolve({data: this.grid});
    }

    /* Set new grid */
    setData(grid) {
        // Todo - check if data is correct
        this.grid = (grid instanceof String) ? JSON.parse(grid) : grid;
        this.brightness(this.maxBrightness)
    }

    setMaxBrightness(x) {
        this.maxBrightness = (x <= 1) ? x : 1
    }

    /* Constricts all LEDS to maximum brightness */
    brightness(x) {
        if (x >= 1) {
            return
        }
        this.grid.map(row => row.map(val => {
            c = hexToRGB(val);
            return RGBAToHex({r: (c.r * x), g: (c.g * x), b: (c.b * x), a: c.a})
        }))
    }

    /* Start updating the model with a set mode */
    startPulseAnimation() {
        console.log(`Start model changes ${this.selectedMode}`);

        // Todo - change to change in time (delta time) instead of counter.
        function* generator(i = 0, increment = 0.05) {
            while (true) yield i += increment;
        }

        const counter = generator(0, 1);

        setTimeout(() => {
            setInterval(() => {
                this.update(counter.next().value);
            }, this.frequency);
        }, this.startDelay);
    }

    /* Update the grid */
    update(dt) {
        this.setData(this.modes[this.selectedMode](dt));
    }


}

module.exports = Model;
