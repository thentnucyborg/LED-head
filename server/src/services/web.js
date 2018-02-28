const WebSocket = require('ws')

module.exports.Socket = class Socket {
  constructor() {
    
  }

  connect(options) {
    const {server} = options
    this.wss = new WebSocket.Server({ server })
    this.client = {}
    this.observer = {}
 
    // init socket listeners
    this.wss.on('connection', (ws, req) => {
      this.client = ws
      this.observer.notifyConnected()

      ws.on('message', message => this.observer.notifyMessage({ ...this.decrypt(message) }))
      ws.on('close',  message => {
        this.observer.notifyDisconnected({ id: ws.id })
        this.client = {}
      })
      ws.on('error', msg => { console.log(msg) })
    })
  }
 
  /* Set observer */
  setObserver(observer) {
    this.observer = observer
  }
 
  /* Send to single */
  message(id, data) {
    if (this.clients[id].readyState === WebSocket.OPEN) {
      this.client.send(this.encrypt(data), err => {
        if (err) console.log(err)
      })
    }
  }
  
  /* Encrypt */
  encrypt(data) {
    return JSON.stringify(data)
  }
  
  /* Decrypt */
  decrypt(data) {
    return JSON.parse(data)
  }

  test() {
    return 'YAY'
  }
}