const server = require('./server');
const arduino = require('./services/arduino');
const socket = require('./services/socket');
const config = require('./config/config');

const options = {
  config: config,
  arduino: arduino,
  socket: socket,
  server: server
};

/* Catch em all */
process.on('uncaughtException', (err) => { console.error('Exception', err), process.exit(1); });
process.on('unhandledRejection', (err) => { console.error('Rejection', err); });

const init = async () => {
  await arduino.createConnection(options)
    .then(() => console.log('Arduio connected'))
    .catch((error) => console.log('Arduino connection error'));

  await server.start(options)
    .then(() => console.log('Server started'))
    .catch((error) => console.log('Server failure'));
};

init().catch(e => console.log('error', e));
