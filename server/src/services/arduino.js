const SerialPort = require('serialport');

let serial = {}

const connect = (options) => {
  const { port } = options
  return new Promise((resolve, reject) => {
    serial = new SerialPort(options.ARDUINO_PORT, { baudRate: 1000000 })

    serial.on('open', () => {

      function* generator(i=0) { while(true) yield i += 1 }
      const counter = generator()

      setInterval(() => {
        const i = counter.next().value
        write(i%255, (i*2)%255, (i*4)%255)

        console.log('update, intensity=', i)
      }, 1000);
    });

    serial.on('error', (err) => console.log('err', err))
    serial.on('data', (data) => console.log('data', data))
    serial.on('close', (data) => console.log('close', data))
    serial.on('drain', (data) => console.log('drain', data))

    resolve()
  })
}

const write = (r, g, b) => {
  let bytestr = ''
  for (let i = 0; i < 60; i++) {
    bytestr += `00000000${(255).toString(2)}`.slice(-8) // '111111110000000011111111'
    bytestr += `00000000${(0).toString(2)}`.slice(-8) // '111111110000000011111111'
    bytestr += `00000000${(255).toString(2)}`.slice(-8) // '111111110000000011111111'
  }
  serial.write(bytestr)
}

const test = () => {
  return 'test'
}

module.exports = Object.assign({}, { connect, test })
