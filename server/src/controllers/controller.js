const Model = require('../model/model');

/*
* Binding together all connections. Recieves, maps, formats and sends data.
*/
module.exports = class Controller {
  constructor({ arduino, socket }) {
    this.arduino = arduino;
    this.socket = socket;
    this.model = new Model();

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

  /* Attach observer methods to the connections */
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

  /* Attach mapping and format methods for both connections */
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

  /* Start transmitting */
  start() {
    console.log('Start transmitting in 2 seconds');
    setTimeout(() => { 
      setInterval(() => {
        this.transmitt({ getData: () => this.model.getData(), connection: this.arduino });
        this.transmitt({ getData: () => this.model.getData(), connection: this.socket });
      }, 50);
    }, 2000);
  }

  /* Process data and send to clients */
  transmitt({ getData, connection }) {
    if (!connection.isConnected()) return;
    getData()
      .then(connection.map)
      .then(connection.format)
      .then(connection.send)
      .catch(e => console.log('LOl', e));
  }
};
