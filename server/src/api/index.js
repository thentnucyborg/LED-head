module.exports = (app, options) => {
  const { arduino, socket } = options

  console.log('arduino test, works?', arduino.test())
  console.log('socket test, works?', socket.test())

  // API
  app.get('/api/ping', (req, res) => res.json({date: + new Date()}))



  // move into a controller

  socket.setObserver( {
    notifyConnected: () => {console.log('socket connected')},
    notifyMessage: (data) => {
      socket.send(data)
      console.log('yuhu', data)
    },
    notifyDisconnect: () => {console.log('socket disconnected')},
    notifyError: () => {console.log('socket error')}
  })
}
