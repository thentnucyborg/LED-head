const WebSocket = require('ws');

let clients = [];
let observer = null;

/* Create connection */
const connect = ({ server }) => {
  // Todo - rewrite so promise resolves if connection success, reject otherwise
  return new Promise((resolve, reject) => {
    const wss = new WebSocket.Server({ server });
    wss.on('connection', (ws, req) => {
      clients.push(ws);
      observer.notifyConnected();
      ws.on('message', data => observer.notifyMessage(data));
      ws.on('error', error => { observer.notifyError(error), killClient(ws); });
      ws.on('close', () => { observer.notifyDisconnect(), killClient(ws); });
    });
    resolve();
  });
};

/* True if successfull connection(s) */
const isConnected = () => (clients.length > 0) ? true : false;

/* Add a listener */
const setObserver = (obs) => {
  observer = obs;
};

/* Removes client from array */
const killClient = (ws) => {
  clients.splice(clients.indexOf(ws), 1);
};

/* Send buffer to all socket connections */
const send = ({ buffer }) => {
  clients.forEach(e => {
    if (e.readyState === WebSocket.OPEN) e.send(JSON.stringify(buffer));
  });
  return Promise.resolve();
};

module.exports = Object.assign({}, { connect, isConnected, setObserver, send });
