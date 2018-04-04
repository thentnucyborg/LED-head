import { Render } from './render/render.js';
import { WebService, SocketService } from './webService.js';

const web = new WebService('http://localhost:3000/api');
const socket = new SocketService('ws://localhost:3000');
const render = new Render();

render.start();

socket.setObserver({
  notifyConnected: data => console.log('connected'),
  notifyMessage: data => message(data),
  notifyDisconnected: data => console.log('disconnected')
});

/* Incomming data */
const message = (data) => {
  // Todo - checks so nothing breaks
  render.update(data);
};
