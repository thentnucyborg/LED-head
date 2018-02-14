module.exports = (app, options) => {
  const { arduino, socket } = options

  console.log('arduino test, works?', arduino.test())
  console.log('socket test, works?', socket.test())

  // Views
  app.get('/', (req, res) => res.sendFile())

  // API
  app.get('/api/ping', (req, res) => res.json({date: + new Date()}))

}
