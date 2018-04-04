const SerialPort = require('serialport');
const chain = () => new Promise(res => res());

let serial = null;
let observer = null;

/* eyo */
const createConnection = () => (
  chain()
    .then(findPort)
    .then(connect)
);

/* Auto find the correct port */
const findPort = () => (
  SerialPort.list()
    .then(ports => ports.find(port => port.vendorId))
);

/* Create a serial connections */
const connect = ({ comName }) => {
  const options = {
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1
  };

  const serial = new SerialPort(comName, options);

  serial.on('open', () => { observer.notifyConnected(); });
  serial.on('data', (data) => { observer.notifyMessage(data.toString('utf-8')); });
  serial.on('error', (error) => { observer.notifyError(error); });
  serial.on('close', () => { observer.notifyDisconnect(); });
};

const isConnected = (serial) ? true : false;

/* Add a listener to */
const setObserver = (obs) => {
  observer = obs;
};

const send = (buffer) => (
  serial.write(buffer)
);

module.exports = Object.assign({}, { createConnection, isConnected, setObserver, send });
