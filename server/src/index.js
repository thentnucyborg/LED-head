require('dotenv').config()

const server = require('./server/server')
const arduino = require('./services/arduino')
const socket = require('./services/socket')

const options = {
  ...process.env, // secure :P
  arduino: arduino,
  socket: socket,
  server: server
}

/* Catch em all */
process.on('uncaughtException', (err) => { console.error('Exception', err), process.exit(1) })
process.on('unhandledRejection', (err) => { console.error('Rejection', err) })

const init = async () => {
  await arduino.connect(options), console.log('arduino connected')
  await server.start(options), console.log('server started')
}

init().catch(e => console.log('error', e))
