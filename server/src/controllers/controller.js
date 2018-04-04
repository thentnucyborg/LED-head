const { hexToRGB, RGBtoString } = require('../utils/colorUtils');
const { wave } = require('../utils/numberUtils');

module.exports = class Controller {
  constructor({ arduino, socket }) {
    this.arduino = arduino;
    this.socket = socket;
    this.model = new Model(); // get stuff from /public/render/* !

    this.setObservers({
      arduino: this.arduino,
      socket: this.socket,
    });

    this.setPipelineMethods({
      arduino: this.arduino,
      socket: this.socket,
    });

    this.start();
  }

  setObservers({ socket, arduino }) {
    socket.setObserver({
      notifyConnected: () => { console.log('socket connected'); },
      notifyMessage: (data) => { console.log('socket data', data); },
      notifyDisconnect: () => { console.log('socket disconnected'); },
      notifyError: (error) => { console.log('socket error', error); },
    });

    arduino.setObserver({
      notifyConnected: () => { console.log('arduino connected'); },
      notifyMessage: (data) => { console.log('arduino data'); },
      notifyDisconnect: () => { console.log('arduino disconnected'); },
      notifyError: (error) => { console.log('Arduino error', error); }, 
    });
  }

  setPipelineMethods({ socket, arduino }) {
    socket.mapping = ({ data }) => {
      return { data: data };
    };

    arduino.mapping = ({ data }) => {
      return { data: data };
    };


    socket.format = ({ data }) => {
      return { buffer: data };
    };

    arduino.format = ({ data }) => {
      return { buffer: new Buffer(new Uint8Array(20), 'binary') };
    };
  }

  start() {
    console.log('Start transmitting in 2 seconds');

    setTimeout(() => { 
      setInterval(() => {
        if (this.arduino.isConnected) {
          this.update({ getData: () => this.model.getData(), connection: this.arduino });
        }
        this.update({ getData: () => this.model.getData(), connection: this.socket });
      }, 50);
    }, 2000);
  }

  /* Process data and send to clients */
  update({ getData, connection }) {
    getData()
      .then(connection.map)
      .then(connection.format)
      .then(connection.send)
      .catch(this.error);
  }

  error(error) {
    console.log('pipeline error');
    console.log(error);
    console.log('****');
  }
};

class Model {
  constructor() {
    const n = 9;
    this.grid = [...new Array(n*3)].map((x, i) => [...new Array(n*3)].map((y, j) => '#000000'));

    this.start();
    this.mode = 'test1';
  }

  getData() {
    return new Promise((resolve, reject) => {
      resolve({ data: this.grid });
    });
  }

  start() {
    console.log('Start model changes');
    function* generator(i=0, increment=0.05) { while(true) yield i += increment; }

    const counter = generator(0, 1);

    setTimeout(() => { 
      setInterval(() => {
        this.update(counter.next().value);
      }, 10);
    }, 500);
  }

  update(num) {
    const mode = {
      test1: (n) => this.grid.map(r => r.map(tile => RGBtoString({ r: n % 255, g: 0, b: n % 255, a: n % 255 }))),
    };
    this.grid = mode[this.mode](num);
  }
}
