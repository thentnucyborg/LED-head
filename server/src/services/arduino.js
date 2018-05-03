const SerialPort = require('serialport');
const chain = () => new Promise(res => res());
const mappings = {
  LEDCUBE: require('../mappings/ledCubeMapping.json'),
  CYBORGHEAD: require('../mappings/cyborgHeadMapping.json')
};

let serial = null;
let observer = null;

/* Create connection */
const createConnection = () => (
  chain()
    .then(findPort)
    .then(connect)
);

/* True if successfull serial connection */
const isConnected = () => {
  return (serial) ? true : false;
};

/* Auto find the correct port */
const findPort = () => (
  SerialPort.list()
    .then((ports) => ports.find((port) => port.vendorId))
);

/* Create a serial connections */
const connect = ({ comName }) => {
  const options = {
    baudRate: 1000000,
    dataBits: 8,
    parity: 'none',
    stopBits: 1
  };

  // Todo - fix the connection, check out serial.open(...) <- promise
  // Todo - better error message if arduino not connected.
  serial = new SerialPort(comName, options);

  serial.on('open', () => observer.notifyConnected());
  serial.on('data', (data) => observer.notifyMessage(data.toString('utf-8')));
  serial.on('error', (error) => observer.notifyError(error));
  serial.on('close', () => observer.notifyDisconnect());
  // missing end of promise
};

/* Add a listener */
const setObserver = (obs) => {
  observer = obs;
};

/* Set mapping for the arduino LED device */
const getMapping = (targetDevice) => {
  return mappings[targetDevice];
};

/* Send buffer message */
const send = (buffer) => {
  serial.write(buffer);
};

module.exports = Object.assign({}, { createConnection, isConnected, setObserver, send, getMapping });
