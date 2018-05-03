const Model = require('../model/model');
const { hexToRGB } = require('../utils/colorUtils');
const { powerUsage } = require('../utils/powerUtils');

/*
* Binding together all connections. Recieves, maps, formats and sends data.
*/
module.exports = class Controller {
  constructor({ arduino, socket, config: { frequency, startDelay, autoStart, autoStartShow } }) {
    this.arduino = arduino;
    this.socket = socket;
    
    this.interval = null;
    this.frequency = frequency;
    this.startDelay = startDelay;

    this.model = new Model({ frequency: frequency, startDelay: startDelay, show: autoStartShow });

    this.devices = {
      CYBORGHEAD: { width: 35, height: 30 },
      LEDCUBE: { width: 9, height: 9 },
    };

    this.setObservers({
      arduino: this.arduino,
      socket: this.socket,
    });

    this.setPipelineMethods({
      arduino: this.arduino,
      socket: this.socket,
    });

    (autoStart) ? this.start() : null;
  }

  /* Attach observer methods to the connections */
  // Something else than console log.
  setObservers({ socket, arduino }) {
    socket.setObserver({
      notifyConnected: () => { console.log('socket connected'); },
      notifyMessage: (data) => {
        console.log('socket data', data);
        this.model.setData(data);
      },
      notifyDisconnect: () => { console.log('socket disconnected'); },
      notifyError: (error) => { console.log('socket error', error); },
    });

    arduino.setObserver({
      notifyConnected: () => { console.log('arduino connected'); },
      notifyMessage: (data) => { console.log('arduino data');},
      notifyDisconnect: () => { console.log('arduino disconnected'); },
      notifyError: (error) => { console.log('Arduino error', error); }, 
    });
  }

  /* Attach mapping and format methods for both connections */
  setPipelineMethods({ socket, arduino }) {
    socket.mapping = ({ data }) => {
      return { data: data };
    };

    arduino.mapping = ({ data }) => {
      let mapping = this.arduino.getMapping(this.device);
      let bytes = new Uint8Array((mapping.leds)* 3);

      data.forEach((row, y) => {
        row.forEach((val, x) => {
          let led = mapping.mapping[y][x] * 3;
          if (led < 0 ) {
            bytes[led + 0] = 0;
            bytes[led + 1] = 0;
            bytes[led + 2] = 0;
          } else {
            let p = powerUsage(data, mapping);
            let c = NaN;
            if (p > mapping.maxPowerConsumption) {
              c = hexToRGB(val, mapping.maxPowerConsumption / p);
            }
            bytes[led + 0] = c.r;
            bytes[led + 1] = c.g;
            bytes[led + 2] = c.b;
          }
        });
      });

      return { data: new Buffer(bytes, 'binary') };
    };

    socket.format = ({ data }) => {
      return data;
    };

    arduino.format = ({ data }) => {
      return data;
    };
  }

  /* Start model update and data transmitting */
  start() {
    console.log('Start transmitting in 2 seconds');
    this.model.start();

    setTimeout(() => { 
      this.interval = setInterval(() => {
        this.transmitt({ getData: () => this.model.getData(), connection: this.arduino });
        this.transmitt({ getData: () => this.model.getData(), connection: this.socket });
      }, 100);
    }, 500);
  }

  /* Stop model update data transmitting */
  stop() {
    this.model.stop();
    clearInterval(this.interval);
  }

  /* Set the model show */
  setShow(show) {
    this.model.setShow(show);
  }

  /* Set the mode */
  setMode(mode) {
    this.model.setGrid(this.devices[mode]);
  }

  /* Process data and send to clients */
  transmitt({ getData, connection }) {
    if (!connection.isConnected()) return;
    getData()
      .then(connection.mapping)
      .then(connection.format)
      .then(connection.send)
      .catch(e => console.log('Transmit error', e));
  }
};
