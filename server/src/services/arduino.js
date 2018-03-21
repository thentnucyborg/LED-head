const SerialPort = require('serialport');

let serial = {}

const connect = (options) => {
  const { port } = options
  return new Promise((resolve, reject) => {
    serial = new SerialPort(options.ARDUINO_PORT, { baudRate: 9600 })

    serial.on('open', () => {

      function* generator(i=0) { while(true) yield i += 1 }
      const counter = generator()

      setInterval(() => {
        const i = counter.next().value
        write(i%255, i%255, i%255)

        console.log('update, intensity=', i)
      }, 900);
    });

    serial.on('error', (err) => console.log('err', err))
    serial.on('data', (data) => console.log('data', data))
    serial.on('close', (data) => console.log('close', data))
    serial.on('drain', (data) => console.log('drain', data))

    resolve()
  })
}

const write = (r, g, b) => {
    const leds = 60
    let bytes = new Uint8Array(leds*3)
    for (let i = 0; i < leds; i++) {
      let led = i*3
      bytes[led+0] = r
      bytes[led+1] = g
      bytes[led+2] = b
    }
    serial.write(new Buffer(bytes, 'binary'), e => {console.log("Wrote bytes.. " + e)})
}

const test = () => {
  return 'test'
}

module.exports = Object.assign({}, { connect, test })
