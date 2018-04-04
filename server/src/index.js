require('dotenv').config();

const server = require('./server/server');
const arduino = require('./services/arduino');
const socket = require('./services/socket');

const options = {
  port: process.env.PORT,
  arduino: arduino,
  socket: socket,
  server: server
};

/* Catch em all */
process.on('uncaughtException', (err) => { console.error('Exception', err), process.exit(1); });
process.on('unhandledRejection', (err) => { console.error('Rejection', err); });

const init = async () => {
  await arduino.createConnection(options)
    .then(() => console.log('arduio connected'))
    .catch(console.log);

  await server.start(options)
    .then(() => console.log('server started'))
    .then(console.log);
};

init().catch(e => console.log('error', e));
