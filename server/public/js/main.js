const web = new WebService('http://localhost:3000/api')
const socket = new SocketService('ws://localhost:3000')

const grid = new Grid(10)
const draw = new Draw(grid)

draw.start()

socket.setObserver({
  notifyConnected: data => console.log('connected'),
  notifyMessage: data => message(data),
  notifyDisconnected: data => console.log('disconnected')
})

/* Incomming data */
const message = (data) => {
  console.log(data)
}

/* Outgoing data */
const sendMessage = (data) => {
  socket.message(data)
}




/* Test uuu */
 
document.addEventListener("click", () => {
  sendMessage('message')
})

