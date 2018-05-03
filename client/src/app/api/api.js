import { POST } from '../services/HTTP';

const api = 'api';

const startShow = () => POST(`${api}/start`);
const stopShow = () => POST(`${api}/stop`);
const setShow = (index) => POST(`${api}/setshow`, { showIndex: index });
const setMode = (mode) => POST(`${api}/setmode`, { mode: mode});

export default { startShow, stopShow, setShow, setMode };
