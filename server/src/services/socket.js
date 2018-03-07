const WebSocket = require('ws')

let clients = []
let observer = {}

const connect = (options) => {
  const { port, server } = options
  
  return new Promise((resolve, reject) => {
    const wss = new WebSocket.Server({ server })
    wss.on('connection', (ws, req) => {
      clients.push(ws)
      observer.notifyConnected()
      ws.on('message', msg => observer.notifyMessage(msg))
      ws.on('close', msg => observer.notifyDisconnect())
      ws.on('error', msg => observer.notifyError())
    })
    resolve()
  })
}

const setObserver = (obs) => {
  observer = obs
}

const send = (data) => {
  clients.forEach(e => e.send(data))
}

const test = () => {
  return 'test'
}

module.exports = Object.assign({}, { connect, setObserver, send, test })
