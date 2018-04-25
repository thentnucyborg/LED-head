import { onOpen, onMessage, onClose, onError } from '../actions';

const setupSocket = ({ port, dispatch }) => {
  console.log('socket', port);
  const socket = new WebSocket(`ws://localhost:${port}`);

  socket.onopen = () => {
    dispatch(onOpen());
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      dispatch(onMessage(data));
    } catch(error) {
      dispatch(onError(error));
    }
  };

  socket.onclose = (error) => {
    dispatch(onClose());
  };

  return socket;
};

export default setupSocket;
