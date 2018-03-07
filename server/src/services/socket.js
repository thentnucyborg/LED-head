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
      ws.on('close', msg => { observer.notifyDisconnect(), killClient(ws)) }
      ws.on('error', msg => { observer.notifyError(), killClient(ws)) }
    }) 
    resolve()
  })
}

const setObserver = (obs) => {
  observer = obs
}

/* Removes client from array */
const killClient = (ws) => {
  clients.splice(clients.indexOf(ws), 1)
}

const send = (data) => {
  clients.forEach(e => {
    if (e.readyState === WebSocket.OPEN) e.send(data)
  })
}

const test = () => {
  return 'test'
}

module.exports = Object.assign({}, { connect, setObserver, send, test })
