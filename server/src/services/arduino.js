const SerialPort = require('serialport');

let serial = {}

const connect = (options) => {
  const { port } = options
  return new Promise((resolve, reject) => {
    serial = new SerialPort(options.ARDUINO_PORT, {
      baudRate: 115200,
      dataBits: 8,
      parity: 'none',
      stopBits: 1
    })

    serial.on('open', () => {
      setTimeout(() => {
        function* generator(i=1) { while(true) yield i += 1  }
        const counter = generator()
        setInterval(() => {
          const i = counter.next().value
          let r = Math.sin( (i / 200) ) / 2 + 0.5
          let g = Math.sin( (i*2 / 200) ) / 2 + 0.5
          let b = Math.sin( (i*4 / 200) ) / 2 + 0.5
          write(r*255, g*255, b*255)
          console.log('update, intensity=', i )
        }, 10);
      }, 2000) // Wait 2 seconds for connection to open.
    });

    serial.on('data', (data) => {
      console.log(data.toString('utf-8'))
    });

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
    console.log("Sendt? " + serial.write(new Buffer(bytes, 'binary')))
    serial.flush()
}

const test = () => {
  return 'test'
}

module.exports = Object.assign({}, { connect, test })
