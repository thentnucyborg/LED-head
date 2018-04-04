const WebSocket = require('ws');

let clients = [];
let observer = {};

const connect = ({ server }) => {
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

const setObserver = (obs) => {
  observer = obs;
};

/* Removes client from array */
const killClient = (ws) => {
  clients.splice(clients.indexOf(ws), 1);
};

// maybe send() har promise innebygd? eller callback
const send = ({ buffer }) => {
  return new Promise((resolve, reject) => {
    clients.forEach(e => {
      if (e.readyState === WebSocket.OPEN) e.send(JSON.stringify(buffer));
    });
    resolve();
  });
};

module.exports = Object.assign({}, { connect, setObserver, send });
