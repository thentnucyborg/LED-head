import { Render } from './render/render.js';
import { WebService, SocketService } from './webService.js';

const web = new WebService('http://localhost:8080/api');
const socket = new SocketService('ws://localhost:8080');
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
