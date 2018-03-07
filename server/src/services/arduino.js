// const SerialPort = require('serialport').SerialPort;

const connect = (options) => {
  const { port } = options
  return new Promise((resolve, reject) => {
    // connect
    resolve()
  })
}

const test = () => {
  return 'test'
}

module.exports = Object.assign({}, { connect, test })
