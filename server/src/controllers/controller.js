const Model = require('../model/model');
const {hexToRGB} = require('../utils/colorUtils');
const {powerUsage} = require('../utils/powerUtils');

/*
* Binding together all connections. Recieves, maps, formats and sends data.
*/
module.exports = class Controller {
  constructor({ arduino, socket }) {
    this.arduino = arduino;
    this.socket = socket;
    this.device = 'CYBORGHEAD';
    this.model = new Model(10, 10);

    this.setObservers({
      arduino: this.arduino,
      socket: this.socket,
    });

    this.setPipelineMethods({
      arduino: this.arduino,
      socket: this.socket,
    });

    this.model.startAnimation();
    this.start();
  }

  /* Attach observer methods to the connections */
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
      let bytes = new Uint8Array((mapping.leds )* 3);

     // for (let i = 0; i < (mapping.leds); i++ ) {
     //   let led = i * 3;
     //   bytes[led+0] = 50;
     //   bytes[led+1] = 50;
     //   bytes[led+2] = 50;
     // }

       data.forEach((row, y) => {
         row.forEach((val, x) => {
           let led = mapping.mapping[y][x] * 3;
           if (led < 0 ) {
             bytes[led+0] = 0;
             bytes[led+1] = 0;
             bytes[led+2] = 0;
           } else {
             let p = powerUsage(data, mapping)
             let c = NaN
             if (p > mapping.maxPowerConsumption) {
                 c = hexToRGB(val, mapping.maxPowerConsumption / p);
                 console.log(p, mapping.maxPowerConsumption / p)
             } else {
               c = hexToRGB(val)
             }
             bytes[led+0] = c.r;
             bytes[led+1] = c.g;
             bytes[led+2] = c.b;
           }
         });
       });
      return {data: new Buffer(bytes, 'binary')};
    };

    socket.format = ({ data }) => {
      return { buffer: data };
    };

    arduino.format = ({ data }) => {
      return data;
    };
  }

  /* Start transmitting */
  start() {
    console.log('Start transmitting in 2 seconds');
    setTimeout(() => { 
      setInterval(() => {
        this.transmitt({ getData: () => this.model.getData(), connection: this.arduino });
        this.transmitt({ getData: () => this.model.getData(), connection: this.socket });
      }, 1000);
    }, 2000);
  }

  /* Process data and send to clients */
  transmitt({ getData, connection }) {
    if (!connection.isConnected()) return;
    getData()
      .then(connection.mapping)
      .then(connection.format)
      .then(connection.send)
      .catch(e => console.log('LOl', e));
  }
};
