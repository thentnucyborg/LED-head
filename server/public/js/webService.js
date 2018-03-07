/*
 * Class to provide REST connection to the server
 * GET and POST methods with promise return
 */
export class WebService {
  constructor(url) {
    this.url = url
  }

  /* Get request */
  get(path) {
    return new Promise(resolve => {$.get(this.url + path, res => resolve(res))})
  }

  /* Post request */
  post(path, data) {
    return new Promise(resolve => {$.post(this.url + path, data, res => resolve(res))})
  }
}

/* 
 * Class to provide socket connection to the server 
 * Implemented with observer pattern, notifies on open, message, close and error.
 */
export class SocketService {
  constructor(url) {
    this.url = url
    this.socket = {}
    this.observer = {}
  }
 
  init() {
    // todo check if observer actually has all methods, otherwise error?

    this.socket.addEventListener('open', event => this.observer.notifyConnected(event))
    this.socket.addEventListener('message', event => this.observer.notifyMessage(this.decrypt(event.data)))
    this.socket.addEventListener('close', event => this.observer.notifyDisconnected(event))
    this.socket.addEventListener('error', event => console.log('err sock', event))
  }
 
  /* Set observer */
  setObserver(observer) {
    this.socket = new WebSocket(this.url)
    this.observer = observer
    this.init()
  }
 
  /* Send message */
  message(data) {
    // todo add fail handler, socket must be open
    this.socket.send(this.encrypt(data))
  }
 
  /* Encrypt */
  encrypt(data) {
    return JSON.stringify(data)
  }
 
  /* Decrypt */
  decrypt(data) {
    return JSON.parse(data)
  }
}
